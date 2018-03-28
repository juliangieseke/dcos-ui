import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/interval";
import "rxjs/add/observable/of";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/map";
import "rxjs/add/operator/take";

import { marbles } from "rxjs-marbles/jest";

import { makeExecutableSchema } from "graphql-tools";
import gql from "graphql-tag";

import { graphqlObservable } from "../graphqlObservable";

const typeDefs = `
  type Shuttle {
    name: String!
  }
  
  type Query {
    launched(name: String): [Shuttle!]!
  }
`;

const resolvers = {
  Query: {
    launched: (parent, args, ctx) => {
      const { name } = args;

      if (name !== undefined) {
        return ctx.query
          .combineLatest(name, (res, name) => [res, name])
          .map(els => els[0].filter(el => el.name === els[1]));
      } else {
        return ctx.query;
      }
    }
  }
  // Mutation: {}
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// jest helper who binds the marbles for you
const itMarbles = (title, test) => {
  return it(
    title,
    marbles(m => {
      m.bind();
      test(m);
    })
  );
};

describe("graphqlObservable", function() {
  describe("Query", function() {
    itMarbles("solves listing all fields", function(m) {
      const query = gql`
        query {
          launched {
            name
          }
        }
      `;

      const expectedData = [{ name: "discovery" }];
      const dataSource = Observable.of(expectedData);
      const expected = m.cold("(a|)", { a: { launched: expectedData } });

      const result = graphqlObservable(query, schema, { query: dataSource });

      m.expect(result.take(1)).toBeObservable(expected);
    });

    itMarbles("filters by arguments", function(m) {
      const query = gql`
        query {
          launched(name: $nameFilter) {
            name
            firstFlight
          }
        }
      `;

      const expectedData = [{ name: "discovery" }, { name: "challenger" }];
      const dataSource = Observable.of(expectedData);
      const expected = m.cold("(a|)", { a: { launched: [expectedData[0]] } });

      const nameFilter = Observable.of("discovery");
      const result = graphqlObservable(query, schema, {
        query: dataSource,
        nameFilter
      });

      m.expect(result.take(1)).toBeObservable(expected);
    });

    itMarbles("filters out fields", function(m) {
      const query = gql`
        query {
          launched {
            name
          }
        }
      `;

      const expectedData = [{ name: "discovery", firstFlight: 1984 }];
      const dataSource = Observable.of(expectedData);
      const expected = m.cold("(a|)", {
        a: { launched: [{ name: "discovery" }] }
      });

      const result = graphqlObservable(query, schema, {
        query: dataSource
      });

      m.expect(result.take(1)).toBeObservable(expected);
    });

    itMarbles("filters out fields", function(m) {
      const query = gql`
        query {
          launched {
            name
          }
        }
      `;

      const expectedData = [{ name: "discovery", firstFlight: 1984 }];
      const dataSource = Observable.of(expectedData);
      const expected = m.cold("(a|)", {
        a: { launched: [{ name: "discovery" }] }
      });

      const result = graphqlObservable(query, schema, {
        query: dataSource
      });

      m.expect(result.take(1)).toBeObservable(expected);
    });

    itMarbles("resolve with query alias", function(m) {
      const query = gql`
        query nasa {
          launched {
            name
          }
        }
      `;

      const expectedData = [{ name: "discovery", firstFlight: 1984 }];
      const dataSource = Observable.of(expectedData);
      const expected = m.cold("(a|)", {
        a: { nasa: [{ name: "discovery" }] }
      });

      const result = graphqlObservable(query, schema, {
        query: dataSource
      });

      m.expect(result.take(1)).toBeObservable(expected);
    });

    itMarbles("resolve multiple queries with alias", function(m) {
      const query = gql`
        query nasa {
          launched {
            name
          }
        }

        query roscosmos {
          launched {
            name
          }
        }
      `;

      const expectedData = [{ name: "discovery", firstFlight: 1984 }];
      const dataSource = Observable.of(expectedData);
      const expected = m.cold("(a|)", {
        a: { nasa: [{ name: "discovery" }], roscosmos: [{ name: "discovery" }] }
      });

      const result = graphqlObservable(query, schema, {
        query: dataSource
      });

      m.expect(result.take(1)).toBeObservable(expected);
    });
  });
});
