import fetchJsonp from 'fetch-jsonp';

const API_KEY = 'fed69657ba4cc6e1078d2a6a95f51c8c';

const service = {

    getPopular: () => {
        return fetchJsonp(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`, {
            jsonpCallback: 'JSONP_CALLBACK'
        });
    },

    getTopRatedMovies: () => {
        return fetchJsonp(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`, {
            jsonpCallback: 'JSONP_CALLBACK'
        });
    },

    getMovie(id) {
        return fetchJsonp(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`, {
            jsonpCallback: 'JSONP_CALLBACK'
        });
    },


    getMovieReviews(id) {
        return fetchJsonp(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`, {
            jsonpCallback: 'JSONP_CALLBACK'
        });
    },
    getMovieVideos(id) {
        return fetchJsonp(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`, {
            jsonpCallback: 'JSONP_CALLBACK'
        });
    },

    getSimilarMovies(id) {
        return fetchJsonp(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`, {
            jsonpCallback: 'JSONP_CALLBACK'
        });
    },

    getMovieCredits(id) {
        return fetchJsonp(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`, {
            jsonpCallback: 'JSONP_CALLBACK'
        });
    }
};

export default service;
