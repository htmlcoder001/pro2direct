$(document).ready(function () {
    /*Локализация плагинов*/
    var langPage = $('html').attr('lang'),
        langParams = {
            'ru': {
                langDates: {
                    days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                    daysShort: ['Вос', 'Пон', 'Вто', 'Сре', 'Чет', 'Пят', 'Суб'],
                    daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                    monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
                    today: 'Сегодня',
                    clear: 'Очистить',
                    dateFormat: 'dd.mm.yyyy',
                    timeFormat: 'hh:ii',
                    firstDay: 1
                }
            },
            'by': {
                langDates: {
                    days: ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'],
                    daysShort: ['Нд', 'Пн', 'Аў', 'Ср', 'Чц', 'Пт', 'Сб'],
                    daysMin: ['Нд', 'Пн', 'Аў', 'Ср', 'Чц', 'Пт', 'Сб'],
                    months: ['Студзень', 'Люты', 'Сакавік', 'Красавік', 'Май', 'Чэрвень', 'Ліпень', 'Жнівень', 'Верасень', 'Кастрычнік', 'Лістапад', 'Снежань'],
                    monthsShort: ['Студ', 'Лют', 'Сак', 'Крас', 'Май', 'Чэрв', 'Ліп', 'Жнів', 'Вер', 'Каст', 'Ліст', 'Снеж'],
                    today: 'Сёння',
                    clear: 'Ачысціць',
                    dateFormat: 'dd.mm.yyyy',
                    timeFormat: 'hh:ii',
                    firstDay: 1
                }
            },
            'en': {
                langDates: {
                    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                    daysShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                    daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    today: 'Today',
                    clear: 'Clear',
                    dateFormat: 'dd.mm.yyyy',
                    timeFormat: 'hh:ii',
                    firstDay: 1
                }
            },
        },
        langParamsNew,
        $picker = $('#picker');

    switch (langPage) {
        case 'ru':
            langParamsNew = langParams.ru;
            break;
        case 'by':
            langParamsNew = langParams.by;
            break;
        default:
            langParamsNew = langParams.en;
            break;
    }
    /***************************************************/

    function startCalendar() {
        switch (window.location.pathname) {
            case getPath() + "calendar/":
                getAjaxRequest(getPath() + "ajax/calendar/getDays/");
                break;
            case getPath() + "respondent-calendar/":
                getAjaxRequest(getPath() + "ajax/respondent-calendar/getDays/");
                break;
            default:
                break;
        }
    }
    startCalendar();

    /*function reinitCalendar(){
        switch (window.location.pathname) {
            case getPath() + "calendar_test/":
                getAjaxRequestReinit(getPath() + "ajax/calendar/getDays/");
                break;
            case getPath() + "respondent-calendar/":
                getAjaxRequestReinit(getPath() + "ajax/respondent-calendar/getDays/");
                break;
            default:
                break;
        }
    }*/

    function getPath() {
        var path;
        switch (langPage) {
            case "ru":
                path = "/";
                break;
            case "en":
                path = "/en/";
                break;
            case "by":
                path = "/by/";
                break;
            default:
                path = "/";
                break;
        }
        return path;
    }

    function getAjaxRequest(url) {
        $.ajax({
            url: url,
            type: 'POST',
            success: function (data) {
                datePickerInitialize(data);
                changeDatePicker();
            }
        });
    }

    /*function getAjaxRequestReinit(url) {
        $.ajax({
            url: url,
            type: 'POST',
            success: function (data) {
                datePickerInitialize(data);
            }
        });
    }*/

    var globalDate;

    $('body').on('click', '.clear-field', function(){
        var that = $(this),
            parent = that.closest('.js-change-field-wrp'),
            field = parent.find('.js-change-key-up'),
            clearFieldBtn = parent.find('.clear-field');
        field.val('');
        clearFieldBtn.removeClass('show');
        /*if(field.hasClass('range__field')){
            if ($("#dateFrom").val() === "" && $("#dateTo").val() === "") {
                var datepicker = $('#picker').datepicker().data('datepicker');
                datepicker.destroy();
                reinitCalendar();
            }
        }*/
    });
    function datePickerInitialize(avaibleDates) {
        var newDates = JSON.parse(avaibleDates);
        var eventDates = newDates.map(function (a) {
            return a = new Date(a), a.setHours(0, 0, 0, 0), a.getTime();
        });

        $picker.datepicker({
            language: langParamsNew.langDates,
            onRenderCell: function (date, cellType) {
                var currentDate = date.getTime();
                if (cellType == 'day' && eventDates.indexOf(currentDate) != -1) {
                    return {
                        classes: "bold-date"
                    }
                }
            },
            inline: true,
            range: true,
            onSelect: function onSelect(selectedDates) {
                var string = selectedDates.split(",");
                if (string.length == 2) {
                    var dateFromInput = string[0].split('.');
                    var dateFromString = dateFromInput[2] + "-" + dateFromInput[1] + "-" + dateFromInput[0];
                    var dateToInput = string[1].split('.');
                    var dateToString = dateToInput[2] + "-" + dateToInput[1] + "-" + dateToInput[0];
                    $("#dateFrom").val(dateFromString);
                    $("#dateTo").val(dateToString);
                    $("#dateFrom ,#dateTo").closest('.js-change-field-wrp').find('.clear-field').addClass('show')
                } else {
                    if (selectedDates != "") {
                        globalDate = selectedDates;
                    } else {
                        setDate();
                    }
                }

            }
        }).data('datepicker');
    }

    function changeDatePicker() {
        var s = window.location.search;
        var dateFrom = s.match(new RegExp("dateFrom" + '=([^&=]+)'));
        var dateTo = s.match(new RegExp("dateTo" + '=([^&=]+)'));
        if (dateFrom) {
            dateFrom = dateFrom[1];
        } else {
            dateFrom = false
        }
        if (dateTo) {
            dateTo = dateTo[1];
        } else {
            dateTo = false
        }
        if (dateFrom != false && dateTo != false) {
            var datepicker = $('#picker').datepicker().data('datepicker');
            datepicker.selectDate(new Date(dateFrom));
            datepicker.selectDate(new Date(dateTo));
        }

    }

    function setDate() {
        var date = globalDate.split('.');
        var dateString = date[2] + "-" + date[1] + "-" + date[0];
        $('#picker').datepicker().data('datepicker').selectDate(new Date(dateString));
        $('#picker').datepicker().data('datepicker').selectDate(new Date(dateString));
    }

    // $('#dateFrom').change(function () {
    $('body').on('change', '#dateFrom', function () {
        var date = $("#dateFrom").val().split('-');
        console.log(date);
        if (date[0] > 1970) {
            if ($("#dateFrom").val() != "" && $("#dateTo").val() != "") {
                var datepicker = $('#picker').datepicker().data('datepicker');
                datepicker.selectDate(new Date($("#dateFrom").val()));
                datepicker.selectDate(new Date($("#dateTo").val()));
            }
        }
    });

    $('body').on('change', '#dateTo', function () {
        var date = $("#dateTo").val().split('-');
        console.log(date);
        if (date[0] > 1970) {
            if ($("#dateFrom").val() != "" && $("#dateTo").val() != "") {
                var datepicker = $('#picker').datepicker().data('datepicker');
                datepicker.selectDate(new Date($("#dateFrom").val()));
                datepicker.selectDate(new Date($("#dateTo").val()));
            }
        }
    });
    // $('#dateTo').change(function () {
    //
    // });
});