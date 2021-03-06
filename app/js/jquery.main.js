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
            _mouseleaveTimeout;

        //private methods
        var _addEvents = function () {

                _languagesItem.on({
                    click: function ( e ) {

                        if( $( this ).parent().hasClass( 'language__active' ) ) {

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
            // _newTest = function ( year, start, finish ) {
            //
            //     var startMonth = start,
            //         startYear = year,
            //         startPoint = new Date( startYear, startMonth, 1 ),
            //         startDay = startPoint.getDay(),
            //         finishMonth = finish + 1,
            //         finishYear = year,
            //         finishPoint = new Date( finishYear, finishMonth, 1 ),
            //         days = (finishPoint - startPoint)/( 1000*60*60*24 ),
            //         sunday = 0;
            //
            //     console.log(startPoint, finishPoint);
            //
            //     // finishPoint.setDate( finishPoint.getDate() - 1 );
            //     console.info(finishPoint);
            //
            //     if ( startDay !== 1 ) {
            //
            //         console.log('startDay !== 1', startDay);
            //
            //         switch ( startDay ){
            //
            //             case 0:
            //
            //                 startPoint.setDate( startPoint.getDate() + 1 );
            //
            //                 console.log('0',startPoint.getDay());
            //
            //                 break;
            //             case 2:
            //
            //                 startPoint.setDate( startPoint.getDate() + 6 );
            //                 console.log('2',startPoint.getDay());
            //
            //                 break;
            //             case 3:
            //
            //                 startPoint.setDate( startPoint.getDate() + 5 );
            //                 console.log('3',startPoint.getDay());
            //
            //                 break;
            //             case 4:
            //
            //                 startPoint.setDate( startPoint.getDate() + 4 );
            //                 console.log('4',startPoint.getDay());
            //
            //                 break;
            //             case 5:
            //
            //                 startPoint.setDate( startPoint.getDate() + 3 );
            //                 console.log('4',startPoint.getDay());
            //
            //                 break;
            //
            //             case 6:
            //
            //                 startPoint.setDate( startPoint.getDate() + 2 );
            //                 console.log('4',startPoint.getDay());
            //
            //                 break;
            //
            //         }
            //
            //     }
            //
            //     for ( var i = 0; i < days; i++ ){
            //
            //         var curDay = startPoint.getDay();
            //
            //         console.log(curDay, i);
            //
            //         if ( curDay == 0 ) {
            //
            //             sunday++
            //
            //         }
            //
            //         startPoint.setDate( startPoint.getDate() + 1 )
            //
            //     }
            //
            //     console.error(sunday);
            //
            // },

            _init = function () {
                // _newTest( 2004, 1, 2 );
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
