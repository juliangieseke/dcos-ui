import React, { Component } from "react";
import Entry from "./Entry";

class EntryList extends Component {
  render() {
    console.log(this.props);
    const { state, entries } = this.props;
    if (state && state.loading) {
      return <h1>🎱</h1>;
    }

    if (state && state.error) {
      return <h1>💢 {state.error.message}</h1>;
    }

    const entriesData = entries.data;

    return (
      <div>
        <h3>Results: {Object.keys(entriesData).length}</h3>
        {entriesData.map(entry => <Entry key={entry.id} entry={entry} />)}
      </div>
    );
  }
}

export default EntryList;
