let express = require('express')
let fs = require('fs')
let path = require('path')

let router = express.Router()

router.get('/', (req, res, next) => {
	res.render('index', {
		title: 'Upload Server for Firebase Development Projects.',
		message: 'Try uploading a file to the /file route using the post method'
	}).end()
})

router.post('/file', async (req, res) => {
	const RESERVED_PATHS = ['stylesheets','javascripts','images']

	let { file: { tempFilePath } } = req.files
	let { path: link } = req.body

	let oldPath = path.resolve(tempFilePath)
	let newPath = path.resolve(`public/${link.toLowerCase()}`)


	try {
		if(RESERVED_PATHS.some(path => link.toLowerCase().startsWith(path))) throw new Error(
			'Path is reserved. Make sure your path doesn\'t begin with any of these: ' + RESERVED_PATHS.join(' || ')
		)

		let folder = path.dirname(newPath)
		if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true })

		if(fs.existsSync(oldPath)) fs.renameSync(oldPath, newPath)
		return res.status(200).json('Success').end()
	} catch (error) {
		if(fs.existsSync(oldPath)) fs.unlinkSync(oldPath)

		return res.status(400).json(error.message).end()
	}
})

router.delete('/file', (req, res) => {
	let { path: link } = req.body

	if(!link) return res.status(400).json('Invalid link').end()

	let newPath = path.resolve(`public/${link.toLowerCase()}`)

	try{
		if(fs.existsSync(newPath)) fs.unlinkSync(newPath)

		return res.status(200).json('Success').end()
	}catch(error){
		return res.status(400).json(error.message).end()
	}
})

module.exports = router
