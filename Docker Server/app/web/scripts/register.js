$(document).on('click', '#register-btn', function () {
    var userName = $('#register-input').val();
    var data = {
        username: userName
    };
    var response = $.ajax({
        url: "/register",
        type: "post",
        data: JSON.stringify(data),
        contentType: 'application/json'
    });

    response.done(function (res) {
        if (res.code === 200) {
            window.location.href = '/';
        }
    });

    response.fail(function (xhr, status, error) {
        console.log(xhr.responseText);
    });
});