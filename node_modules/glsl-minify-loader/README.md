# glsl-minify-loader

Webpack loader for optimizing and minifying GLSL

## Install

```bash
npm i -D glsl-minify-loader
```

or

```bash
yarn add -D glsl-minify-loader
```

## Usage

```javascript
// webpack.config.js
 module: {
    rules: [{
        test: /\.glsl$/,
        use: 'glsl-minify-loader'
    }]
}

// in code
import fragment from './fragment.glsl';
import vertex from './vertex.glsl?t=vertex';
```

## Options

- shaderVersion: 2 or 3 (default 2)
- shaderType: 'vertex' or 'fragment' (default 'fragment'), may be reconfigure in query by t parametr (example: file.glsl?t=vertex)

## License

MIT &copy; Dmitriy Belyaev