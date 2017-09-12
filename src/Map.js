import React, { Component } from 'react';
import * as loadjs from 'loadjs'

import './Map.css'

const MAP_STYLES = [
    {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
    },
    {
        featureType: 'transit',
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
    }
]

class Map extends Component {

    componentDidMount() {
        loadjs(`https://maps.googleapis.com/maps/api/js?key=${this.props.apiKey}`, {
            success: () => {
                this.google = window.google
                this.map = new this.google.maps.Map(this.refs.map, {
                    center: this.props.center,
                    zoom: this.props.zoom,
                    disableDefaultUI: true,
                    styles: MAP_STYLES
                });
                this.createMarkers()
            }
        })
    }

    componentDidUpdate() {
        this.createMarkers()
    }

    createMarkers() {
        if (this.map) {
            this.props.markers.forEach((marker) => {
                new this.google.maps.Marker({
                    position: marker.position,
                    map: this.map,
                    title: marker.title
                })
            })
        }
    }

    render() {
        return (
            <div ref="map" className="Map"/>
        );
    }
}

export default Map