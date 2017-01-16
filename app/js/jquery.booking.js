"use strict";
( function() {

    $( function() {

        $.each( $( '.booking' ), function(){

            new BookingForm ( $(this) )

        } );

        $.each( $( '.booking__form' ), function() {

            new LabelAnimate ( $( this ) );

        } );

    });

    var BookingForm = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _swiperContainer = _obj.find('.swiper-container'),
            _swiperControlsWrap = _obj.find('.booking__form-controls');

        //private methods
        var _onEvents = function () {

            },
            _addSwiper = function () {

                new Swiper( _swiperContainer, {
                    nextButton: _swiperControlsWrap.find( '.swiper-button-next' ),
                    prevButton: _swiperControlsWrap.find( '.swiper-button-prev' ),
                    effect: 'fade',
                    onlyExternal: true
                });

            },
            _init = function () {
                _obj[0].list = _self;
                _onEvents();
                _addSwiper();
            };

        //public properties

        //public methods

        _init();
    };

    var LabelAnimate = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _input = _obj.find( 'input' ),
            _textarea = _obj.find( 'textarea' );

        //private methods
        var _onEvents = function () {

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

                        console.log('_textarea focus');

                        _animate( $(this), true )

                    }
                } );

                _textarea.on( {
                    blur: function() {

                        console.log('_textarea blur');

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

            },
            _init = function () {
                _obj[0].list = _self;
                _onEvents();
            };

        //public properties

        //public methods

        _init();
    };

} )();
