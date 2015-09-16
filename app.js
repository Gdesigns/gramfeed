// INSTAGRAM OBJECT
instagram = {
    clientID: 'acaed12470de468bb5cc053656732db3',
    apiHost: 'https://api.instagram.com'
};

// VARIABLES FOR TAG AND MIN TAG ID
var tag = 'wanderingconquistador',
    min = '';

function loadInstagram() {

    // PULL IMAGES FROM INSTAGRAM
    $.ajax({
        type: "GET",
        url: instagram.apiHost + "/v1/tags/" + tag + "/media/recent",
        data: {'client_id': instagram.clientID, 'max_tag_id': min},
        dataType: "jsonp",
        beforeSend: function() {
            $('.paging .view-more').text('Loading photos...');
            $('.header .title').text('Loading...');
        },
        // IMAGE FADE
        complete: function(){
            $('.paging .view-more').text('View More');
            $('.content').fadeIn(1000);
            $('.feed li a img').fadeIn(1000);
            $('.header .title').text('#' + tag);
        }

    // ON SUCCESS DISPLAY PHOTOS

    }).success(function(photos){
        for(i=0;i<photos.data.length;i++){
            // INSTAGRAM DATA VARIABLES
            var img = photos.data[i].images.standard_resolution.url,
                link = photos.data[i].link,
                likes = photos.data[i].likes.count,
                id = photos.data[i].id,
                photo_content = "<a target='_blank' href='"+link+"'><img src='"+img+"'><span class='overlay'><span class='overlay-inner'><h3 class='likes'><i class='fa fa-heart'></i>"+likes+"</h3></span></span></a>";
            var photo = "<li>"+photo_content+"</li>";
            // ATTACH PHOTOS TO LIST ELEMENT
            $('ul').append(photo);
        }
    });

}

$(document).ready(function(){

    loadInstagram();

    $('body').on('click', '.paging', loadInstagram);
    $('body').on('click', '.to-top', function(){
        $("html, body").animate({scrollTop: 0}, 1000);
    });

});