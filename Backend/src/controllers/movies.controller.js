
import MoviesDAO from "../dao/moviesDAO.js"

export default class MoviesController {
  static async apiGetMovies(req, res, next) {
    /**Passing in query strings to this api*/
    /**If query passed in, convert query to int, else default */
    const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage, 10) : 30
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    /**If query provides filters set filters */
    let filters = {}

    if (req.query.name) {
      filters.name = req.query.name
    } else if (req.query.genre) {
      filters.genre = req.query.genre
    } else if (req.query.release_year) {
      filters.release_year = Number(req.query.release_year)
    }

    const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({
      filters,
      page,
      moviesPerPage,
    })

    let response = {
      movies: moviesList,
      page: page,
      filters: filters,
      entries_per_page: moviesPerPage,
      total_results: totalNumMovies,
    }
    
    res.json(response)
  }
  
  static async apiGetMovieById(req, res, next) {
    try {
      let id = req.params.id || {}
      let movie = await MoviesDAO.getMovieByID(id)
      if (!movie) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(movie)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetMovieGenres(req, res, next) {
    try {
      let genres = await MoviesDAO.getGenres()
      res.json(genres)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}