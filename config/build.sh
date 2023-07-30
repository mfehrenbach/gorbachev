config=config/_default/hugo.yml
destination=_site

rm -rf $destination &&

hugo --buildFuture --config $config --destination $destination --minify --templateMetrics --templateMetricsHints &&
rm -rf resources &&
html-beautify --extra_liners --indent-inner-html --indent-with-tabs --no-preserve-newlines --replace "$destination/**/*.html" &&
css-beautify --indent-with-tabs --space_around_combinator --replace "$destination/**/*.css" &&
js-beautify --indent-with-tabs --replace "$destination/**/*.js"
