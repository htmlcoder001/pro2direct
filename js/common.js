$(document).ready(function() {
    /*$('.map-wr').each(function(){
        var zoomIn = $(this).find('.zoomIn'),
            zoomOut = $(this).find('.zoomOut');
        zoomIn.on('click', function(){
            map.setZoom(map.getZoom() + 1);
        });
        zoomOut.on('click', function() {
            map.setZoom(map.getZoom() - 1);
        });
    });*/
    $('input[type=radio]').on('change', function() {
        $('form[name="arrFilter_form"]').submit();
    });
	//$('.karta-row .karta-block').matchHeight(); 

	$( "#select-lang" ).change(function() {
			var selectVal = $("#select-lang option:selected").val();
			selectVal
			window.location.href = selectVal;

		});

	jQuery.fn.exists = function() {
		return $(this).length;
	};

	if ($('.tabs').exists()){
		$('.tabs').tabs();
	}

	var $header = $('.l-header');
	var $h_menu = $('.h-menu-container');


	if ($(window).width() > 480) {
		$(window).scroll(function () {

          $('.l-footer').click();
			if ($(window).scrollTop() >= $header.height() - 10) {
				$h_menu.addClass('fixed');

				$h_menu.css('left', - $(window).scrollLeft());

			} else {
				$h_menu.removeClass('fixed');
			}
		});
		$(window).scroll();
	}

	CSSGlobalOrder.process();

	/*$(window).on( 'debouncedresize' , function() {
		CSSGlobalOrder.process();
		$('.h-sidemenu').removeClass('close');
		$('.mobile-header').removeClass('show');
		$('body').removeClass('aside-is-visible');

		if ($('.search').is(':visible')) {
			$('.search-close').click();
		}

		inside__menuSet();

	});*/

	imagesLoaded( $('.promo') , function(){
		//$('.promo').addClass('show');
	});


	$('.user-username').on('click', function(e){
		e.stopPropagation();
	});

	$('.promo__slider').slick({
		autoplay: false,
		dots: false,
		infinite: true,
		arrows: true,
		speed: 450,
		touchThreshold: 50,
		slidesToShow: 5,
		slidesToScroll: 5,
		responsive: [
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4
				}
			},
			{
				breakpoint: 1280,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			}
		]
	});

	var aside__slider = $('.aside__slider')

	$('.aside__slider').slick({
		autoplay: true,
		dots: true,
		infinite: true,
		arrows: false,
		touchThreshold: 50,
		speed: 150,
		slidesToShow: 1,
		slidesToScroll: 1,

	});
	if(typeof asideRightSlider !== "undefined"){
		var asideRightSlider = 10000;
	}
	$('.aside-right__slider').slick({
		autoplaySpeed: asideRightSlider,
		autoplay: true,
		dots: true,
		infinite: true,
		arrows: false,
		touchThreshold: 50,
		speed: 150,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		cssEase: 'linear',
                responsive: [
		   {
		      breakpoint: 600,
		      settings: {
		        dots: false
		      }
		    }
		]
	});

	$('.s-slider').slick({
		//variableWidth: true,
		autoplaySpeed: 5000,
		autoplay: true,
		slidesToShow: 7,
		slideToScroll: 1,
		dots: false,
		infinite: true,
		touchThreshold: 50,
		speed: 1000,
		customPaging: true,
		responsive: [
			{
				breakpoint: 1430,
				settings: {
					slidesToShow: 6
				}
			},
			{
				breakpoint: 1250,
				settings: {
					slidesToShow: 5
				}
			},
			{
				breakpoint: 1070,
				settings: {
					slidesToShow: 4
				}
			}
		]
	});


	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$('.h-search').removeClass('show');
		}
	});

	/*hover menu*/
	var md = new MobileDetect(window.navigator.userAgent);
	function hoverDevice(){
		var menu = $('.h-menu','.l-header');

		if (!menu.length) { return; }
		/*remove class hover function*/

		function removerHover() {
			menu.children('li').removeClass('hover');
		}
		/*add class hover*/

		if(md.mobile()){
			menu.children('li').children('a').on('click', function(event) {

				event.stopPropagation();

				var $cur = $(this);
				var $curParent = $cur.parent();
				if(!$curParent.has('ul').length || $curParent.hasClass('hover')){
					window.location = $cur.attr('href');
					return;
				}
				removerHover();
				$curParent.addClass('hover');

				event.preventDefault();
			});

			menu.on('click', function (e) {
				e.stopPropagation();
			});

			$(document).on('click', function (e) {
				removerHover();
				//$('.submenu-formed').removeClass('submenu-formed');
			});

			return;
		}
		/*menu.children('li').on('mouseenter', function () {
			removerHover();
			$(this).addClass('hover');
		}).on('mouseleave', function () {
			removerHover();
		})*/
		$('.h-menu__lnk').on('click', function(e){
			e.preventDefault();
			var that = $(this);
			$('.h-menu__lnk').not(that).parent('.has_submenu').removeClass('hover');
			that.parent('.has_submenu').toggleClass('hover');
		});
	}
	hoverDevice();
	$(document).on('click', function(e){
    if($(e.target).closest('.h-menu__lnk').length)
    return;
    $('.has_submenu').removeClass('hover');
    e.stopPropagation();
  });
	/*hover menu end*/

	/*open drop menu*/
	dropMenu(100, 100, 5);
	function dropMenu (dropMinHeight, bottomSpace, maxColumnsLenght){
		var $submenuAll = $('.submenu','.l-header');
		if(!$submenuAll.length){return;}
		var subSubmenuWidth = function () {
			$submenuAll.children('ul').css('width',Math.round($('.h-menu','.l-header').outerWidth() * 0.20));
		};
		subSubmenuWidth();

		$('.h-menu','.l-header').children('li').on('mouseenter', function () {

			var $currentItem = $(this);
			if(!$currentItem.has('.submenu').length){return;}
			//if($currentItem.hasClass('submenu-formed')){return;}
			//$currentItem.addClass('submenu-formed');

			var $submenuContainer = $currentItem.find('.submenu-container');
			var $submenu = $currentItem.find('.submenu');

			var _windowHeight = $(window).height();
			var _bodyScrollTop = $(window).scrollTop();
			var _topCordSubmenuContainer = $submenuContainer.offset().top;
			var _dropMaxHeight = _windowHeight - _topCordSubmenuContainer + _bodyScrollTop - bottomSpace;
			if(_dropMaxHeight<dropMinHeight){
				_dropMaxHeight = dropMinHeight;
			}

			///*====== test boxes =====*/
			//var $testBlock = $('<div class="testBlock" />');
			//$('.testBlock').remove();
			//$($testBlock).prependTo('body').css({
			//	'position': 'fixed',
			//	'top': _topCordSubmenuContainer - _bodyScrollTop,
			//	'right': 0,
			//	'width': 60,
			//	'height': _dropMaxHeight,
			//	'background': 'rgba(255,0,0,0.5)',
			//	'z-index': 999
			//}).text($testBlock.css('height'));
			//$(window).resize(function () {
			//	$('.testBlock').remove();
			//});
			///*====== test boxes end =====*/

			var $elementSubmenu = $currentItem.find('.submenu').children('ul');
			var _heightCurrentElement,
					_sumHeightElementsSubmenu = 0,
					i = 0,
					_maxColumnHeight = 0,
					_dropMaxHeightNew = _dropMaxHeight;
			var flag = false;
			var _elementSubmenuLength = $elementSubmenu.length;
			for(i; i< _elementSubmenuLength; i++){
				_heightCurrentElement = $elementSubmenu.eq(i).outerHeight();
				if(_heightCurrentElement > _dropMaxHeight){
					flag = true;
					if ( _heightCurrentElement > _maxColumnHeight ){
						_maxColumnHeight = _heightCurrentElement;
					}
					_dropMaxHeightNew = _maxColumnHeight;
				}
				_sumHeightElementsSubmenu += _heightCurrentElement;
			}

			var _columnsLength = 1;
			if(_sumHeightElementsSubmenu>_dropMaxHeightNew){
				_columnsLength = Math.ceil(_sumHeightElementsSubmenu/_dropMaxHeightNew);
				if(_elementSubmenuLength>1){
					_columnsLength = _columnsLength+1;
				}
				if(_columnsLength>maxColumnsLenght){
					_columnsLength = maxColumnsLenght;
				}
			}

			var _mainMenuWidth = $currentItem.closest('.h-menu').outerWidth();

			var _submenuContainerWidth = Math.round(_mainMenuWidth*0.2) * _columnsLength;
			if(_columnsLength<maxColumnsLenght && _mainMenuWidth < 1200){
				$elementSubmenu.css('width',Math.round(_mainMenuWidth*0.24));
				_submenuContainerWidth = Math.round(_mainMenuWidth*0.24) * _columnsLength;
			}
			$submenuContainer.css('width',_submenuContainerWidth);

			/*remove style from submenu and submenu-container*/
			$submenuContainer.css({
				'width':_submenuContainerWidth,
				'height':'auto'
			}).removeClass('submenu-scrolled');
			$submenu.css('height','auto');
			/*remove style from submenu and submenu-container end*/

			/*isotope initial*/
			var submenuSet = function(){
				$submenu.isotope({
					itemSelector: '.submenu > ul',
					layoutMode: 'masonry',
					transitionDuration: 0
				});
			};
			submenuSet();
			/*isotope initial end*/

			var _submenuHeight = $submenu.outerHeight();
			if(_submenuHeight > (_dropMaxHeight+bottomSpace)){
				$submenuContainer.css({
					'width':_submenuContainerWidth + 20,
					'height':_dropMaxHeight<dropMinHeight ? _dropMaxHeight : _dropMaxHeight+bottomSpace
				}).addClass('submenu-scrolled');
				/*if(!md.mobile()){
					$('body').addClass('body-fixed');
				}*/
			}

			/*drop menu position*/
			var _itemLeftCord = $currentItem.position().left;
			$currentItem.css('position','relative');
			$submenuContainer.css({
				'right':'auto',
				'left': '0'
			});

			if (_submenuContainerWidth > _mainMenuWidth - _itemLeftCord) {
				$currentItem.css('position','static');
				$submenuContainer.css({
					'left':'auto',
					'right':'0'
				});
			}
			/*drop menu position end*/

			///*====== test boxes =====*/
			//var $testBlock2 = $('<div class="testBlock2" />');
			//$('.testBlock2').remove();
			//$($testBlock2).prependTo('body').css({
			//	'position': 'fixed',
			//	'top': _topCordSubmenuContainer - _bodyScrollTop,
			//	'left': 0,
			//	'color': 'white',
			//	'width': 160,
			//	'height': _dropMaxHeightNew,
			//	'background': 'rgba(0,0,255,0.5)',
			//	'z-index': 999
			//}).html(
			//		'макс. высота начал.: '+_dropMaxHeight+'px, '
			//		+'<br>'
			//		+'высота большей кол.: '+_maxColumnHeight+'px, '
			//		+'<br>'
			//		+'макс. высота пересчит.: '+_dropMaxHeightNew+'px, '
			//		+'<br>'
			//		+'сумма высот блоков: '+_sumHeightElementsSubmenu+'px, '
			//		+'<br>'
			//		+'высота субменю: '+_submenuHeight+'px, '
			//		+'<br>'
			//		+'колич. подпунктов: '+_elementSubmenuLength
			//		+'<br>'
			//		+'колич. колонок (до персчета): '+_columnsLengthBefore
			//		+'<br>'
			//		+'колич. колонок: '+_columnsLength
			//);
			//$(window).resize(function () {
			//	$('.testBlock2').remove();
			//});
			///*====== test boxes end =====*/
		}).on('mouseleave', function(){
			//$('body').removeClass('body-fixed');
		});

		$(window).resize(function () {
			subSubmenuWidth();
			//$('.submenu-formed').removeClass('submenu-formed');
			//$('.submenu-container').attr('style','');
		});
	//	$(window).scroll(function () {
			//$('.submenu-formed').removeClass('submenu-formed');
	//	});
	}
	/*open drop menu end*/

	$('.h-sidemenu').on('click', function(event) {
		event.preventDefault();
		$('body').toggleClass('aside-is-visible');
		$(this).blur();
		$('.h-sidemenu').toggleClass('close');
		$('.mobile-header').toggleClass('show');
	});


	$('.h-menu > li > a').on('click', function(event) {
		//event.preventDefault();
	});


	if ($('.search').length) {
		var search = $('.search');
		var close  = $('.search-close');
		var toggle = $('.search-show');

		toggle.on('click', function(event) {
			event.preventDefault();
			toggle.hide();
			search.show();
		});

		close.on('click', function(event) {
			event.preventDefault();
			search.hide();
			toggle.show();

			$('.search > div > input').val('');
		});
	}


	$('input, textarea').placeholder();

	$('.graph').addClass('show');

	if ($('.catalogue').length) {
		var catalogueSet = function(){
			$('.catalogue').isotope({
				itemSelector: '.catalogue > ul',
				transitionDuration: 0
			});
		}
		catalogueSet();
	}


	var inside__menuSet = function(){
		if ($('.inside__menu').length) {
			$('.inside__menu').isotope({
				itemSelector: '.inside__menu > li',
				transitionDuration: 0
			});
		}
	}

	inside__menuSet();


// карта взаимосвязь
	if ($('#b-map').length) {
		var b_map_current = 0;
		var related;
		var b_num;

		$('#b-map-img area')
				.on('mouseenter', function() {
					var num = $(this).index() + 1;

					b_map_current = "b-map" + num + "-hover";
					$('#b-map-in').addClass(b_map_current);

					related = $('#b-related' + num);
					related.addClass('select_obl');
				})

				.on('mouseleave', function() {
					$('#b-map-in').removeClass(b_map_current);
					related.removeClass('select_obl');
				});


		$('#b-map .b-map__star')
				.on('mouseenter', function(){
					$('#b-related7').addClass("select_obl");
				})
				.on('mouseleave', function(){
					$('#b-related7').removeClass("select_obl");
				});

 // присвоение классов $('#b-related li')
		$('#myDropdown li')
				.on('mouseenter', function() {
					if ($(this).attr('id') !== undefined) {
						b_num = $(this).attr('id').slice(-1);
						$('#b-map-in').addClass("b-map" + b_num + "-hover");

						if (b_num == 7) {
							$('.b-map__star').addClass('hover');
						}
					}
				})

				.on('mouseleave', function() {
					$('#b-map-in').removeClass("b-map" + b_num + "-hover");
					$('.b-map__star').removeClass('hover');
				});

	}


	// var previousEvent = false;
	// $(document).mousemove(function(evt) {
	// 	evt.time = Date.now();
	// 	var res;
	// 	var h_menu = $('.h-menu');
	// 	res = makeVelocityCalculator( evt, previousEvent);
	// 	previousEvent = evt;
	// 	console.log("velocity:"+res);
	// });

	// function makeVelocityCalculator(e_init, e) {
	// 	var x = e_init.clientX, new_x,new_y,new_t,
	// 		x_dist, y_dist, interval,velocity,
	// 		y = e_init.clientY,
	// 		t;
	// 	if (e === false) {return 0;}
	// 	t = e.time;
	// 	new_x = e.clientX;
	// 	new_y = e.clientY;
	// 	new_t = Date.now();
	// 	x_dist = new_x - x;
	// 	y_dist = new_y - y;
	// 	interval = new_t - t;
	// 	// update values:
	// 	x = new_x;
	// 	y = new_y;
	// 	velocity = Math.sqrt(x_dist*x_dist+y_dist*y_dist)/interval;
	// 	return velocity;
	// }

    $(".print").on("click",function(e){
       e.preventDefault();
       window.print();
    });


var $voiceTrigger = $("#voice-trigger");
var $searchForm = $("#title-search-mobile");
var $searchInput = $("#title-search-input-mobile");
/*  set Web Speech API for Chrome or Firefox */
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

/* Check if browser support Web Speech API, remove the voice trigger if not supported */
if (window.SpeechRecognition) {

    /* setup Speech Recognition */
    var recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.addEventListener('result', _transcriptHandler);

    recognition.onerror = function(event) {
        console.log(event.error);

        /* Revert input and icon CSS if no speech is detected */
        if(event.error == 'no-speech' || event.error == 'not-allowed'){
            $voiceTrigger.removeClass('active');
            //$searchInput.attr("placeholder", "Search me...");
            $voiceTrigger.remove();
        }
    }
} else {
    $voiceTrigger.remove();
}

 $voiceTrigger.on('click touch', listenStart);


/* Our listen event */
function listenStart(e){
    e.preventDefault();
    /* Update input and icon CSS to show that the browser is listening */
    $searchInput.attr("placeholder", "Listening...");
    $voiceTrigger.addClass('active');
    /* Start voice recognition */
    recognition.start();
}

/* Parse voice input */
function _parseTranscript(e) {
    return Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('')
}

/* Convert our voice input into text and submit the form */
function _transcriptHandler(e) {
    var speechOutput = _parseTranscript(e)
    $searchInput.val(speechOutput);
    //$result.html(speechOutput);
    if (e.results[0].isFinal) {
        $searchForm.submit();
    }
}


});



// ios orientationchangefix
!function(t){function e(){m.setAttribute("content",l),f=!0}function n(){m.setAttribute("content",v),f=!1}function i(i){s=i.accelerationIncludingGravity,r=Math.abs(s.x),c=Math.abs(s.y),u=Math.abs(s.z),t.orientation&&180!==t.orientation||!(r>7||(u>6&&8>c||8>u&&c>6)&&r>5)?f||e():f&&n()}var a=navigator.userAgent;if(/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(a)&&a.indexOf("AppleWebKit")>-1){var o=t.document;if(o.querySelector){var r,c,u,s,m=o.querySelector("meta[name=viewport]"),d=m&&m.getAttribute("content"),v=d+",maximum-scale=1",l=d+",maximum-scale=10",f=!0;m&&(t.addEventListener("orientationchange",e,!1),t.addEventListener("devicemotion",i,!1))}}}(this);