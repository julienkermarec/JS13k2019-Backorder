'use strict';

const {getOptions, parseQuery} = require('loader-utils');
const optimizer = require('../vendor/optimizer/index.js');

module.exports = function(ctx, content) {
    const {shaderType, shaderVersion} = getConfig(ctx);
    return optimizer(String(content), shaderVersion, shaderType === 'vertex');
};

function getConfig(ctx) {
    const {
        shaderVersion = 2,
        shaderType: optionsShaderType
    } = getOptions(ctx) || {};
    const {
        t: queryShaderType
    } = parseQuery(ctx.resourceQuery || '?')
    const shaderType = queryShaderType || optionsShaderType || 'fragment';
    return {shaderType, shaderVersion};
}
