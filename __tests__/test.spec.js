const { requestMultipleUrls } = require('../lib/index');

test('confirm tests are running', () => {
  expect(1 + 2).toBe(3);
});

const invalidDataTypes = [
  true,
  false,
  {},
  'string',
  NaN,
  'Array',
  null,
  undefined,
];

const validUrls = ['http://www.google.com/', 'https://www.google.com/'];
const invalidUrls = [
  '://www.google.com/',
  'abc://www.google.com/',
  'google.com',
  'www.google.com',
  'www.google.com',
  'google',
  'string',
];

it('rejects invalid input types', () => {
  expect.assertions(invalidDataTypes.length);

  invalidDataTypes.forEach((type) => requestMultipleUrls(type).catch((e) => expect(e.message).toEqual('Input must be an array')));
});

it('rejects arrays of invalid types', () => {
  expect.assertions(invalidDataTypes.length * 2);

  invalidDataTypes.forEach((type) => requestMultipleUrls([type]).catch((e) => expect(e.message).toEqual('Not all items are valid URLs')));

  // invalid type in array with other valid URLs
  invalidDataTypes.forEach((type) => requestMultipleUrls([...validUrls, type]).catch((e) => expect(e.message).toEqual('Not all items are valid URLs')));
});

it('rejects arrays of invalid URL constructions', () => {
  expect.assertions(invalidUrls.length * 2);

  invalidUrls.forEach((url) => requestMultipleUrls([url]).catch((e) => expect(e.message).toEqual('Not all items are valid URLs')));

  // invalid URL in array with other valid URLs
  invalidUrls.forEach((url) => requestMultipleUrls([...validUrls, url]).catch((e) => expect(e.message).toEqual('Not all items are valid URLs')));
});

const testUrls = [
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json',
];

it('resolves to return array for valid URLs', async () => {
  // NOTE: This test is based on external URLs and will fail is they are not maintained
  expect.assertions(3);

  return requestMultipleUrls(testUrls).then(
    (data) => {
      expect(data).toBeTruthy();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(testUrls.length);
    },
  );
});

// http://httpstat.us provides url endpoints the return given responses
const httpStatus = {
  400: 'http://httpstat.us/400',
  401: 'http://httpstat.us/401',
  402: 'http://httpstat.us/402',
  403: 'http://httpstat.us/403',
  404: 'http://httpstat.us/404',
  405: 'http://httpstat.us/405',
  406: 'http://httpstat.us/406',
  407: 'http://httpstat.us/407',
  408: 'http://httpstat.us/408',
  409: 'http://httpstat.us/409',
  410: 'http://httpstat.us/410',
  411: 'http://httpstat.us/411',
  412: 'http://httpstat.us/412',
  413: 'http://httpstat.us/413',
  414: 'http://httpstat.us/414',
  415: 'http://httpstat.us/415',
  416: 'http://httpstat.us/416',
  417: 'http://httpstat.us/417',
  418: 'http://httpstat.us/418',
  500: 'http://httpstat.us/500',
  501: 'http://httpstat.us/501',
  502: 'http://httpstat.us/502',
  503: 'http://httpstat.us/503',
  504: 'http://httpstat.us/504',
  505: 'http://httpstat.us/505',
};

it('rejects URLs that error', async () => {
  // NOTE: This test is based on external URLs and will fail is they are not maintained
  expect.assertions(24);
  await Promise.all(Object.entries(httpStatus).map((entry) => requestMultipleUrls([entry[1]]).catch((e) => expect(e.message).toMatch('Could not fetch all URLs:'))));
});

it('rejects URLs that error with correct error code', async () => {
  // NOTE: This test is based on external URLs and will fail is they are not maintained
  expect.assertions(24);
  await Promise.all(Object.entries(httpStatus).map((entry) => requestMultipleUrls([entry[1]]).catch((e) => expect(e.message).toMatch(`${entry[0]}`))));
});
