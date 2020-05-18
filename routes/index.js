let express = require('express')
let fs = require('fs')
let path = require('path')

let router = express.Router()

router.get('/', (req, res, next) => {
	res.render('index', { title: 'Upload Server for Firebase Development Projects.', message: 'Try uploading a file to the image route using the post method' })
})

router.post('/image', (req, res) => {
	try {
		let file = req.files.file
		let link = req.body.path
		let tempFilePath = file.tempFilePath
		let oldPath = path.resolve(tempFilePath)
		let newPath = path.resolve(`public/${link}`)
		let folders = newPath.split('\\')
		folders.pop()
		let allFolders = folders.join('\\')
		if (!fs.existsSync(allFolders)) {
			fs.mkdirSync(allFolders, { recursive: true })
		}
		fs.renameSync(oldPath, newPath)
		return res.status(200).json('Success')
	} catch (error) {
		return res.status(400).json(error.message)
	}
})

module.exports = router
