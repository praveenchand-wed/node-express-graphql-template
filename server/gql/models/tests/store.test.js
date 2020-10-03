import get from 'lodash/get';
import { graphqlSync, GraphQLSchema } from 'graphql';
import { createFieldsWithType, expectSameTypeNameOrKind } from 'server/utils/testUtils';
import { QueryRoot } from '../../queries';
import { MutationRoot } from '../../mutations';
import { timestamps } from 'gql/models/timestamps';
import { storeFields } from 'gql/models/stores';

const schema = new GraphQLSchema({ query: QueryRoot, mutation: MutationRoot });

let fields = [];

fields = createFieldsWithType({ ...storeFields, ...timestamps });

const query = `
  {
    __type(name: "Store") {
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
describe('Store introspection tests', () => {
  it('should have the correct fields and types', async () => {
    const result = await graphqlSync({ schema, source: query });
    const storeFieldTypes = get(result, 'data.__type.fields');
    const hasCorrectFieldTypes = expectSameTypeNameOrKind(storeFieldTypes, fields);
    expect(hasCorrectFieldTypes).toBeTruthy();
  });
});
