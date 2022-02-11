const axios = require('axios');
const { requestMultipleUrls } = require('../lib/index');

const mockData = {
  data: {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
  },
};

jest.mock('axios');
axios.get.mockResolvedValue(mockData);

test('confirm tests are running', () => {
  expect(1 + 2).toBe(3);
});

const validUrls = [
  'http://www.abc.com/',
  'https://www.123.com/',
  'http://www.abc.co.uk/',
  'https://www.123.abc/'
];

it('resolves to return array for valid URLs', async () => {
  expect.assertions(validUrls.length);

  return requestMultipleUrls(validUrls).then(
    (data) => {
      data.forEach(response => {
        expect(response).toBe(mockData.data);
      });
    },
  );
});
