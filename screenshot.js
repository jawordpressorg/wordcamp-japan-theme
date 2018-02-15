const Chromy = require('chromy')
const fs = require('fs')
/**
 * @type {Array}
 */
const urls = require('./urls.json')

const devices = [
	{
		name: 'large',
		width: 1440,
		height: 900,
		deviceScaleFactor: 1.0,
		pageScaleFactor: 1.0,
		mobile: false,
		userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
	},
	{
		name: 'medium',
		width: 1536,
		height: 2048,
		deviceScaleFactor: 2.0,
		pageScaleFactor: 1.0,
		mobile: true,
		userAgent: 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
	},
	{
		name: 'small',
		width: 640,
		height: 880,
		deviceScaleFactor: 2.0,
		pageScaleFactor: 1.0,
		mobile: true,
		userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12F70 baiduboxapp/6.9.0.0'
	}
];

Chromy.addCustomDevice(devices)


async function main () {

	let chromy = new Chromy()

	for (let device of devices ) {
		for (let url of urls) {
			try {

				await chromy.emulate(device.name)
				await chromy.goto('http://localhost' + url)
				const png = await chromy.screenshotDocument()
				let filename = ''
				if (url === '/') {
					filename = 'front-page'
				}
				else {
					filename = url.replace('/', '').replace(/\//g, '-')
				}
				fs.writeFileSync('./artifacts/' + device.name + '-' + filename + '.png', png)
			} catch (e) {
				console.log(e)
				chromy.close()
			}
		}
	}



	await chromy.close()

}

main()
