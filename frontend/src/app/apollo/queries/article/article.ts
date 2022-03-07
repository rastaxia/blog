import gql from "graphql-tag";

const ARTICLE_QUERY = gql`
query Articles($id: ID!)
{
  article (id: $id)
  {
    data
    {
      id
      attributes
      {
        title
        content
        written
        image
        {
          data
          {
            attributes
            {
              url
              alternativeText
            }
          }
        }
      }
    }
  }
}
`;

export default ARTICLE_QUERY;