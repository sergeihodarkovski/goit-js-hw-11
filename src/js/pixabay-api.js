const API_KEY = '44648929-0a3ca09e28beb33e491a22410';

export function fetchImages(searchTerm) {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    searchTerm
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      return data.hits.map(image => ({
        webformatURL: image.webformatURL,
        largeImageURL: image.largeImageURL,
        tags: image.tags,
        likes: image.likes,
        views: image.views,
        comments: image.comments,
        downloads: image.downloads,
      }));
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      throw error;
    });
}
