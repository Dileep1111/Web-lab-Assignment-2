function tplawesome(e, t) {
    res = e;
    for (var n = 0; n < t.length; n++) {
        res = res.replace(/\{\{(.*?)\}\}/g, function (e, r) {
            return t[n][r]
        })
    }
    return res
}

$(function () {
    $("form").on("submit", function (e) {
        e.preventDefault();
        // This is meant to prepare the request
        var req = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",

            q: $("#search").val(),
            maxResults: 7,
            order: "relevance",
            publishedAfter: "2010-01-01T00:00:00Z"
        });
        // This executes the request
        req.execute(function (response) {
            var results = response.result;
            $("#results").html("");
            $.each(results.items, function (index, item) {
                $.get("tpl/item.html", function (data) {
                    $("#results").append(tplawesome(data, [{"title": item.snippet.title, "videoid": item.id.videoId}]));
                });
            });
            resetVideoHeight();
        });
    });

    $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9 / 16);
//    The video result frame
}

function initialize() {
    gapi.client.setApiKey("AIzaSyAFwYDAWGypIW_ZQkN73vFCgfFAFwiINXc");
    gapi.client.load("youtube", "v3", function () {
        //Youtube API Key
    });
}