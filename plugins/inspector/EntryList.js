import React, { Component } from "react";
import Entry from "./Entry";

class LinkList extends Component {
  render() {
    const entries = this.props.entries;
    if (entries && this.props.entries.loading) {
      return <div>Loading</div>;
    }

    if (entries && entries.error) {
      return <div>Error</div>;
    }

    const resultsToRender = entries.feed.links;

    return (
      <div>
        <h3>Results: {Object.keys(resultsToRender).length}</h3>
        {resultsToRender.map(entry => <Entry key={entry.id} entry={entry} />)}
      </div>
    );
  }
}

export default LinkList;
