import { makeExecutableSchema } from "graphql-tools";

const typeDefs = `
  # Root Query
  type Query {
    hours: Int
    minutes: Int
    seconds: Int
    
    formatted: String
  }

  # Root Subscription
  type Subscription {
    clock: String
  }
`;

const resolvers = {
  Subscription: {
    clock(root, args, ctx) {
      return ctx.streamClock;
    }
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { typeDefs, schema, resolvers };
