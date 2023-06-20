config=config/_default/hugo.yml
destination=public
port=8080

rm -rf $destination &&

mkdir $destination &&

hugo server --bind="0.0.0.0" --buildFuture --cleanDestinationDir --config $config --disableFastRender --gc --ignoreCache --minify=false --noHTTPCache --port=$port --renderToDisk &&

rm -rf $destination
rm -rf resources
