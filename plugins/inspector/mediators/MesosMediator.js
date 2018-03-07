// import { ApolloProvider, graphql } from "react-apollo";
// import { ApolloClient } from "apollo-client";
// import { HttpLink } from "apollo-link-http";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import gql from "graphql-tag";

import gql from "graphql-tag";
import EntryList from "#PLUGINS/inspector/components/EntryList";
import { graphql } from "react-apollo/index";

const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

export default graphql(FEED_QUERY, { name: "entries" })(EntryList);
