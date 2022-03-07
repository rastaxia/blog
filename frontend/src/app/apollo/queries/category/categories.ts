import gql from "graphql-tag";

const CATEGORIES_QUERY = gql`
query
{
  categories
  {
    data
    {
      id
      attributes
      {
        category
      }
    }
  }
}
`;

export default CATEGORIES_QUERY;