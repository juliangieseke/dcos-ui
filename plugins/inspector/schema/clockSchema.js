import { makeExecutableSchema } from "graphql-tools";
import Rx from "rxjs";

import clockStream from "../clients/ClockStream";
import { formatPost, formatStream } from "../clients/FormatStream";

// Side effect: Adds methods to Rx.Observable prototype.
require("rxjs-to-async-iterator");

const typeDefs = `
  type Clock {
    id: ID!
    seconds: Int
    minutes: Int
    hours: Int
    
    ts: Int 
  }
  
  type Format {
    name: String
    value: String
    updated: String
    sample: String
  }

  type Query {
    clock: Clock
    format: Format
  }
  
  type Mutation {
    setFormat(name: String, value: String): Format
  }

  # Root Subscription
  type Subscription {
    clock: Clock
  }
`;

const clock1 = {
  id: 1,
  seconds: 10,
  minutes: 20,
  hours: 2,
  ts: 123123123
};

const clock2 = {
  id: 1,
  seconds: 19,
  minutes: 20,
  hours: 2,
  ts: 123123123
};

const resolvers = {
  Subscription: {
    clock: Rx.Observable.from([clock1, clock2]).toAsyncIterator()
  },

  Query: {
    clock(root, args, ctx) {
      return Rx.Observable.from([clock1, clock2]).toPromise();
    },

    format(root, args, ctx) {
      return {
        name: "a",
        value: "b",
        updated: "c",
        sample: "d"
      };
    }
  },

  Mutation: {
    setFormat(root, args, ctx) {
      return formatStream;
    }
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const CLOCK_QUERY = `
  query{
    clock {
      seconds
    }
  }
`;

const CLOCK_SUBS = `
  subscription {
    clock {
      seconds
    }
  }
`;

import { graphql } from "graphql";
import { subscribe } from "graphql/subscription";
import streamClock from "../clients/ClockStream";

graphql(schema, CLOCK_QUERY, null, {}, {}).then(data => {
  console.log("query", data, new Date());
});

subscribe(schema, CLOCK_SUBS, null, {}, {});
export { typeDefs, schema, resolvers };
