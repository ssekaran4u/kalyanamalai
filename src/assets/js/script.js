// $(document).ready(function($) {
    // 'use strict'
        // $.ajax({
        //     type: "POST",
        //     // async:true,
        //     crossDomain:true,
        //     contentType:'application/json; charset=utf-8',
        //     url: "http://115.124.109.53/api/IdValues/GetReligionBasedonCommunity",
        //     data: {"CommunityId": "2"},
        //     dataType: 'json',
        //     beforeSend: function(x) {
        //         // $('#preloader').show();
        //     }
        // }).done(function(response) {
        //      console.table(response);
        // });
    // $(document).on('change', '#CommunityList', function() {

        // var _communityId = $(this).val();
        // if(_communityId)
        // {
        //     var settings = {
        //         "async": true,
        //         // "crossDomain": true,
        //          dataType: "json",
        //         "contentType": "application/json",
        //         "url": "",
        //         "method": "POST",
        //         withCredentials : true,
        //         "headers": {
        //             "content-type": "application/x-www-form-urlencoded",
        //             "cache-control": "no-cache",
        //             // "postman-token": "c1ce0398-cae8-d0c1-2ee8-9d8615214827"
        //             "Access-Control-Allow-Origin":"*",
        //              // 'Access-Control-Allow-Origin' : '*',
        //                 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
        //             // withCredentials : true,
        //           },
        //         "data": {
        //             "CommunityId": "2"
        //         }
        //     }

        //     $.ajax(settings).done(function(response) {
        //         console.log(response);
        //     });
        // }
    // });

    $(window).on('scroll', function() {
        var scroll_top = $(window).scrollTop();
    });
// });