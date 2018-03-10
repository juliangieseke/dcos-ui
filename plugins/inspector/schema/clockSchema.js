import { makeExecutableSchema } from "graphql-tools";
import clockStream from "../clients/ClockStream";
import { formatPost, formatStream } from "../clients/FormatStream";

const typeDefs = `
  type Clock {
    id: ID!
    seconds: Int
    minutes: Int
    hours: Int
    
    ts: Int 
  }
  
   type Format {
    name: Int
    value: Int
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

const resolvers = {
  Subscription: {
    clock(root, args, ctx) {
      return clockStream;
    }
  },

  Query: {
    clock(root, args, ctx) {
      return clockStream;
    },

    format(root, args, ctx) {
      return formatStream;
    }
  },

  Mutation: {
    setFormat(root, args, ctx) {
      return formatStream;
    }
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { typeDefs, schema, resolvers };
