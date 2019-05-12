/** all the movies from database to our repertoire (repertuar)*/

function movies(req, res, next){
    /** get all the movies from mongodb */
    async function getMovies(){
        const Movies = await Movie.find();  
        console.log(Movies);
    }
    getMovies();

    async function createMovie() {
        const movie = new Movie({
            id: 1,
            hours: {
                hour: [
                    "12:30",
                    "14:30",
                    "16:30"
                ],
                seats: [
                    110010010111,
                    000000000000,
                    000000000000
                ]
            }
        })
        const result = await movie.save();
        console.log(result);
    }
    createMovie();
}

module.exports = movies;