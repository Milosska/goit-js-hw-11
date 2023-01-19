import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32924526-f9591cfa3face167d801f2034';
const options = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
};

function makeAddressParams(query, page, options) {
  let optionsString = '';

  Object.entries(options).forEach(elem => {
    optionsString += `&${elem[0]}=${elem[1]}`;
  });

  const params = `key=${KEY}&q=${query}${optionsString}&page=${page}`;
  return params;
}

async function fetchPhotos(query, page) {
  const params = makeAddressParams(query, page, options);
  const response = await axios.get(`${BASE_URL}?${params}`);
  return response.data;
}

export { fetchPhotos };
