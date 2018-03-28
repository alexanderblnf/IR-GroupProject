$(function () {
    var result = $.ajax({
        url: "/getInterface",
        type: "get",
    });

    result.done(function (res) {
        if (res.code === 200) {
            $.getScript(res.response)
                .done(function() {
                    console.log("Interface loaded");
                    $.getScript('/scripts/interfaces-utils.js')
                        .done(function () {
                            $.getScript('/scripts/utils.js')
                                .done(function () {
                                    $.getScript('/scripts/index.js')
                                })
                        });
                })
                .fail(function() {
                    console.log("Loading script " + res.response + "failed");
                });
        }
    });

    result.fail(function (xhr) {
        console.log(xhr.responseText);
    });
});