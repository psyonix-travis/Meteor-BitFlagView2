import React, { Component, PropTypes } from 'react';

import {bigInt} from "../api/BigInteger.js";
import {hexToDec} from "../api/HexToDec.js";

import Flag from './Flag.jsx';

// Category component - represents a set of flags
export default class Category extends Component {
    filterFlags(flags) {
        return this.props.input.compare(bigInt(0)) == 0
        ? flags
        : flags.filter((flag) => {
            let value = (flag.value.substring(0, 2) === '0x') ? hexToDec(flag.value) : flag.value;
            return bigInt(value).and(this.props.input) > 0;
        });
    }

    renderFlags(flags) {
        return this.filterFlags(flags).map((flag, i) => {
            return (<Flag key={i} flag={flag}/>);
        });
    }

    render() {

        return (
            <table id="category">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderFlags(this.props.category.flags)}
                </tbody>
            </table>
        );
    }
}

Category.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    category: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
};
