// get FLickr Photos By Set
//Edited by IDBan
var flickr = {};

flickr.getPhotosBySet = (function($) {
    this.apiKey = '';
    this.userId = '',
    this.pSetId = '';
    this.targetDiv = '';

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

        $.getJSON('http://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&photoset_id=' + photoset_id + '&per_page=100' + '&page=1' + '&api_key=' + apiKey + '&user_id=' + userId + '&jsoncallback=?', function(data) {
            $.each(data.photoset.photo, function(i, flickrPhoto) {
                var basePhotoURL = 'http://farm' + flickrPhoto.farm + '.static.flickr.com/' + flickrPhoto.server + '/' + flickrPhoto.id + '_' + flickrPhoto.secret + ".jpg";
                var a_href = "http://www.flickr.com/photos/" + data.photoset.owner + "/" + flickrPhoto.id + "/";
                $("<img/>").attr("src", basePhotoURL).appendTo(targetDiv).wrap(("<div class='item photo'></div>"))
            });
        });
    }

    return {
        getPhotos: function(id) {
            if(checkCredentials()){
                if(id){
                    getPrivatePhotos(id);
                } else {
                    getPrivatePhotos(pSetId);
                }
            }
        },
        init: function(a, u, s, d) {
            apiKey = q,
            userId = u,
            pSetId = s;
            targetDiv = d;
        }
    };
})(jQuery).init('apiKey-goes-here', 'userId-goes-here', 'PhotoSetId-goes-here', 'target-Div-goes-here');
