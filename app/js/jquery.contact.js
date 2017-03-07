
( function() {
    "use strict";

    $( function() {

        $.each( $( '.contact__map' ), function() {

            new Map ( $( this ) );

        } );
    });

    var Map = function ( obj ) {

        this.obj = obj;
        this.mapWrap = this.obj;

        //private properties
        var _self = this,
            _map,
            _markers = [],
            _data = null;

        //private methods
        var _constructor = function () {
                _loadData();
                _onEvents();
            },
            _initMap = function () {

                var mapOptions = {
                    zoom: _data[ 'zoom' ],
                    scrollwheel: false
                };

                _map = new google.maps.Map( _self.mapWrap[0], mapOptions );
                _setMarkers( _map );

            },
            _loadData = function () {

                $.getJSON('json/contact-map.json', {}, function( data ){

                    _data = data;
                    google.maps.event.addDomListener(window, 'load', _initMap);

                });
            },
            _onEvents = function () {


            },
            _setMarkers = function ( map ) {

                for (var j =0; j < _data[ 'places' ].length; j++) {

                    _addMarker( j, map )
                }
            },
            _addMarker = function ( i, map ) {

                setTimeout(function() {

                    var curItem = _data[ 'places' ][i],
                        curLatLng = new google.maps.LatLng( curItem[ 'lat' ], curItem[ 'lng' ] ),
                        bounds = new google.maps.LatLngBounds();

                    _markers[ i ] = new google.maps.Marker( {
                        position: curLatLng,
                        map: map,
                        clickable: false,
                        icon: {
                            url: curItem[ 'icon' ],
                            scaledSize: new google.maps.Size( curItem[ 'size' ][ 0 ], curItem[ 'size' ][ 1 ] )
                        },
                        animation: google.maps.Animation.DROP

                    } );

                    for ( var j = 0; j < _markers.length; j++ ) {

                        if ( _markers[ j ] !== '' ) {
                            bounds.extend( _markers[ j ].getPosition() );
                        }

                    }
                    _map.fitBounds( bounds );

                }, i * 300);

            };

        _constructor();
    };

} )();
