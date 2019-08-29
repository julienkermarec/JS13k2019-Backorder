'use strict';

const {PassThrough} = require('stream');
const deparser = require('glsl-deparser');
const minify = require('glsl-min-stream');
const parser = require('glsl-parser');
const tokenizer = require('glsl-tokenizer/stream');
const optimize = require('./optimize.js');
const {
    TokenizerError,
    ParserError,
    MinifyError,
    DeparserError
} = require('./errors.js');

module.exports = function(content) {
    this.cacheable(true);
    this.async();
    const inStream = new PassThrough();
    const outStream = [
        [TokenizerError, tokenizer()],
        [ParserError, parser()],
        [MinifyError, minify()],
        [DeparserError, deparser(false)]
    ].reduce((inStream, [ErrorClass, outStream]) => {
        return inStream.pipe(outStream).on('error', err => this.callback(new ErrorClass(err)));
    }, inStream);
    const resultChunks = [];
    outStream.on('data', data => resultChunks.push(data));
    outStream.once('end', () => {
        const result = resultChunks.map(chunk => String(chunk)).join('');
        this.callback(null, 'module.exports = ' + JSON.stringify(result));
    })
    inStream.write(optimize(this, content));
    inStream.end();
};
