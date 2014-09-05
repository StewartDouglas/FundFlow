$(document).ready(function(){

	// Validate
	// http://bassistance.de/jquery-plugins/jquery-plugin-validation/
	// http://docs.jquery.com/Plugins/Validation/
	// http://docs.jquery.com/Plugins/Validation/validate#toptions

		$('#sign-up-form').validate({
		    rules: {
		      name: {
		        required: true
		      },
		      email: {
		        required: true,
		        email: true
		      },
		      password: {
		      	minlength: 6,
		        required: true
		      },
		      confirmation: {
		      	minlength: 6,
		      	equalTo: "#password"
		      }
		    },
				success: function(element) {
					element
					.text('OK!').addClass('valid')
				}
	  	});

		$('#loan-form').validate({
			rules: {
				amount: {
					required: true
				},
				interest: {
					required: true
				},
				description: {
					required: true
				},
				extendedDescription: {
					required: true
				},
				expires: {
					required: true
				},
				address: {
					required: true,
					minlength: 27,
					maxlength: 34
				}
			},
			success: function(element) {
				element
				.text('OK!').addClass('valid')
			}			
		});

});