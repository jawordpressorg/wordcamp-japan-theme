const Chromy = require('chromy')
const fs = require('fs')
/**
 * @type {Array}
 */
const urls = require('./urls.json')

async function main () {

	let chromy = new Chromy()

	for (let url of urls) {
		try {

			await chromy.goto('http://localhost' + url)
			const png = await chromy.screenshotDocument()
			let filename = ''
			if (url === '/') {
				filename = 'front-page'
			}
			else {
				filename = url.replace('/', '').replace(/\//g, '-')
			}
			fs.writeFileSync('./artifacts/' + filename + '.png', png)
		} catch (e) {
			console.log(e)
			chromy.close()
		}
	}

	await chromy.close()

}

main()
