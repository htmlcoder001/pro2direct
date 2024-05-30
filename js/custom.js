$(function () {
    /*setTimeout(function () {
        if($('.viewer-wrp').length){
            var viewerPos = $('.viewer-wrp').offset().top;
            console.log(viewerPos);
            $('html, body').animate({ scrollTop: viewerPos - $('.h-menu-container').outerHeight() }, 400);
        }
    },3000)*/

    /*Локализация плагинов*/
    var langPage = $('html').attr('lang'),
        langParams = {
            'ru': {
                searchText: 'Поиск...',
                noMatch: 'Ничего не найдено "{0}"',
                locale: ['OK', 'Отмена', 'Выбрать все'],
                placeholder: 'Выберите из списка',
                captionFormat: '{0} Выбрано',
                captionFormatAllSelected: '{0} Все выбраны!',
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
                searchText: 'Пошук...',
                noMatch: 'Нічога не знойдзена "{0}"',
                locale: ['OK', 'Адмена', 'Выбраць усе'],
                placeholder: 'Абярыце з спісу',
                captionFormat: '{0} Абрана',
                captionFormatAllSelected: '{0} Усе абраныя!',
                langDates: {
                    days: ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'],
                    daysShort: ['Нд', 'Пн', 'Ат', 'Ср', 'Чц', 'Пт', 'Сб'],
                    daysMin: ['Нд', 'Пн', 'Ат', 'Ср', 'Чц', 'Пт', 'Сб'],
                    months: ['Студзень', 'Люты', 'Сакавік', 'Красавік', 'Май', 'Чэрвень', 'Ліпень', 'Жнівень', 'Верасень', 'Кастрычнік', 'Лістапад', 'Снежань'],
                    monthsShort: ['Студ', 'Лют', 'Сак', 'Крас', 'Май', 'Чэрв', 'Лип', 'Жнів', 'Вер', 'Каст', 'Ліст', 'Снеж'],
                    today: 'Сёння',
                    clear: 'Ачысціць',
                    dateFormat: 'dd.mm.yyyy',
                    timeFormat: 'hh:ii',
                    firstDay: 1
                }
            },
            'en': {
                searchText: 'Search...',
                noMatch: 'No matches for "{0}"',
                locale: ['OK', 'Cancel', 'Select All'],
                placeholder: 'Select Here',
                captionFormat: '{0} Selected',
                captionFormatAllSelected: '{0} all selected!',
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
                },
                fancybox: {
                    CLOSE: "Close",
                    NEXT: "Next",
                    PREV: "Previous",
                    ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                    PLAY_START: "Start slideshow",
                    PLAY_STOP: "Pause slideshow",
                    FULL_SCREEN: "Full screen",
                    THUMBS: "Thumbnails",
                    DOWNLOAD: "Download",
                    SHARE: "Share",
                    ZOOM: "Zoom"
                }
            },
        },
        langParamsNew;

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

    var vaObj = {
        win: $(window),
        body: $('body')
    };

    vaObj.body.on('click', '.js-region-select', function () {
        $(this).next('.js-related-mobile').stop(true).slideToggle();
    });

    /*Прикрепить файл*/
    vaObj.body.on('click', '.file__info', function () {
        $('input', this.parentNode).click();
    });

    vaObj.body.on('change', '.input-file', function () {
        let that = $(this),
            parent = that.closest('.file-wrapper'),
            file = parent.find('.file__path'),
            delFile = parent.find('.file__del'),
            NoFileName = file.attr('data-nofile'),
            filePath = that.val(),
            fileName = filePath.replace("C:\\fakepath\\", '');
        if (filePath !== "") {
            file.text(fileName);
            delFile.addClass('show');
        } else {
            file.text(NoFileName);
            delFile.removeClass('show');
        }
    });
    vaObj.body.on('click', '.file__del', function () {
        let that = $(this),
            parent = that.closest('.file-wrapper'),
            file = parent.find('.file__path'),
            NoFileName = file.attr('data-nofile'),
            delFile = parent.find('.file__del');
        parent.find('.input-file').val('');
        file.text(NoFileName);
        delFile.removeClass('show');
    });
    /***************************************************/

    vaObj.body.on('click', '.js-show-search-btn', function () {
        $('.mobile-search').toggleClass('mobile-search_show');
    });
    $(document).on('click', function (e) {
        if ($(e.target).closest('.mobile-search-wrp').length)
            return;
        $('.mobile-search').removeClass('mobile-search_show');
        e.stopPropagation();
    });

    vaObj.body.on('click', '.js-show-hide-calendar-btn', function () {
        $(this).toggleClass('js-show-hide-calendar-btn_active');
        $(this).next('.js-show-hide-calendar').stop(true).slideToggle();
    });
    $('.js-multiple-select').SumoSelect({
        captionFormat: langParamsNew.captionFormat
    });
    $('.js-multiple_select').SumoSelect({
        search: true,
        //selectAll: true,
        placeholder: langParamsNew.placeholder,
        searchText: langParamsNew.searchText,
        noMatch: langParamsNew.noMatch,
        locale: langParamsNew.locale,
        captionFormat: langParamsNew.captionFormat,
        captionFormatAllSelected: langParamsNew.captionFormatAllSelected
    });

    $('body').on('keyup', '.search-txt', function () {
        var parent = $(this).closest('.SumoSelect'),
            gruopUl = parent.find('.group');

        gruopUl.each(function () {
            var that = $(this),
                li = $(this).find('.opt');
            that.removeClass('hidden');
            for (var i = 0; i < li.length; i++) {
                if (!li.eq(i).hasClass('hidden')) {
                    that.removeClass('hidden');
                    break;
                } else {
                    that.addClass('hidden');
                }
            }
        });
    });

    $('body').on('keyup change', '.js-change-key-up', function () {
        var that = $(this),
            thatVal = that.val(),
            parent = that.closest('.js-change-field-wrp'),
            clearFieldBtn = parent.find('.clear-field');

        if (thatVal.length) {
            clearFieldBtn.addClass('show')
        } else {
            clearFieldBtn.removeClass('show')
        }
        if (that.hasClass('range__field')) {
            if ($("#dateFrom").val() != "" && $("#dateTo").val() != "") {
                var datepicker = $('#picker').datepicker().data('datepicker');
                datepicker.selectDate(new Date($("#dateFrom").val()));
                datepicker.selectDate(new Date($("#dateTo").val()));
            }
        }
    });

    $('body').on('click', '.clear-field', function () {
        var that = $(this),
            parent = that.closest('.js-change-field-wrp'),
            field = parent.find('.js-change-key-up'),
            clearFieldBtn = parent.find('.clear-field');
        field.val('');
        clearFieldBtn.removeClass('show');
    });

    if ($('.js-change-key-up').length) {
        $('.js-change-key-up').each(function () {
            var that = $(this),
                thatVal = that.val(),
                parent = that.closest('.js-change-field-wrp'),
                clearFieldBtn = parent.find('.clear-field');
            if (thatVal.length) {
                clearFieldBtn.addClass('show');
            }
        });
    }

    $('body').on('change', '.js-multiple_select', function () {
        var parent = $(this).closest('.calendar-filter__selects-item');
        if ($('.js-multiple_select option:selected').length) {
            parent.addClass('selects-item__active');
            parent.find('.clear-select').addClass('show');
        } else {
            parent.find('.clear-select').removeClass('show');
            parent.removeClass('selects-item__active');
        }
    });

    $('body').on('click', '.clear-select', function () {
        var parent = $(this).closest('.calendar-filter__selects-item'),
            thatIndex = parent.index(),
            placeholderText = parent.find('.js-multiple_select').attr('placeholder'),
            placeholderSpan = parent.find('.SelectBox span');
        parent.find('.js-multiple_select option:selected').prop("selected", false);
        parent.find('.opt').removeClass('selected');
        $('select.js-multiple_select')[thatIndex].sumo.unSelectAll();
        placeholderSpan.addClass('placeholder');
        placeholderSpan.text(placeholderText);
        parent.removeClass('selects-item__active');
        parent.find('.clear-select').removeClass('show');
    });

    if ($('.js-multiple_select').length) {
        $('.js-multiple_select').each(function () {
            var that = $(this),
                parent = that.closest('.calendar-filter__selects-item');
            if (that.find('option:selected').length) {
                parent.addClass('selects-item__active');
                parent.find('.clear-select').addClass('show');
            } else {
                parent.find('.clear-select').removeClass('show');
                parent.removeClass('selects-item__active');
            }
        });
    }

    var speed = null;
    vaObj.win.scroll(function () {
        var scrollPos = vaObj.win.scrollTop(),
            hWin = vaObj.win.height(),
            hcontent = $(document).height();
        if (scrollPos > hWin && (scrollPos != hcontent - hWin)) {
            $('.scrolling-btn').addClass('scrolling-btn_visible');
        } else if (scrollPos == hcontent - hWin) {
            $('.js-down').removeClass('scrolling-btn_visible');
        } else {
            $('.scrolling-btn').removeClass('scrolling-btn_visible');
        }
        clearTimeout(speed);
        speed = setTimeout(function () {
            $('.scrolling-btn').removeClass('scrolling-btn_visible');
        }, 2000);
    });
    vaObj.win.scroll();

    vaObj.win.resize(function () {
        var winW = vaObj.win.width();
        $('.small-tooltip-body').each(function () {
            var that = $(this),
                parent = that.closest('.news-list'),
                thatRightPos = that.offset().left + that.outerWidth();
            if (winW < thatRightPos) {
                that.addClass('small-tooltip-body_revers')
            }
        });
    });
    vaObj.win.resize();

    $('.js-up').on('click', function () {
        $('body,html').animate({scrollTop: 0}, 200);
    });
    $('.js-down').on('click', function () {
        var hWindow = $(document).height();
        $('body,html').animate({scrollTop: hWindow}, 200);
    });

    if (window.getSelection)
        $('body .wrap .layout').bind(
            'copy',
            function () {
                var selection = window.getSelection();
                var range = selection.getRangeAt(0);

                var magic_div = $('<div>').css({
                    overflow: 'hidden',
                    width: '1px',
                    height: '1px',
                    position: 'absolute',
                    top: '-10000px',
                    left: '-10000px'
                });
                magic_div.append(range.cloneContents(), source_link);
                $('body').append(magic_div);

                var cloned_range = range.cloneRange();
                selection.removeAllRanges();

                var new_range = document.createRange();
                new_range.selectNode(magic_div.get(0));
                selection.addRange(new_range);

                window.setTimeout(
                    function () {
                        selection.removeAllRanges();
                        selection.addRange(cloned_range);
                        magic_div.remove();
                    }, 0
                );
            }
        );

    vaObj.body.on('click', '.js-tabs-lnk', function (e) {
        e.preventDefault();
        let $links = $(this),
            $parent = $links.closest('.js-tabs-wrp'),
            $active = $parent.find('.js-tabs-lnk'),
            $content = $parent.find('.js-tab'),
            $urlTab = $links.attr('href');
        $active.removeClass('js-tabs-lnk_active');
        $parent.find('.js-tabs-lnk[href="' + $urlTab + '"]').addClass('js-tabs-lnk_active');
        $content.removeClass('js-tab_show');
        $content = $($urlTab);
        $content.addClass('js-tab_show');
    });
});
