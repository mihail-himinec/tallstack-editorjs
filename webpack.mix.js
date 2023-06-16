let mix = require("laravel-mix");

mix.js("resources/js/editor.js", "resources/build/js").postCss(
    "resources/css/editor.css",
    "resources/build/css",
    [require("tailwindcss")]
);