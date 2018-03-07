import { ApolloClient } from "apollo-client/index";
import { InMemoryCache } from "apollo-cache-inmemory/lib/index";
import { HttpLink } from "apollo-link-http/lib/index";

const httpLink = new HttpLink({ uri: "http://localhost:4000" });

export default new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});
