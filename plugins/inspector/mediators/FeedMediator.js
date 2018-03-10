// import gql from "graphql-tag";
// import EntryList from "#PLUGINS/inspector/components/EntryList";
// import { graphql } from "react-apollo";
//
// const FEED_QUERY = gql`
//   query FeedQuery {
//     feed {
//       links {
//         id
//         createdAt
//         url
//         description
//       }
//     }
//   }
// `;
//
// export default graphql(FEED_QUERY, {
//   props: ({ ownProps, data }) => ({
//     ownProps: ownProps,
//     state: data,
//     entries: () => data.feed.links,
//   })
// })(EntryList);
