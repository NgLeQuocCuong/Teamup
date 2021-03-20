import React, { PureComponent } from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

class MapWrapper extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            markerPosition: null,
            initialCenter: {
                lat: 0,
                lng: 0,
            },
        }
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(pos =>
            this.setState({
                initialCenter: {
                    lat: parseFloat(pos.coords.latitude),
                    lng: parseFloat(pos.coords.longitude),
                }
            }))
    }

    onMapClicked = (a, b, c) => {
        console.log(c.latLng.lat())
        this.setState({
            markerPosition: {
                lat: c.latLng.lat(),
                lng: c.latLng.lng(),
            }
        })
    }
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                onClick={this.onMapClicked}
                center={this.state.initialCenter}
            >
                {this.state.markerPosition ?
                    <Marker
                        id={1}
                        position={this.state.markerPosition}
                    /> :
                    null
                }
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GG_MAP_KEY,
})(MapWrapper)