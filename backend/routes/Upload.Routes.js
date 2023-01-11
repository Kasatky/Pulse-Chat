const uploadRouter = require("express").Router();
const {ProfilePic} = require('../db/models')

uploadRouter.post('/', async (req, res) => {
	const { user } = res.locals;

	if(!req.files) {
		return res.status(400).json({message:'Не прикреплено фото'})
	}
	
	const file = req.files.file;
	if(!file) return res.json('Something wrong')

	const newFileName = encodeURI(Date.now()+'-'+file.name)
	const fileDirPath = `${__dirname}../../public/img/${newFileName}`
	const avatar = await ProfilePic.findOne({where: {id:user.id}})
	if (avatar) {
		avatar.fileName = newFileName
		avatar.direction = fileDirPath
		avatar.save()
	} else await ProfilePic.create({
		id: user.id,
		fileName: newFileName,
		direction: fileDirPath,
	});
	file.mv(fileDirPath, err => {
		if (err) {
			console.log(err)
			return res.status(500).send(err)
		}
		console.log('file was uploaded');

		res.json(newFileName)
	})
})

module.exports= uploadRouter