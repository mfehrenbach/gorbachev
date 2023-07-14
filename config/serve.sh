config=config/_default/hugo.yml
destination=_site
ip=https://$(ifconfig | grep 'inet ' | grep -v '127.0.0.1' | awk '{print $2}')
port=443

rm -rf $destination &&

mkdir $destination &&

hugo server --baseURL=$ip --bind="0.0.0.0" --buildFuture --cleanDestinationDir --config $config --destination $destination --disableFastRender --gc --ignoreCache --minify=false --noHTTPCache --port=$port --renderToDisk --tlsAuto &&

rm -rf $destination
rm -rf resources
