module.exports = (require('./glsl-optimizer.asm.js')
    .cwrap('optimize_glsl', 'string', ['string', 'number', 'number'])
);
