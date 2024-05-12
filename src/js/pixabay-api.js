const apiKey = '43839854-7e39202c3c35776610ceb4193';

export async function fetchImages(searchQuery) {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    const data = await response.json();
    return data.hits;
  } catch (error) {
    console.error(error);
    return [];
  }
}
