import React from "react";

import Icon from "#SRC/js/components/Icon";
import Page from "#SRC/js/components/Page";

import { ApolloProvider, graphql } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";

import EntryList from "./EntryList";

const httpLink = new HttpLink({ uri: "http://localhost:4000" });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

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

// 3
const FeedMediator = graphql(FEED_QUERY, { name: "entries" })(EntryList);

class InspectorPage extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Page title="Inspector">
          <h1>Actions:</h1>
          <input />
          <FeedMediator />
        </Page>
      </ApolloProvider>
    );
  }
}

InspectorPage.routeConfig = {
  label: "Inspector",
  icon: <Icon id="components-inverse" size="small" family="product" />,
  matches: /^\/inspector/
};

module.exports = InspectorPage;
