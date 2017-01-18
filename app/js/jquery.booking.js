"use strict";
( function() {

    $( function() {

        $.each( $( '.booking' ), function(){

            new BookingForm ( $(this) )

        } );

        $.each( $( '.booking__form' ), function() {

            new LabelAnimate ( $( this ) );

        } );

        $('.datetimepicker').datetimepicker({
            minDate:'0',
            minTime:'0'
        });

    });

    var BookingForm = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _form = _obj.find( '.booking__form' ),
            _controlPanel = _form.find( '.booking__form-controls' ),
            _cloneSrcInput = _obj.find( 'input[name=source-address]' ),
            _submitBtn = _form.find( '.booking__form-submit' ),
            _swiperContainer = _obj.find('.swiper-container'),
            _swiperControlsWrap = _obj.find('.booking__form-controls'),
            _nextBtn = _swiperControlsWrap.find( '.swiper-button-next' ),
            _prevBtn = _swiperControlsWrap.find( '.swiper-button-prev' ),
            _steps = $( '.booking__form-item' ),
            _statusWrap = $( '.booking__status' ),
            _statusLine = _statusWrap.find( '.booking__status-line' ),
            _statusItem = _statusWrap.find( '.booking__status-item' ),
            _preloader = $( '.preloader' ),
            _request,
            _scroller = $( 'html,body' ),
            _window = $( window );

        //private methods
        var _constructor = function () {
            _obj[0].list = _self;
            _onEvents();
            _addSwiper();
        },
            _onEvents = function () {

                _form.on( {
                    change: function() {

                        var activeSlide = $('.swiper-slide-active'),
                            activeIndex = activeSlide.index();

                        _checkStep( activeIndex );

                        if ( activeSlide.hasClass( 'required' ) ) {

                            _nextBtn.removeClass( 'disabled' )

                        }

                    },
                    submit: function() {

                        if ( _steps.eq( 2 ).hasClass( 'required' ) ) {
                            _preloader.addClass( 'loading' );
                            _sendForm();
                            return false

                        } else {

                            return false

                        }

                    }
                } );

                _cloneSrcInput.on( {
                    change: function() {

                        if ( $( this ).prop('checked') ) {

                            _copyDepartureValues();

                        }

                    }
                } );
            },
            _addSwiper = function () {

                new Swiper( _swiperContainer, {
                    nextButton: _nextBtn,
                    prevButton: _prevBtn,
                    effect: 'fade',
                    onlyExternal: true,
                    simulateTouch: false,
                    onSlideChangeEnd: function( swiper) {

                        var activeSlide = $('.swiper-slide-active'),
                            activeIndex = activeSlide.index();

                        _window.scrollToTop( 0 );

                        _setStatus( activeIndex );

                        if ( activeIndex == 2 &&  activeSlide.hasClass( 'required' )) {

                            _submitBtn.addClass( 'active' )

                        } else {

                            _submitBtn.removeClass( 'active' )

                        }

                        if ( activeSlide.hasClass( 'required' ) ) {

                            _nextBtn.removeClass( 'disabled' );
                            _controlPanel.addClass( 'required' );

                        } else {

                            _nextBtn.addClass( 'disabled' );
                            _controlPanel.removeClass( 'required' );

                        }

                    }
                });
            },
            _checkStep = function ( index ) {

                var curStep = _steps.eq( index ),
                    inputs = curStep.find( 'input' ),
                    requaredInputs = inputs.filter( '[required]' ),
                    requaredLength = 0,
                    scrollPosition = _controlPanel.offset().top -  _window.height() + _controlPanel.innerHeight();

                if ( index == 0 ) {

                    inputs.each( function () {

                        var curRadio = $( this );

                        if ( curRadio.prop( 'checked' ) ) {

                            requaredLength ++;

                        }
                    } );

                    if ( requaredLength == 3 ) {

                        curStep.addClass( 'required' );
                        _controlPanel.addClass( 'required' );

                        _window.scrollToTop( scrollPosition );

                    }

                } else {

                    requaredInputs.each( function () {

                        var curInput = $( this );

                        if ( curInput.val() !== '' ) {

                            requaredLength ++;

                        }

                    } );

                    console.log('requaredInputs',requaredInputs.length, 'requaredLength', requaredLength);

                    if ( requaredLength >= requaredInputs.length) {

                        curStep.addClass( 'required' );
                        _controlPanel.addClass( 'required' );
                        _window.scrollToTop( scrollPosition );

                    }
                }

                if ( index == 2 && curStep.hasClass( 'required' ) ) {

                    _submitBtn.addClass( 'active' )

                }
            },
            _copyDepartureValues = function () {

                var arrivalAddress = _obj.find( 'input[name=arrival-address]' ),
                    arrivalDistrict = _obj.find( 'input[name=arrival-district]' ),
                    departurelAddress = _obj.find( 'input[name=departure-address]' ),
                    departurelDistrict = _obj.find( 'input[name=departure-district]' );


                arrivalAddress.next('label').addClass('active');
                arrivalDistrict.next('label').addClass('active');

                setTimeout(function () {

                    arrivalDistrict.val( departurelDistrict.val() );
                    arrivalAddress.val( departurelAddress.val() );

                    _checkStep( arrivalDistrict.parents( '.booking__form-item' ).index() );

                }, 200);

            },
            _setStatus = function ( index ) {

                var curItem = _statusItem.eq( index );

                curItem.prevAll().addClass( 'last' );
                curItem.nextAll().removeClass( 'last' );
                curItem.removeClass( 'last' );
                _statusItem.removeClass( 'active' );
                curItem.addClass( 'active' );

                if ( index == 0 ) {

                    _statusLine.css({
                        width: 0
                    })

                } else if( index == 1 ) {

                    _statusLine.css({
                        width: 50 + '%'
                    })

                } else if ( index == 2 ) {

                    _statusLine.css({
                        width: 100 + '%'
                    })

                }

            },
            _sendForm = function(){

                var formData = _form.serialize();

                $.ajax({
                    type: _obj.attr('method'),
                    url: _obj.attr('action'),
                    data: formData,
                    success: function () {

                        _loadContent();

                    }
                });
            },
            _loadContent = function(){

                // _request.abort();
                var inputs = _form.find( 'input' ),
                    name = inputs.filter('[name=name]').val(),
                    dateDeparture = inputs.filter('[name=departure-date]').val(),
                    dateArrival = inputs.filter('[name=arrival-date]').val(),
                    addressDeparture = inputs.filter('[name=departure-address]').val(),
                    addressArrival = inputs.filter('[name=arrival-address]').val(),
                    serviceInputs = inputs.filter('[name=select-service]'),
                    numberPassengersInputs = inputs.filter('[name=number-passengers]'),
                    typeInputs = inputs.filter('[name=type-car]'),
                    service,
                    type,
                    numberPassengers;

                serviceInputs.each( function () {

                    if ( $(this).prop( 'checked' )) {
                        service = $(this).val();
                        return false
                    }

                });

                numberPassengersInputs.each( function () {

                    if ( $(this).prop( 'checked' )) {
                        numberPassengers = $(this).val();
                        return false
                    }

                });

                typeInputs.each( function () {

                    if ( $(this).prop( 'checked' )) {
                        type = $(this).val();
                        return false
                    }

                });

                _request = $.ajax( {

                    url: 'php/message.php',
                    dataType: 'html',
                    data: {
                        name: name,
                        dateDeparture: dateDeparture,
                        dateArrival: dateArrival,
                        addressDeparture: addressDeparture,
                        addressArrival: addressArrival,
                        service: service,
                        numberPassengers: numberPassengers,
                        type: type
                    },
                    timeout: 20000,
                    type: "GET",
                    success: function( msg ){

                        _obj.append( msg );
                        _window.scrollToTop( 0 );
                        _preloader.removeClass( 'loading' );

                        setTimeout(function () {

                            $( '.site__menu' ).removeClass( 'site__menu_dark' );
                            $( '.logo' ).addClass( 'logo_white' );
                            $( '.language' ).addClass( 'language_white' );
                            $( '.booking__message' ).addClass( 'show' )

                        }, 200);


                    },
                    error: function( XMLHttpRequest ){
                        if( XMLHttpRequest.statusText != "abort" ){
                            alert( XMLHttpRequest.statusText );
                        }
                    }
                } );
            };

        //public properties

        //public methods
        _window.scrollToTop = function ( stopScrollPosition ) {

            // var stopScrollPosition = 0;

            _scroller.animate({
                scrollTop: stopScrollPosition
            },{
                duration: 500
            });
        };

        _constructor();
    };

    var LabelAnimate = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _input = _obj.find( 'input' ).not('[type=radio]'),
            _textarea = _obj.find( 'textarea' );

        //private methods
        var _constructor = function () {
                _obj[0].list = _self;
                _onEvents();
            },
            _onEvents = function () {

                _input.on( {
                    focus: function() {

                        _animate( $(this), true )

                    }
                } );

                _input.on( {
                    blur: function() {

                        _animate( $(this), false )

                    }
                } );

                _textarea.on( {
                    focus: function() {

                        _animate( $(this), true )

                    }
                } );

                _textarea.on( {
                    blur: function() {

                        _animate( $(this), false )

                    }
                } );
            },
            _animate = function ( input, state ) {

                var curInput = input,
                    curWrap = curInput.parent(),
                    curLabel = curWrap.find( 'label' );

                if ( curInput.val() == '' && state ) {

                    curLabel.addClass( 'active' );

                } else if ( curInput.val() == '' && !state ) {

                    curLabel.removeClass( 'active' );

                }

            };

        //public properties

        //public methods

        _constructor();
    };

} )();
