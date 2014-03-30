
(function(c,q){var m="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(f){function n(){var b=c(j),a=c(h);d&&(h.length?d.reject(e,b,a):d.resolve(e));c.isFunction(f)&&f.call(g,e,b,a)}function p(b){k(b.target,"error"===b.type)}function k(b,a){b.src===m||-1!==c.inArray(b,l)||(l.push(b),a?h.push(b):j.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),r&&d.notifyWith(c(b),[a,e,c(j),c(h)]),e.length===l.length&&(setTimeout(n),e.unbind(".imagesLoaded",
p)))}var g=this,d=c.isFunction(c.Deferred)?c.Deferred():0,r=c.isFunction(d.notify),e=g.find("img").add(g.filter("img")),l=[],j=[],h=[];c.isPlainObject(f)&&c.each(f,function(b,a){if("callback"===b)f=a;else if(d)d[b](a)});e.length?e.bind("load.imagesLoaded error.imagesLoaded",p).each(function(b,a){var d=a.src,e=c.data(a,"imagesLoaded");if(e&&e.src===d)k(a,e.isBroken);else if(a.complete&&a.naturalWidth!==q)k(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=m,a.src=d}):
n();return d?d.promise(g):g}})(jQuery);


$(document).ready(function(){

    $('#container').isotope({
      masonry: {
        columnWidth: 303,
        transformsEnabled: false
      }
    });

    // Initialize:

    var targetWidthTablet = 906

    moveto();

    $(window).resize(function(){
        moveto();
    });

    function moveto() {

        // SMALLER THAN TABLET
        if( $(window).width() < targetWidthTablet)
        {
            $('img').removeAttr("width");
            $('img').removeAttr("height");
            $('figure').removeAttr("style");
            $('figure').removeAttr("class");
            $('#container').removeAttr("style");
            $('#container').removeAttr("class");
        }
        // SMALLER THAN MOBILE
        if( $(window).width() < targetWidthMobile)
        {
        }
        // LARGER THAN TABLET
        if( $(window).width() > targetWidthTablet)
        {
        }

    }
});
