import gql from 'graphql-tag';

const CATEGORY_ARTICLES_QUERY = gql`
  query Category($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          category
          articles {
            data {
              id
              attributes {
                title
                content
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
                    id
                    attributes {
                      category
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default CATEGORY_ARTICLES_QUERY;
