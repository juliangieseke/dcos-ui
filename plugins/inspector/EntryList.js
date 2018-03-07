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

    // 3
    const resultsToRender = entries.feed.links;

    return (
      <table>
        {resultsToRender.map(entry => <Entry key={entry.id} entry={entry} />)}
      </table>
    );
  }
}

export default LinkList;
