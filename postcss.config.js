const tailwindcss = require('tailwindcss');
module.exports = {
    plugins: [
        // tailwindcss('./src/tailwind.config.js'),
        tailwindcss('./src/design-system/styles/tailwind.config.js'),
        require('autoprefixer')
    ],
};