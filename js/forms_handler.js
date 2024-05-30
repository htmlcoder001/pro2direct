$(document).ready(function() {
    $(document).on('submit', '#question_form', function(e) {

        e.preventDefault();
        $('.error-text').hide();

        var org_name = $('#question_form input[name="org_name"]').val();
        var name = $('#question_form input[name="name"]').val();
        var index = $('#question_form input[name="index"]').val();
        var adress = $('#question_form input[name="adress"]').val();
        var phone = $('#question_form input[name="phone"]').val();
        var email = $('#question_form input[name="email"]').val();
        var short = $('#question_form input[name="short"]').val();
        var unp = $('#question_form input[name="unp"]').val();
        var form_code = $('#question_form input[name="form_code"]').val();
        var message = $('#question_form textarea[name="message"]').val();
        var answer = $('#question_form option:selected').val();
        var captcha = $('#question_form input[name="captcha_word"]').val();

        if($.trim(org_name) == "") {
            $('#question_form input[name="org_name"]').siblings('.error-text').show();

        }
        if($.trim(name) == "") {
            $('#question_form input[name="name"]').siblings('.error-text').show();

        }
        if($.trim(index) == "") {
            $('#question_form input[name="index"]').siblings('.error-text').show();

        }
        if($.trim(adress) == "") {
            $('#question_form input[name="adress"]').siblings('.error-text').show();

        }
        if($.trim(email) == "") {
            $('#question_form input[name="email"]').siblings('.error-text').show();

        }
        if($.trim(short) == "") {
            $('#question_form input[name="short"]').siblings('.error-text').show();

        }
        if($.trim(message) == "") {
            $('#question_form textarea[name="message"]').siblings('.error-text').show();

        }
        if($.trim(captcha) == "") {
            $('#question_form input[name="captcha_word"]').siblings('.error-text').text('Поле обязательное для заполнения');
            $('#question_form input[name="captcha_word"]').siblings('.error-text').show();

        }


        if($.trim(org_name) == "" || $.trim(name) == "" || $.trim(index) == "" ||
            $.trim(adress) == "" || $.trim(email) == "" || $.trim(short) == "" ||
            $.trim(message) == "" || $.trim(captcha) == "" ) {

            return false;
        } else {
            var captcha_code = $('input[name="captcha_code"]').val();
            var captcha_word = $('input[name="captcha_word"]').val();

            $.post("/capcha.php", {captcha_code: captcha_code, captcha_word: captcha_word}, function(data) {
                if(data == "true") {
                    /*$.post('/question.php', {org_name:org_name, name:name, index: index, adress: adress, phone: phone, email: email,
                        short: short, unp:unp, form_code: form_code, message: message, answer: answer, submit: 'submit'});*/
                    $('#question_form').ajaxSubmit({clearForm: true});

                    alert("Ваш запрос принят.");
$('.error-text').hide();
                } else {
                    $('#question_form input[name="captcha_word"]').siblings('.error-text').text('Неверная капча!');
                    $('#question_form input[name="captcha_word"]').siblings('.error-text').show();
                }
            })
        }
    });


    $(document).on('submit', '#request_ip_form', function(e) {

        e.preventDefault();
        $('.error-text').hide();

        var org_name = $('#request_ip_form input[name="org_name"]').val();
        var name = $('#request_ip_form input[name="name"]').val();
        var index = $('#request_ip_form input[name="index"]').val();
        var adress = $('#request_ip_form input[name="adress"]').val();
        var phone = $('#request_ip_form input[name="phone"]').val();
        var email = $('#request_ip_form input[name="email"]').val();
        var short = $('#request_ip_form input[name="short"]').val();
        var message = $('#request_ip_form textarea[name="message"]').val();
        var answer = $('#request_ip_form option:selected').val();
        var captcha = $('#request_ip_form input[name="captcha_word"]').val();

        if($.trim(org_name) == "") {
            $('#request_ip_form input[name="org_name"]').siblings('.error-text').show();

        }
        if($.trim(name) == "") {
            $('#request_ip_form input[name="name"]').siblings('.error-text').show();

        }
        if($.trim(index) == "") {
            $('#request_ip_form input[name="index"]').siblings('.error-text').show();

        }
        if($.trim(adress) == "") {
            $('#request_ip_form input[name="adress"]').siblings('.error-text').show();

        }
        if($.trim(email) == "") {
            $('#request_ip_form input[name="email"]').siblings('.error-text').show();

        }
        if($.trim(short) == "") {
            $('#request_ip_form input[name="short"]').siblings('.error-text').show();

        }
        if($.trim(message) == "") {
            $('#request_ip_form textarea[name="message"]').siblings('.error-text').show();

        }
        if($.trim(captcha) == "") {
            $('#request_ip_form input[name="captcha_word"]').siblings('.error-text').text('Поле обязательное для заполнения');
            $('#request_ip_form input[name="captcha_word"]').siblings('.error-text').show();

        }

        if($.trim(org_name) == "" || $.trim(name) == "" || $.trim(index) == "" ||
            $.trim(adress) == "" || $.trim(email) == "" || $.trim(short) == "" ||
            $.trim(message) == "" || $.trim(captcha) == "") {

            return false;
        } else {
            var captcha_code = $('input[name="captcha_code"]').val();
            var captcha_word = $('input[name="captcha_word"]').val();

            $.post("/capcha.php", {captcha_code: captcha_code, captcha_word: captcha_word}, function(data) {
                if(data == "true") {
                    /*$.post('/question.php', {org_name:org_name, name:name, index: index, adress: adress, phone: phone, email: email,
                        short: short, message: message, answer: answer, ip_form: 'ip_form'});*/
                    $('#request_ip_form').ajaxSubmit({clearForm: true});

                    alert("Ваш запрос принят.");
                } else {
                    //alert("Неверная капча!");
                    $('#request_ip_form input[name="captcha_word"]').siblings('.error-text').text('Неверная капча!');
                    $('#request_ip_form input[name="captcha_word"]').siblings('.error-text').show();
                }
            })
        }
    });


    $(document).on('submit', '#request_ur_form', function(e) {
        $('.error-text').hide();
        e.preventDefault();

        var org_name = $('#request_ur_form input[name="org_name"]').val();
        var name = $('#request_ur_form input[name="name"]').val();
        var index = $('#request_ur_form input[name="index"]').val();
        var adress = $('#request_ur_form input[name="adress"]').val();
        var fio = $('#request_ur_form input[name="fio"]').val();
        var phone = $('#request_ur_form input[name="phone"]').val();
        var email = $('#request_ur_form input[name="email"]').val();
        var short = $('#request_ur_form input[name="short"]').val();
        var message = $('#request_ur_form textarea[name="message"]').val();
        var answer = $('#request_ur_form option:selected').val();
        var captcha = $('#request_ur_form input[name="captcha_word"]').val();


        if($.trim(org_name) == "" || $.trim(name) == "" || $.trim(index) == "" ||
            $.trim(adress) == "" || $.trim(email) == "" || $.trim(short) == "" ||
            $.trim(message) == "" || $.trim(captcha) == "" || $.trim(fio) == "") {
            alert("Заполните обязательные поля!");
            return false;
        } else {
            var captcha_code = $('input[name="captcha_code"]').val();
            var captcha_word = $('input[name="captcha_word"]').val();

            $.post("/capcha.php", {captcha_code: captcha_code, captcha_word: captcha_word}, function(data) {
                if(data == "true") {
                    /*$.post('/question.php', {org_name:org_name, name:name, index: index, adress: adress, fio: fio, phone: phone, email: email,
                        short: short, message: message, answer: answer, ur_form: 'ur_form'});*/
                    $('#request_ur_form').ajaxSubmit({clearForm: true});

                    alert("Ваш запрос принят.");
                } else {
                    $('#request_ur_form input[name="captcha_word"]').siblings('.error-text').text('Неверная капча!');
                    $('#request_ur_form input[name="captcha_word"]').siblings('.error-text').show();
                }
            })
        }
    });
})