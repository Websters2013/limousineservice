"use strict";
( function() {

    $( function() {

        $.each( $( '.autocomplete' ), function(){

            new GoogleAutocomplete ( $(this) );
        } );
    });

    var GoogleAutocomplete = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _autocompliteInput = _obj.find( '.autocomplete__field' ),
            _districtInput = _obj.find( '.autocomplete__district' ),
            _districtLabel = _districtInput.next( 'label' ),
            _autocomplete = null,
            _placeSearch = null;

        //private methods
        var _constructor = function () {
                _obj[0].obj = _self;

                _initAutocomplete();
                _onEvents();
            },
            _initAutocomplete = function () {

                _autocomplete = new google.maps.places.Autocomplete(
                    ( _autocompliteInput[ 0 ] ),
                    { types: ['geocode'] } );

                _autocomplete.addListener( 'place_changed', _fillInAddress );

            },
            _fillInAddress = function () {

                var place = _autocomplete.getPlace(),
                    districtStr = '';

                for ( var i = 0; i < place.address_components.length; i++ ) {

                    var addressType = place.address_components[ i ].types[ 0 ];

                    if ( addressType == 'country' ) {

                        districtStr = districtStr + place.address_components[ i ].long_name

                    } else if ( addressType == 'postal_code' ) {

                        districtStr = districtStr + ' ' + place.address_components[ i ].long_name

                    }
                }

                _districtLabel.addClass( 'active' );

                setTimeout( function () {

                    _districtInput.val( districtStr );

                }, 200);

            },
            _geoLocation = function () {

                if ( navigator.geolocation ) {

                    navigator.geolocation.getCurrentPosition( function( position ) {

                        var geoLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        var circle = new google.maps.Circle( {
                            center: geoLocation,
                            radius: position.coords.accuracy
                        } );

                        _autocomplete.setBounds( circle.getBounds() );

                    });
                }
            },
            _onEvents = function () {

                _autocompliteInput.on( {
                    focus: function() {

                        _geoLocation()
                    }
                } );

            };

        //public properties

        //public methods
        _self.initAutocomplite = function () {
            _initAutocomplete();
            _onEvents();
        };

        _constructor();
    };

} )();
