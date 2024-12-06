const axios = require('axios');
const prisma = require('../prisma');    

const OMDB_API_KEY = process.env.OMDB_API_KEY;  
const OMDB_API_URL = process.env.OMDB_API_URL;      

async function fetchMovieFromAPI(title) {
    try {
        const response = await axios.get(OMDB_API_URL, {
            params: {
                apikey: OMDB_API_KEY,
                t: title
            }
        });

        if(response.data.response === 'False') {
            throw new Error(response.data.Error);
        }

        return response.data;
    } catch (error) {
        console.error('API ERROR: ', error);
        throw new Error('Error fetching data from OMDB API');
    }
}

async function storeMovieInDatabase(movieData) {
    const {
        Title: title,
        Year: year,
        Genre: genre,
        Director: director,
        Writer: writer,
        Actors: actors,
        Plot: plot,
        Language: language,
        Country: country,
        Awards: awards,
        Poster: poster_url,
        imdbRating,
    } = movieData;

    const imdb_rating  =  imdbRating ? parseFloat(imdbRating) : null;

    return await prisma.movies.create({
        data: {
            title,
            year,
            genre,
            director,
            writer,
            actors,
            plot,
            language,
            country,
            awards,
            poster_url,
            imdb_rating,
        },
    });
}

async function getMovieByTitle(title) {
    return await prisma.movies.findUnique({
        where: {
            title,
        },
    });

    if (!movie) {
        const movieData = await fetchMovieFromAPI(title);
        movie = await storeMovieInDatabase(movieData);
    }

    return movie;
}

module.exports = {getMovieByTitle};