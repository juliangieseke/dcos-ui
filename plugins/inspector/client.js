// import { ApolloClient } from "apollo-client";
// import { ApolloLink, split } from "apollo-link";
// import { getMainDefinition } from "apollo-utilities";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { HttpLink } from "apollo-link-http";
//
// import localLink from "./links/LocalLink";
//
// const httpLink = new HttpLink({ uri: "http://localhost:4000" });
//
// const flatten = xs => [].concat.apply([], xs);
//
// const link = split(
//   ({ query }) => {
//     const directives = flatten(
//       query.definitions.map(defs =>
//         flatten(
//           defs.selectionSet.selections.map(selection => selection.directives)
//         )
//       )
//     );
//     console.log(query, directives);
//
//     return directives.some(d => d.name.value === "local");
//   },
//   ApolloLink.from([localLink, httpLink]),
//   httpLink,
// );
//
// export default new ApolloClient({
//   link: link,
//   cache: new InMemoryCache()
// });
