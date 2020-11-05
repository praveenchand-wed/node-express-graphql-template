import get from 'lodash/get';
// import { graphql, GraphQLSchema } from 'graphql';
// import { createFieldsWithType, expectSameTypeNameOrKind } from '@server/utils/testUtils';
// import { QueryRoot } from '../../queries';
// import { MutationRoot } from '../../mutations';
// import { timestamps } from '@gql/models/timestamps';
// import { supplierProductFields } from '@gql/models/supplierProducts';
// import { resetAndMockDB } from '../../../utils/testUtils/testUtils';
import { mockDBClient } from '../../../utils/testUtils/index';
// const supertest = require('supertest')
// const request = require('supertest')('http://localhost:9000')
// var express = require('express');
// var app = express();
// const request = supertest(app)
const request = require('supertest');
var app = require('../../../index');
mockDBClient();

// app.listen(9000)

// const client = mockDBClient().client;
// const schema = new GraphQLSchema({ query: QueryRoot, mutation: MutationRoot });

// let fields = [];

// fields = createFieldsWithType({ ...supplierProductFields, ...timestamps });

const query = `
{
  supplierProduct (id: 1) {
    id
    supplierId
    createdAt
  }
}
`;
describe('Supplier Product introspection tests', () => {
  it('should have the correct fields and types', async () => {
    // await resetAndMockDB();
    // const { result } = await client.query({
    //   query: query
    // });

    // const result = await graphql({ schema, source: query });
    // const supplierProductFieldTypes = get(result, 'data.__type.fields');
    // const hasCorrectFieldTypes = expectSameTypeNameOrKind(supplierProductFieldTypes, fields);
    // expect(hasCorrectFieldTypes).toBeTruthy();
    // const res = await request.post('/graphql', { query: query })

    // expect(res.status).toBe(200)
    // const purchasedProductFieldTypes = get(res.body, 'data.__type.fields');
    // const productField = purchasedProductFieldTypes.find(field => field.name === 'product');
    // expect(productField.type.name).toBe('pass!')
    mockDBClient();
    const res = await request(app)
      .post('/graphql')
      .send({ query: query });

    expect(res.status).toBe(200);

    const purchasedProductFieldTypes = get(res.body, 'data.__type.fields');
    const productField = purchasedProductFieldTypes.find(field => field.name === 'product');
    expect(productField.type.name).toBe('pass!');
  });

  // it('should have a product field of type Product', async () => {
  //   const result = await graphqlSync({ schema, source: query });
  //   const purchasedProductFieldTypes = get(result, 'data.__type.fields');
  //   const productField = purchasedProductFieldTypes.find(field => field.name === 'product');
  //   expect(productField.type.name).toBe('Product');
  //   expect(productField.type.kind).toBe('OBJECT');
  // });

  // it('should have a supplier field of type Supplier', async () => {
  //   const result = await graphqlSync({ schema, source: query });
  //   const purchasedProductFieldTypes = get(result, 'data.__type.fields');
  //   const productField = purchasedProductFieldTypes.find(field => field.name === 'supplier');
  //   expect(productField.type.name).toBe('Supplier');
  //   expect(productField.type.kind).toBe('OBJECT');
  // });
});
