import React, { Component } from 'react';

class List extends Component {

    render() {
        return (
            <ul className="list">
                {this.props.markers.map((marker) => {
                    return <li>{marker.title}</li>
                })}
            </ul>
        );
    }
}

export default List