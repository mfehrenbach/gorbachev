config=config/_default/hugo.yml
destination=_site
port=443

rm -rf $destination &&

mkdir $destination &&

hugo server --bind="0.0.0.0" --buildFuture --cleanDestinationDir --config $config --disableFastRender --gc --ignoreCache --minify=false --noHTTPCache --port=$port --renderToDisk --tlsAuto &&

rm -rf $destination
rm -rf resources
