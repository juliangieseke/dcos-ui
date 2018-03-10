import React, { Component } from "react";

class Entry extends Component {
  render() {
    return (
      <div>
        <div>
          {Object.keys(this.props.entry).map(key => [
            <span key={key}>
              [<b>{key.toUpperCase()}</b>: {this.props.entry[key]}]{" "}
            </span>
          ])}
        </div>
      </div>
    );
  }
}

export default Entry;
