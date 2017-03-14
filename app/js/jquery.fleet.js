"use strict";
( function() {

    $( function() {

        $.each( $( '.fleet__item-gallery' ), function() {

            FleetSlider( $( this ) );

        } );
    });

    var FleetSlider = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _pagination = _obj.find( '.swiper-pagination' ),
            _swiper = null,
            _window = $( window );

        //private methods
        var _onEvents = function () {

            },
            _addSwiper = function () {

                _swiper = new Swiper( _obj, {
                    pagination: _pagination,
                    paginationClickable: true,
                    slidesPerView: 'auto',
                    effect: 'fade',
                    // loop: true,
                    centeredSlides: true,
                    paginationBulletRender: function (swiper, index, className) {

                        var names = [];

                        _obj.find( '.swiper-wrapper .swiper-slide' ).each( function() {

                            names.push( $(this).data('name') );

                        } );

                        return '<span class="' + className + '">' + names[index] + '</span>';
                    }
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
