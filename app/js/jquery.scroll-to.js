
( function() {
    "use strict";

    $( function() {

        $.each( $( '.navigation-controls' ), function() {

            new ScrollToElement ( $( this ) );
            console.log('ScrollToElement')
        } );

    });

    var ScrollToElement = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _btns = _obj.find( '.navigation-controls__btn' ),
            _btnDown = $( '.navigation-down' ),
            _item = $( '.navigation-item' ),
            _scroller = $('html, body'),
            _window = $( window );

        //private methods
        var _constructor = function () {
                _obj[0].obj = _self;
                _onEvents();
            },
            _onEvents = function () {

                _btns.on({
                    click: function () {

                        _scrollTo( $( this ) );
                        return false;
                    }
                });
                _btnDown.on({
                    click: function () {

                        _scrollTo( $( this ) );
                        return false;
                    }
                });
                _window.on({
                    scroll: function (  ) {

                        _checkScroll( _window.scrollTop() );
                    }
                });
            },
            _checkScroll = function ( scroll ) {

                var windowHeight = _window.height(),
                    stopPosition = $( '.reserve' ).offset().top - (windowHeight/2) - (_obj.innerHeight()/2) ;

                if ( scroll >=  stopPosition) {

                    _obj.css({
                        'margin-top': -( scroll - stopPosition )
                    });

                } else {

                    _obj.css({
                        'margin-top': 0
                    });
                }

                if ( _window.scrollTop() >  windowHeight - 100 && _window.width() >= 1200 ) {

                    _obj.addClass( 'fixed' )

                } else {

                    _obj.removeClass( 'fixed' )
                }

                _item.each(function () {

                    var curItem = $(this),
                        topPos = curItem.offset().top;

                    if( _window.scrollTop() > ( topPos - windowHeight/2 ) ){

                        _btns.removeClass( 'active' );
                        _btns.eq( curItem.index() ).addClass( 'active' );
                        curItem.addClass( 'active' );

                    } else if ( _window.scrollTop() < ( topPos - windowHeight/2 ) ) {

                        _btns.eq( curItem.index() ).removeClass( 'active' );
                        curItem.removeClass( 'active' )
                    }
                })
            },
            _scrollTo = function ( elem ) {

                var scrollElem = elem.attr( 'href' );

                if ( scrollElem.length !== 0 ) {

                    _scroller.animate( {scrollTop: $( scrollElem ).offset().top - 15 }, 500 );
                }

                return false;
            };

        //public properties

        //public methods

        _constructor();
    };

} )();




