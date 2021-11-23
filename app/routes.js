const express = require('express')
const router = express.Router()

// Define percentages for each disability

// UK population: 67 million

// Wear glasses or contact lenses: 49 million 74%
const glassesContactsPC = 0.74

// Have a disability: 13 million 19%
const disabledTotalPC = 0.21

// 1 in 6 adults has the reading level of an 11-year-old
const readingLevel11YearsPC = 0.1666

// Deaf or hard of hearing: 11 million 16%
const deafPC = 0.16

// Dyslexia: 6.3 million 9%
const dyslexiaPC = 0.09

// Colour blindness: 3 million 4.5% (1 in 12 male and 1 in 200 female)
const colourBlindnessPC = 0.045
const colourBlindnessPCMale = 0.0425  //const colourBlindnessPCFemale = 0.0025

// Blind or partially sighted: 2 million 3%
const blindPC = 0.03

// Autistic spectrum: 700,000 1%
const autisticPC = 0.01

// BSL users 151,000 0.2%
const bslPC = 0.002


// Add your routes here - above the module.exports line

router.get('/index', function(req, res) {
    res.render('index', {
      'errorMessage' : null,
      'errorTitle' : "",
      'errorSummary' : false
    })
});

router.get('/results', function(req, res) {

    var peopletotal = req.query.peopletotal.replace(/,/g, '') // remove any commas

    peopletotal = parseInt(peopletotal, 10)

    // Check if it's not a number
    if(isNaN(peopletotal)){
      res.render('index', {
        'errorMessage' : {text: "Enter a number"},
        'errorTitle' : "Error - ",
        'errorSummary' : true
      })
    } else if (peopletotal>67000001){
      res.render('index', {
        'errorMessage' : {text: "Total number of people must be 67 million or fewer"},
        'errorTitle' : "Error - ",
        'errorSummary' : true
      })
    } else if (peopletotal<=99){
      res.render('index', {
        'errorMessage' : {text: "Total number of people must be 100 or more"},
        'errorTitle' : "Error - ",
        'errorSummary' : true
      })
    } else {
      res.render('results', {
        'peopleTotalDisplay' : peopletotal.toLocaleString('en'),
        'glassesContactsNum' : Math.ceil(peopletotal * glassesContactsPC).toLocaleString('en'),
        'disabledTotalNum' : Math.ceil(peopletotal * disabledTotalPC).toLocaleString('en'),
        'readingLevel11YearsNum' : Math.ceil(peopletotal * readingLevel11YearsPC).toLocaleString('en'),
        'deafNum' : Math.ceil(peopletotal * deafPC).toLocaleString('en'),
        'dyslexiaNum' : Math.ceil(peopletotal * dyslexiaPC).toLocaleString('en'),
        'colourBlindnessNum' : Math.ceil(peopletotal * colourBlindnessPC).toLocaleString('en'),
        'colourBlindnessMaleNum' : Math.ceil(peopletotal * colourBlindnessPCMale).toLocaleString('en'),
        'colourBlindnessFemaleNum' : (Math.ceil(peopletotal * colourBlindnessPC) - Math.ceil(peopletotal * colourBlindnessPCMale)).toLocaleString('en'),
        'blindNum' : Math.ceil(peopletotal * blindPC).toLocaleString('en'),
        'autisticNum' : Math.ceil(peopletotal * autisticPC).toLocaleString('en'),
        'bslNum' : Math.ceil(peopletotal * bslPC).toLocaleString('en')
      })
    }

});

module.exports = router
