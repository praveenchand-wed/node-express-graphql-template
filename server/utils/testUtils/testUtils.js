import { mockDBClient } from '../../utils/testUtils/index';

export async function mockDB(mockCallback = () => {}) {
  jest.doMock('@database/models', () => {
    const sequelizeData = mockDBClient().models;
    if (mockCallback) {
      mockCallback(sequelizeData);
    }
    return sequelizeData;
  });
}

export const resetAndMockDB = async (mockDBCallback = () => {}) => {
  mockDB(mockDBCallback);

  // const server = express();
  // server.listen(9000)
  // return server;
};
