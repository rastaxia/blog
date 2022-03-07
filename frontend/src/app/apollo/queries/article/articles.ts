import gql from 'graphql-tag';

const ARTICLES_QUERY = gql`
  query {
    articles {
      data {
        id
        attributes {
          title
          content
          written
          image {
            data {
              attributes {
                url
                alternativeText
              }
            }
          }
          category {
            data {
              attributes {
                category
              }
            }
          }
        }
      }
    }
  }
`;

export default ARTICLES_QUERY;
