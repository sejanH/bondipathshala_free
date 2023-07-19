module.exports = {
  plugins: [
    require('postcss-nested'),
    {
      'postcss-import': {},
      'tailwindcss/nesting': 'postcss-nesting',
      tailwindcss: {},
      autoprefixer: {},

    }
  ]
}