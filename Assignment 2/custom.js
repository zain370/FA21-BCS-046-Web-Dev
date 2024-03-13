$("#my-form").validate({

    rules: {
        name: {
            minlength: 2
        }
    },
    messages: {
        name: {
            required: "Please enter your name",
            minlength: "Name atleast 2 character"
        }
    },

    submitHandler: function (form) {
        form.submit();
    }
});