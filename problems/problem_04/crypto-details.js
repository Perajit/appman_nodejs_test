require('isomorphic-fetch');

const API_ROOT = 'https://coinbin.org';

const request = (url, requestOptions) => {
  return fetch(url, requestOptions)
    .then((res) => res.json());
}

const cryptoDetails = (symbols = []) => {
  let promises = symbols.map((symbol) => request(`${API_ROOT}/${symbol}`))

  return Promise.all(promises);
};

module.exports = { cryptoDetails };
