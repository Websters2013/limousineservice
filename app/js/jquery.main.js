"use strict";
( function() {

    $( function() {

        $.each( $( '.site__menu' ), function() {

            new Menu ( $( this ) );

        } );

        $.each( $( '.language' ), function(){

            new Language ( $(this) )

        } );
    });

    var Language = function (obj) {

        //private properties
        var _obj = obj,
            _languagesDropDown = $( '.language__dropdown' ),
            _languagesItem = $( '.language__item' ),
            _languagesDropDownSpeed = 200,
            _mouseenterTimeout,
            _mouseleaveTimeout,
            _window = $( window );

        //private methods
        var _addEvents = function () {

                _languagesItem.on({
                    click: function ( e ) {

                        if( $( this ).parent().hasClass( 'language__active' ) ) {

                            _obj.trigger('mouseenter');
                            e.preventDefault();
                        }

                        if( $( this ).parent().hasClass( 'language__dropdown' ) ) {

                            $( '.language__active .language__item' ).appendTo( _languagesDropDown );

                            $( this ).appendTo( '.language__active' );

                            _languagesDropDown.stop( true, true ).slideUp( _languagesDropDownSpeed );
                        }
                    }
                });

                _obj.on({
                    mouseenter: function () {

                        clearTimeout( _mouseleaveTimeout );

                        _mouseenterTimeout = setTimeout( function() {

                            _languagesDropDown.stop( true, true ).slideDown( _languagesDropDownSpeed );

                        }, 200);
                    }
                });

                _obj.on({
                    mouseleave: function () {

                        clearTimeout( _mouseenterTimeout );

                        _mouseleaveTimeout = setTimeout( function() {

                            if(_languagesDropDown.is( ':visible' ) ) {

                                _languagesDropDown.stop( true, true ).slideUp( _languagesDropDownSpeed );
                            }

                        }, 200);
                    }
                });

            },
            _init = function () {
                _addEvents();
            };

        //public properties

        //public methods


        _init();
    };

    var Menu = function( obj ) {

        //private properties
        var _self = this,
            _menu = obj,
            _body = $( 'body' ),
            _window = $( window ),
            _showBtn = $( '.site__menu-btn' );

        //private methods
        var _onEvents = function() {

                _showBtn.on( {
                    click: function() {

                        _openMenu( $( this ) );

                    }
                } );

                _window.on( {
                    resize: function () {

                        _resetStyle();

                    },
                    scroll: function () {

                        _checkScroll();

                    }
                } );

            },
            _checkScroll = function () {

                var windowScroll = _window.scrollTop(),
                    heroHeight = $('.site__hero').innerHeight();

                if ( windowScroll > heroHeight ) {

                    if ( !_showBtn.hasClass( 'active' ) ) {

                        _showBtn.addClass('active')

                    }

                } else {

                    _showBtn.removeClass('active')

                }

            },
            _openMenu = function( elem )  {

                var curItem = elem;

                if( curItem.hasClass( 'opened' ) ) {

                    curItem.removeClass( 'opened' );
                    _menu.removeClass( 'opened' );

                    _body.css( {
                        'overflow': 'visible'
                    } );

                } else {

                    curItem.addClass( 'opened' );
                    _menu.addClass( 'opened' );

                    _body.css( {
                        'overflow': 'hidden'
                    } );
                }

            },
            _resetStyle = function() {

                _showBtn.removeClass( 'opened' );
                _menu.removeAttr( 'style' );
                _body.css( {
                    'overflow': 'visible'
                } );

            },
            _init = function() {
                _menu[ 0 ].obj = _self;
                _onEvents();
            };

        _init();
    };

} )();
