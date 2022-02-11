# multi-url-fetcher

Multi-url-fetcher exports a helper function `requestMultipleUrls()` which returns the data from a given array of URLS.

## Installation

This repo is not available via a package manager. This repo will need to be downloaded locally and manually added to your project. Once added to your project, you can import the function `requestMultipleUrls()` using require() or import() with the path to the `lib/index` file.

```js
const { requestMultipleUrls } = require('path/to/lib/index');
```
## Usage

```js
const { requestMultipleUrls } = require('path/to/lib/index');

const urls = [
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json'
]

requestMultipleUrls(urls).then(data => {
  console.log(data)
  ...
})
```

### Return value
requestMultipleUrls() will return a Promise (see [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)). If successful, this promise will resolve to return an array, each element in the array will be the data returned by the URL. The data in the output returned from the resolved promise, will be in the same order as the URLs given in the input array. I.e. the data at `output[0]` will be from the URL at `urls[0]`

### Errors thrown
If requestMultipleUrls() is unsuccessful, the promise will reject to throw an error. The function will be unsuccessful if the given input is not of type Array. The function will be unsuccessful if each element in the array is not of a valid URL format with the protocol 'http:' or 'https:'. The validity of each URL is determined using the `URL()` constructor see [this for more information](https://nodejs.org/api/url.html#the-whatwg-url-api).

Finally, the function will be unsuccessful if any URL does not return valid data, for instance returns a HTTP 404. Please note that the error message thrown by the rejected promise will reflect the first URL that was unsuccessful.

Errors should be handled with a `catch()` block.
```js

requestMultipleUrls(urls).then(data => {
  ...
}).catch(error => {
  console.error(error.message)
})
```

### Testing
This repo contains tests for the function requestMultipleUrls(). To run the tests locally please run the script `test`
```bash
yarn run test
```
This will create a coverage report using instanbul in the coverage directory. Coverage reports are produced with the formats .html and .json. The .html format coverage report can be opened in your default browser using the script `open-test-coverage`.
```bash
yarn run open-test-coverage
```
## Roadmap
- The tests currently rely on external URLs. This is bad practice, as the tests will fail if these URLs are not maintained. Therefore these tests are dependent on external factors. Tests using mocked API calls can be found in `./__mocks__`. Further work is needed to create more mocked tests, including error states.
- There is no validation of the format of the data returned by each API request. Validation could be done to confirm that the data returned is JSON.
- If the input is not an Array, the error message will be `Input must be an array`. Better error states could confirm which type was give, i.e. `Input must be an array, received {TYPE}`.
- If one element of the input array is not a valid URL, the error message will be `Not all items are valid URLs`. Better error states could confirm which elements in the array were not valid, and why.
- It would be good practice to add a Husky file to automatically lint commit messages and run tests and confirm test coverage.
- More test data can be added, particalary testing for x number for urls

## Licence
[MIT](https://choosealicense.com/licenses/mit/)