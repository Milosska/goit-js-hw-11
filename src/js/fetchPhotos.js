import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const options = {
  key: '32924526-f9591cfa3face167d801f2034',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

function makeAddressParams(
  query,
  { key, image_type, orientation, safesearch }
) {
  const params = `key=${key}&q=${query}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}`;
  return params;
}

async function fetchPhotos(query) {
  const params = makeAddressParams(query, options);
  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    const photos = response.data.hits;
    return photos;
  } catch (error) {
    console.error(error);
  }
}

export { fetchPhotos };
