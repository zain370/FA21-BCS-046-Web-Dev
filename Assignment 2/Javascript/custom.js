$("#myform").validate({

    rules: {
        name: {
            minlength: 3
        },
        email:{
            email:true
        }
    },
    messages: {
        name: {
            required: "Please enter your name",
            minlength: "Name atleast 3 character"
        },
        email:"Please enter your email"
    },

    submitHandler: function (form) {
        form.submit();
    }
});