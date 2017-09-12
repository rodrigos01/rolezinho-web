import React, { Component } from 'react';
import Map from './Map';
import List from './List'

import * as http from 'http';

const MAP_API_KEY = "AIzaSyCgKYZP1xsrZGRwKJKk9_M5r8BTDcTQjb4"

const EIFFEL_TOWER_POSITION = {
    lat: 48.858608,
    lng: 2.294471
};

const DEFAULT_ZOOM = 16

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            markers: []
        }
    }

    componentDidMount() {
        var options = {
            host: 'apiv2.combah.com',
            path: '/places/suggestions?lat=48.858608&lon=2.294471&radius=15000&use_distance=1',
            headers: {
                'Accept-Language': 'en-US'
            }
        }
        http.get(options, (response) => {
            if (response.statusCode === 200) {
                response.setEncoding('utf8');
                response.on('data', (body) => {
                    let data = JSON.parse(body)
                    let markers = data.places.map((place) => {
                        return {
                            title: place.name,
                            position: {
                                lat: place.latitude,
                                lng: place.longitude
                            }
                        }
                    })
                    this.setState({markers: markers})
                    console.log(markers)
                })
             }
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        });
    }

    render() {
        return (
            <div className="App">
                <div className="map-container">
                    <Map apiKey={MAP_API_KEY}
                        center={EIFFEL_TOWER_POSITION} 
                        zoom={DEFAULT_ZOOM}
                        markers={this.state.markers} />
                </div>
                <List markers={this.state.markers} />
            </div>
        );
    }
}

export default App