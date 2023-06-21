config=config/_default/hugo.yml
destination=public
port=80

rm -rf $destination &&

hugo --buildFuture --config $config --destination $destination --minify --templateMetrics --templateMetricsHints &&
rm -rf resources &&
html-beautify --indent-inner-html --extra_liners --no-preserve-newlines --indent-with-tabs --replace "$destination/**/*.html" &&
css-beautify --space_around_combinator --indent-with-tabs --replace "$destination/**/*.css" &&
js-beautify --indent-with-tabs --replace "$destination/**/*.js" &&

python3 -m http.server $port --directory $destination
