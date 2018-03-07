import React from "react";

import Icon from "#SRC/js/components/Icon";
import Page from "#SRC/js/components/Page";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = new HttpLink({ uri: "http://localhost:4000" });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

class InspectorPage extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Page title="Inspector">Oi</Page>
      </ApolloProvider>
    );
  }
}

InspectorPage.routeConfig = {
  label: "Inspector",
  icon: <Icon id="dashboard-inverse" size="small" family="product" />,
  matches: /^\/inspector/
};

module.exports = InspectorPage;
