var registerClick = 0;

$(document).ready(function () {
    $('.alert').hide();
    $('.alert').alert();
});

$(document).on('click', '#register-btn', function () {
	registerClick++;
	if (registerClick < 2) {
		var age = $('#age-input').val();
		var gender = $('#select-gender').val();
		var student = $('#select-student').val();
		var ir = $('#select-ir').val();

		if (age && gender && student && ir) {
			if (isNaN(age)) {
				$('#error-p').text('Please ensure that you have entered a valid age');
				$('.alert').show();
			} else {
				var data = {
					age: age,
					gender: gender,
					student: student,
					ir: ir
				};
				sendRegister(data);
			}
		} else {
			$('.alert').show();
		}
	}
});

function sendRegister(data) {
    var response = $.ajax({
        url: "/register",
        type: "POST",
        data: JSON.stringify(data),
        contentType: 'application/json'
    });

    response.done(function (res) {
        if (res.code === 200) {
            window.location.href = "/"
        }
    });

    response.fail(function (xhr, status, error) {
        console.log(xhr.responseText);
    });
}