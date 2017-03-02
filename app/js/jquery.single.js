"use strict";
( function() {

    $( function() {

        $.each( $( '.single__gallery' ), function() {

            SingleSlider( $( this ) );
            console.log(1000)
        } );
    });

    var SingleSlider = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _btnNext = _obj.find( '.site__centered .swiper-button-next' ),
            _btnPrev = _obj.find( '.site__centered .swiper-button-prev' ),
            _window = $( window );

        //private methods
        var _onEvents = function () {

            },
            _addSwiper = function () {

                var spaceBetween = null;

                if ( _window.width() >= 768 ) {

                    spaceBetween = 55;

                } else {

                    spaceBetween = 15;
                }

                new Swiper( _obj, {
                    nextButton: _btnNext,
                    prevButton: _btnPrev,
                    spaceBetween: spaceBetween,
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    loop: true
                });
            },
            _init = function () {
                _obj[0].obj = _self;
                _onEvents();
                _addSwiper();
            };

        //public properties

        //public methods

        _init();
    };

} )();
