async function paginate(req, res, next) {
	try {
		let {limit = 5, page = 1, orderBy = "_id:1"} = req.query;

		let [paramOrder, order] = orderBy.split(":");

		limit = parseInt(limit);
		page = parseInt(page);
		order = parseInt(order);
      
		const result = await req.parameter.find()
			.skip((page-1) * limit)
			.limit(limit)
			.sort({ [paramOrder] : order})
			.exec();

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
}

export default paginate;