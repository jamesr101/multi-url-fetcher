const axios = require('axios');

/**
 * Confirms if an input is a valid URL format and has a valid protocol
 *
 * @param  {string} url A string to be be tested
 * @returns {boolean}
 * @see {@link https://nodejs.org/api/url.html#the-whatwg-url-api}
 */
function isValidUrl(url) {
  let testUrl;

  try {
    testUrl = new URL(url);
  } catch (e) {
    return false;
  }

  return testUrl.protocol === 'http:' || testUrl.protocol === 'https:';
}

const fetchURL = (url) => axios.get(url);

/**
 * Returns the content from an array of URLs
 *
 * @param  {Array<string>} urls An array of URLs
 * @returns {Promise<Array<any>>} A Promise that returns an array of data, returned by each URL
 * when fulfilled. The Promise will reject if there is an error
 */
async function requestMultipleUrls(urls) {
  if (!Array.isArray(urls)) {
    throw new TypeError('Input must be an array');
  }

  if (!urls.every((url) => isValidUrl(url))) {
    throw new TypeError('Not all items are valid URLs');
  }

  const promiseArray = urls.map(fetchURL);

  try {
    return await Promise.all(promiseArray).then(
      (responses) => responses.map((response) => response.data),
    );
  } catch (e) {
    throw new Error(`Could not fetch all URLs: ${e.message}`);
  }
}

module.exports = { requestMultipleUrls };
