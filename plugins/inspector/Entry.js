import React, { Component } from "react";

class Entry extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.entry.id}</h2>
        <ul>
          {Object.keys(this.props.entry).map(key => (
            <li key={key}>
              <b>{key}</b>: {this.props.entry[key]}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  act() {}
}

export default Entry;
