// get FLickr Photos By Set

var flickr = {};

flickr.getPhotosBySet = (function($) {
    var loadButtons = $('a.load-button'),
        apiKey = '',
        userId = '',
        setId = '',
        targetDiv = '';

    function checkCredentials(){
        if(apiKey === ''){
            throwError('API Key');
            return false;
        } else if(userId === ''){
            throwError('User ID');
            return false;
        } else if(pSetId === ''){
            throwError('Photoset ID');
            return false;
        } else {
            return true;
        }
    }

    function throwError(err){
        window.alert("Error: "+err+" missing.");
    }

    function getPrivatePhotos(id) {
        var photoset_id = id;
        $(targetDiv).html('<h1>Flickr Set: '+id+'</h1>');

        $.getJSON('http://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&photoset_id=' + photoset_id + '&per_page=100' + '&page=1' + '&api_key=' + apiKey + '&user_id=' + userId + '&jsoncallback=?', function(data) {
            $.each(data.photoset.photo, function(i, flickrPhoto) {
                var basePhotoURL = 'http://farm' + flickrPhoto.farm + '.static.flickr.com/' + flickrPhoto.server + '/' + flickrPhoto.id + '_' + flickrPhoto.secret + ".jpg";
                var a_href = "http://www.flickr.com/photos/" + data.photoset.owner + "/" + flickrPhoto.id + "/";
                $("<img/>").attr("src", basePhotoURL).appendTo(targetDiv).wrap(("<div class='item photo'></div>"))
            });
            window.scrollTo(0, 720);
            $(targetDiv).append('<p id="backToTop"><a href="#top">Back to top <span>&uarr;</span></a></p>');
        });
    }
    function clickHandler(){
        loadButtons.on('click', function(e){
            e.preventDefault();
            // get set from target's id
            setId  = $(this).attr('id');
            getPrivatePhotos(setId);
            return false;
        });
    }

    return {
        bindUIEvents:function(){
            clickHandler();
        },
        init: function(credentials) {
            apiKey = credentials.apiKey,
            userId = credentials.userId,
            setId = credentials.setId;
            targetDiv = credentials.targetDiv;
            this.bindUIEvents();
        }
    };
})(jQuery);