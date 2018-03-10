import React from "react";
// import { graphql } from "graphql";

import EntryList from "#PLUGINS/inspector/components/EntryList";
import { schema } from "../schema/clockSchema";
import streamClock from "../clients/ClockStream";

const CLOCK_QUERY = `
  subscription {
    clock
  }
`;

const graphqlRx = (schema, query, variables, ctx) => {
  console.log(ctx);

  return streamClock.map(data => {
    return {
      id: data,
      clock: data
    };
  });
};

export default class ClockMediator extends React.Component {
  constructor() {
    super(...arguments);

    this.state = { data: [] };
  }

  componentWillMount() {
    this.observer = graphqlRx(schema, CLOCK_QUERY, null, {
      streamClock
    }).subscribe(
      data => {
        const currentState = this.state.data;
        this.setState({ data: [].concat(currentState, data) });
      },
      err => {
        console.error(err);
      },
      () => {
        console.log("done");
      }
    );
  }

  componentWillUnmount() {
    this.observer.unsubscribe();
  }

  render() {
    return (
      <EntryList
        entries={{ data: this.state.data }}
        state={{ error: false, loading: false }}
      />
    );
  }
}
