import axios from 'axios';
const baseUrl = 'https://pixabay.com/api/';

export async function searchImages(value, page = 1, limitPage) {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        key: '44959261-ea439a2adbf8f7e5770dfe1a3',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        q: value,
        page,
        per_page: 15,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Fetch error: ', error);
  }
}
