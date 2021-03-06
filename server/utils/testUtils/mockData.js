import range from 'lodash/range';
import faker from 'faker';

export const addressesTable = range(1, 10).map((_, index) => ({
  id: index + 1,
  address1: faker.address.streetName(),
  address2: faker.address.streetAddress(),
  city: faker.address.city(),
  country: faker.address.country(),
  lat: faker.address.latitude(),
  long: faker.address.longitude()
}));

export const productsTable = range(1, 10).map((_, index) => ({
  id: index + 1,
  name: faker.commerce.productName(),
  category: faker.commerce.department(),
  amount: faker.commerce.price()
}));

export const purchasedProductsTable = range(1, 10).map((_, index) => ({
  id: index + 1,
  productId: index + 1,
  price: faker.commerce.price(),
  discount: faker.random.number(20),
  deliveryDate: faker.date.past(1)
}));

export const storesTable = range(1, 10).map((_, index) => ({
  id: index + 1,
  name: faker.company.companyName(),
  addressId: index + 1
}));

export const storeProductsTable = range(1, 10).map((_, index) => ({
  id: index + 1,
  productId: index + 1,
  storeId: index + 1
}));

export const suppliersTable = range(1, 10).map((_, index) => ({
  id: index + 1,
  name: faker.company.companyName(),
  addressId: index + 1
}));

export const supplierProductsTable = range(1, 10).map((_, index) => ({
  id: index + 1,
  productId: index + 1,
  supplierId: index + 1
}));
