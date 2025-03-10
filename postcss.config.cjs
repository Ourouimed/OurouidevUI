module.exports = {
    plugins: [
      require('postcss-import'),     // 👈 THIS is the key!
      require('autoprefixer'),
      require('cssnano')({ preset: 'default' }),
    ],
  };
  