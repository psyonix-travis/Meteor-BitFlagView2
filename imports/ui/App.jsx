import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import bigInt from "../api/BigInteger.js";
import hexToDec from "../api/HexToDec.js";

import Category from './Category.jsx';

// App component - represents the whole app
export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCategory: this.props.data.categories.length ? this.props.data.categories[0].label : "",
            input:bigInt.bigInt(0)
        };
    }

    handleInput(e) {
        e.preventDefault();
        let inStr = e.target.value;
        let newValue = (inStr.substring(0, 2) === '0x') ? hexToDec(inStr) : inStr;
        this.setState({input: bigInt.bigInt(newValue)});
    }

    updateCategory(e) {
        let category = this.props.data.categories.find((category) => {
            return category.label == e.target.value;
        });
        if ( category != null )
        {
            this.setState({selectedCategory: category.label});
        }
    }

    renderSelectedCategory() {
        let category = this.props.data.categories.find((category) => {
            return category.label == this.state.selectedCategory;
        });

        return (
            <Category
                category={category}
                input={this.state.input}
            />
        );
    };

  renderCategories() {
	return this.props.data.categories.map((category, i) => {
	  return (
		<option key={i}>{category.label}</option>
	  );
	});
  }

  render() {
	return (
	    <div>
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <text className="navbar-brand">Bit Flags</text>

                        <form className="navbar-form navbar-left">
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    list="categories"
                                    placeholder="Pick a flag type"
                                    onInput={this.updateCategory.bind(this)}
                                />
                                <datalist id="categories">
                                    {this.renderCategories()}
                                </datalist>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    ref="textInput"
                                    className="form-control"
                                    placeholder="Enter the flag value"
                                    onInput={this.handleInput.bind(this)}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
            <div className="jumbotron">
                <div className="container">
                    {this.renderSelectedCategory()}
                </div>
            </div>
        </div>
	);
  }
}

App.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    data: PropTypes.object.isRequired,
};
