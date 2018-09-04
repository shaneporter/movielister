export default class movieApi {
  constructor() {
    this.apiKey = '9123f3ddfdf6b3d34394290cd8d96cdc';
    this.posterUrlPrefix = 'https://image.tmdb.org/t/p/w300/';
    this.posterUrlSuffix = '.jpg';
  }
  handleError(response) {
    if(!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
  getNowPlaying() {
    return fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=1`)
      .then(this.handleError)
      .then(res => res.json()).then(res => res.results.map(
        result => ({
          ...result, 
          poster_url: `${this.posterUrlPrefix}${result.poster_path.substring(1)}`
        })
      ));
  }
  getGenres() {
    return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`)
      .then(this.handleError)
      .then(res => res.json()).then(res => res.genres);
  }
};