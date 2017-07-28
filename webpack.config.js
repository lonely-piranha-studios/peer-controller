


module.exports = {

  name: 'controller',

  context: __dirname + '/src',
  entry: {
    controller: "./main.js",
    game: "./game.js",
  },
  output: {
    path: __dirname + '/assets/js',
    filename: "[name].bundle.js",
  },

  module: {
    rules: [{
      test: /\.js$/,
      use: "babel-loader",
      query: {
        presets: ['babel-preset-latest'].map(require.resolve),
      },
    }],
    rules: [{
      test: /\.txt$/,
      use: 'raw-loader',
    }],
  },

}
