//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// Define percentages for each disability 

// UK population: 67 million

// Wear glasses or contact lenses: 49 million 74%
const glassesContactsPC = 0.74

// Have a disability: 14.1 million 22%
const disabledTotalPC = 0.22

// 14.9% (or 1 in 7) of adults in England have literacy levels at or below
// Entry Level 3, which is equivalent to the literacy skills expected of a nine to 11-year-old
const readingLevel11YearsPC = 0.164

// Deaf or hard of hearing: 12 million 20%
const deafPC = 0.20

// Dyslexia: 6 million 10%
const dyslexiaPC = 0.10

// Colour blindness: 3 million 4.5% (1 in 12 male and 1 in 200 female)
const colourBlindnessPC = 0.045
const colourBlindnessPCMale = 0.0425  //const colourBlindnessPCFemale = 0.0025

// Blind or partially sighted: 340k 0.56%
const blindPC = 0.056

// Autistic spectrum: 700,000 1.16%
const autisticPC = 0.0116

// BSL users 151,000 0.2%
const bslPC = 0.002

// Initialise the start page and hide errors
router.get('/index', function(req, res) {
    res.render('index', {
      'errorMessage' : null,
      'errorTitle' : "",
      'errorSummary' : false
    })
});

// Check for errors from the form and display error messages if needed
// If no errors send to nice URL to display as /people/nnnnn
router.get('/check', function(req, res) {

    var peopletotal = req.query.peopletotal.replace(/,/g, '') // remove any commas

    // Check if nothing entered
    if(peopletotal.trim()==""){
      res.render('index', {
        'errorMessage' : {text: "Enter the number of people who will use your website"},
        'errorTitle' : "Error - ",
        'errorSummary' : true
      })
      return 0
    }

    // Check if it's not a number
    if(isNaN(peopletotal)){
      res.render('index', {
        'errorMessage' : {text: "Enter a number"},
        'errorTitle' : "Error - ",
        'errorSummary' : true
      })
      return 0
    }

    // Convert to an integer
    peopletotal = parseInt(peopletotal, 10)

    if (peopletotal>67000001){
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
      res.redirect('/people/'+peopletotal)
    }

});

// If no errors send to nice URL to display as /people/nnnnn
// This URL can also be used directly
// The regular expression allows only numbers between 3 and 8 digits long
router.get('/people/:num([0-9]{3,8})', function(req, res) {

    var peopletotal = req.params.num

    peopletotal = parseInt(peopletotal, 10)

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

});

// About page averages
router.get('/about', function(req, res) {

  function round2PC(value) {
    return Math.round(value * 1000) / 10;
  }

  res.render('about', {
    'glassesContactsAv' : round2PC( glassesContactsPC ),
    'disabledTotalAv' : round2PC( disabledTotalPC ),
    'readingLevel11YearsAv' : round2PC( readingLevel11YearsPC ),
    'deafAv' : round2PC( deafPC ),
    'dyslexiaAv' : round2PC( dyslexiaPC ),
    'colourBlindnessAv' : round2PC( colourBlindnessPC ),
    'blindAv' : round2PC( blindPC ),
    'autisticAv' : round2PC( autisticPC ),
    'bslNumAv' : round2PC( bslPC )
  })

});

