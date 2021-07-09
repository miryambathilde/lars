const fsp = require("fs").promises;
const fs = require("fs");
const schema = require('../utilities/Validation/schema')
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');

exports.postAnalytics = catchAsync(async (req, res, next) => {
	const { ip, coordinates } = req.body;
	const validator = await schema.validateAsync(req.body);
	let reportAnalytics = [];
	// checks if file exists
	if (fs.existsSync(`${__dirname}/storeAnalytics.json`)) {
		// If the file exists, reads the file
		const reportFile = await fsp.readFile(`${__dirname}/storeAnalytics.json`,"utf-8")
		// converts the file to JavaScript Object
		reportAnalytics = JSON.parse(reportFile);
	} else {
		// if file does not exist
		return next(new AppError('File does not exist', 404));
	}


  reportAnalytics.push({ ...req.body, createdAt: new Date() });
  await fsp.writeFile(
    `${__dirname}/storeAnalytics.json`, JSON.stringify(reportAnalytics))
    res.status(201).json({
      status: 'success',
      data: {
          message: 'IP and Coordinates successfully taken'
      }
  })
	  
});
