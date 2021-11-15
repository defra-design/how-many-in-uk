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

    var peopletotal = parseInt(req.query.peopletotal, 10)

    // Check if it's not a number
    if(isNaN(peopletotal)){
      res.render('index', {
        'errorMessage' : {text: "Enter a number"},
        'errorTitle' : "Error - ",
        'errorSummary' : true
      })
    } else if (peopletotal>68000000){
      res.render('index', {
        'errorMessage' : {text: "Enter less than the UK population"},
        'errorTitle' : "Error - ",
        'errorSummary' : true
      })
    } else if (peopletotal<100){
      res.render('index', {
        'errorMessage' : {text: "Sorry, less than 100 users is too few to estimate"},
        'errorTitle' : "Error - ",
        'errorSummary' : true
      })
    } else {
      res.render('results', {
        'peopleTotalDisplay' : peopletotal.toLocaleString('en'),
        'glassesContacts' : Math.ceil(peopletotal * glassesContactsPC).toLocaleString('en'),
        'disabledTotal' : Math.ceil(peopletotal * disabledTotalPC).toLocaleString('en'),
        'readingLevel11Years' : Math.ceil(peopletotal * readingLevel11YearsPC).toLocaleString('en'),
        'deaf' : Math.ceil(peopletotal * deafPC).toLocaleString('en'),
        'dyslexia' : Math.ceil(peopletotal * dyslexiaPC).toLocaleString('en'),
        'colourBlindness' : Math.ceil(peopletotal * colourBlindnessPC).toLocaleString('en'),
        'colourBlindnessMale' : Math.ceil(peopletotal * colourBlindnessPCMale).toLocaleString('en'),
        'colourBlindnessFemale' : (Math.ceil(peopletotal * colourBlindnessPC) - Math.ceil(peopletotal * colourBlindnessPCMale)).toLocaleString('en'),
        'blind' : Math.ceil(peopletotal * blindPC).toLocaleString('en'),
        'autistic' : Math.ceil(peopletotal * autisticPC).toLocaleString('en'),
        'bsl' : Math.ceil(peopletotal * bslPC).toLocaleString('en')
      })
    }

});

module.exports = router
