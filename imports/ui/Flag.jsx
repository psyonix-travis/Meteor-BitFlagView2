import React, { Component, PropTypes } from 'react';

// Flag component - represents a single bit flag
export default class Flag extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.flag.label}</td>
                <td>{this.props.flag.value}</td>
                <td>{this.props.flag.comment}</td>
            </tr>
        );
    }
}

Flag.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    flag: PropTypes.object.isRequired,
};
