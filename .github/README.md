# Daring Fireball 1.2, *Gorbachev*

 

> This is the initial, “drop in CSS replacement” phase we discussed towards the end of lunch last week. The goal here is to make the site responsive with the existing DOM, layout, and typography. We’ll give you a CSS file to replace your current one.
>
> For the build, we’re thinking we would set up a [Hugo](https://gohugo.io/) project—at this point really just for the SASS/JS pipeline and to serve some of your existing HTML for our development needs. We’d write a bookmarklet (which would replace the current CSS file, inline), to allow you to preview and respond to the work on the live/production site. Internally, this push also covers us setting up our infrastructure, ahead of the next phases. So in addition to making the current site responsive, we’ll also be starting our modern utility/variable-ized CSS foundation to build on.

 

#### [Bookmarklet →](https://mfehrenbach.github.io/gorbachev/bookmarklet.txt "Gorbachev") <!-- Title for regex hook. -->

```js
javascript:(function(){let e=document.createElement('script');e.src='https://mfehrenbach.github.io/gorbachev/replacement.js',document.head.appendChild(e),console.log('Hello, world.')})()
```

*GitHub strips JS, so you have to manually select/drag/copy the code*
