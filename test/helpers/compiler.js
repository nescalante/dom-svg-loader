// copied from: https://github.com/webpack-contrib/file-loader/blob/ba0fd4c980638cbe8efe5d20a86843fd432ac687/test/helpers/compiler.js
const del = require('del');
const path = require('path');
const webpack = require('webpack');
const MemoryFS = require('memory-fs');

const definition = (config) => {
  return {
    rules: config.rules
      ? config.rules
      : config.loader
      ? [
          {
            test: (config.loader && config.loader.test) || /\.txt$/,
            use: {
              loader: path.resolve(__dirname, '../..'),
              options: (config.loader && config.loader.options) || {}
            }
          }
        ]
      : []
  };
};

const plugins = (config) => [].concat(config.plugins || []);

const output = (config) => {
  return {
    path: path.resolve(
      __dirname,
      `../outputs/${config.output ? config.output : ''}`
    ),
    filename: '[name].bundle.js'
  };
};

module.exports = (fixture, config, options) => {
  // webpack Config
  config = {
    mode: 'development',
    devtool: config.devtool || 'sourcemap',
    context: path.resolve(__dirname, '../fixtures'),
    entry: `./${fixture}`,
    output: output(config),
    module: definition(config),
    plugins: plugins(config),
    optimization: {
      runtimeChunk: true
    }
  };
  // Compiler Options
  options = Object.assign({ output: false }, options);

  if (options.output) del.sync(config.output.path);

  const compiler = webpack(config);

  if (!options.output) compiler.outputFileSystem = new MemoryFS();

  return new Promise((resolve, reject) =>
    compiler.run((err, stats) => {
      if (err) reject(err);

      resolve(stats);
    })
  );
};
