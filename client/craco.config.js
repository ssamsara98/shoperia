const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'jsconfig',
        // baseUrl SHOULD be specified
        // plugin does not take it from jsconfig
        baseUrl: './src',
      },
    },
  ],
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
};
