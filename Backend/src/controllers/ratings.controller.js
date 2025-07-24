
import RatingsDAO from "../dao/ratingsDAO.js";

export default class RatingsController {
	static async apiGetAllRatings(req, res, next) {
		const { ratingsList, totalNumRatings } = await RatingsDAO.getAllRatings()

		let response = {
			ratings: ratingsList,
			total_results: totalNumRatings,
		}

		res.json(response)
	}
}