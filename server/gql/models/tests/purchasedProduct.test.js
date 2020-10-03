import get from 'lodash/get';
import { graphqlSync, GraphQLSchema } from 'graphql';
import { createFieldsWithType, expectSameTypeNameOrKind } from 'server/utils/testUtils';
import { QueryRoot } from '../../queries';
import { MutationRoot } from '../../mutations';
import { timestamps } from 'gql/models/timestamps';
import { purchasedProductFields } from 'gql/models/purchasedProducts';

const schema = new GraphQLSchema({ query: QueryRoot, mutation: MutationRoot });

let fields = [];

fields = createFieldsWithType({ ...purchasedProductFields, ...timestamps });

const query = `
  {
    __type(name: "PurchasedProduct") {
        name
        kind
        fields {
          name
          type {
            name
            kind
          }
        }
      }    
  }
`;
describe('Purchased Product introspection tests', () => {
  it('should have the correct fields and types', async () => {
    const result = await graphqlSync({ schema, source: query });
    const purchasedProductFieldTypes = get(result, 'data.__type.fields');
    const hasCorrectFieldTypes = expectSameTypeNameOrKind(purchasedProductFieldTypes, fields);
    expect(hasCorrectFieldTypes).toBeTruthy();
  });
});
