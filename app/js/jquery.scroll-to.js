
( function() {
    "use strict";

    $( function() {

        $.each( $( '.navigation-controls' ), function() {

            new ScrollToElement ( $( this ) );
            console.log('ScrollToElement')
        } );

    });

    // $(document).ready(function(){
    //     $('.navigation-controls__btn').click( function(){
    //         var scroll_el = $(this).attr('href');
    //         if ($(scroll_el).length != 0) {
    //             $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
    //         }
    //         return false;
    //     });
    // });

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
                    scroll: function () {

                        _checkScroll();
                    }
                });
            },
            _checkScroll = function () {

                var windowHeight = _window.height();

                if ( _window.scrollTop() >  windowHeight - 100 && _window.width() >= 768 ) {

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




