import axios from 'axios';

const apiKey = '50343386-d607faa181041591c9bde8ad6';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
  const searchParams = new URLSearchParams({
    key: apiKey,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  return axios
    .get(`?${searchParams}`)
    .then(response => response.data)
    .catch(error => {
      throw err;
    });
}
