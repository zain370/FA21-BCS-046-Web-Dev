$("#myform").validate({
    rules: {
        name: {
            minlength: 3,
            lettersOnly: true // Custom validation method for allowing only alphabetical characters
        },
        email: {
            email: true
        }
    },
    messages: {
        name: {
            required: "Please enter your name",
            minlength: "Name should be at least 3 characters",
            lettersOnly: "Please enter only alphabetical characters"
        },
        email: "Please enter your email"
    },
    submitHandler: function (mailForm) {
        $.ajax({
            url: mailForm.action,
            type: mailForm.method,
            data: $(mailForm).serialize(),
            success: function (response) {
                $("#message-display").html("Thanks! Your message has been sent.");
                $("#submit-btn-wrapper").hide(); // Hide the submit button wrapper
                $(mailForm)[0].reset();
            }            
        });
    }
});

// Custom validation method for allowing only alphabetical characters
$.validator.addMethod("lettersOnly", function (value, element) {
    return this.optional(element) || /^[A-Za-z]+$/.test(value);
}, "Please enter only alphabetical characters.");
