const uploadRouter = require("express").Router();

uploadRouter.post('/', async (req, res) => {
	if(!req.files) {
		return res.status(400).json({message:'Не прикреплено фото'})
	}

	const file = req.files.file;
	if(!file) return res.json('Something wrong')
	const newFileName = encodeURI(Date.now()+'-'+file.name)
	file.mv(`${__dirname}../../db/images/${newFileName}`, err => {
		if (err) {
			console.log(err)
			return res.status(500).send(err)
		}
		console.log('file was uploaded');
		res.json({
			fileName: file.name,
			filePath: `/images/${newFileName}`
		})
	})
})

module.exports= uploadRouter