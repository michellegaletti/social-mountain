import React, { Component } from "react";

import "./Search.css";

import SearchIcon from "react-icons/lib/md/search";
import ClearIcon from "react-icons/lib/md/clear";

////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT ////////////

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      userInput: "",
    };
  }

  handleChange = (event) => {
    this.setState({ userInput: event });
  };

  handleClick = () => {
    this.props.filterPosts(this.state.userInput);
  };

  handleClear() {
    this.setState({ userInput: "" });
    this.props.reset();
  }

  render() {
    return (
      <section className="Search__parent">
        <div className="Search__content">
          <input
            value={this.state.userInput}
            placeholder="Search Your Feed"
            type="text"
            onChange={(e) => this.handleChange(e.target.value)}
          />

          <SearchIcon id="Search__icon" onClick={() => this.handleClick()} />
          {this.state.userInput.length > 0 && (
            <ClearIcon id="Clear__icon" onClick={() => this.handleClear()} />
          )}
        </div>
      </section>
    );
  }
}
