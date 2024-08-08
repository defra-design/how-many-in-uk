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

// deaf, have hearing loss or tinnitus, 1 in 3 33.3%
const deafPC = 0.333

// Dyslexia: 6 million 10%
const dyslexiaPC = 0.10

// Dyscalculia: 3 to 6%
const dyscalculiaPC = 0.06

// Colour blindness: 3 million 4.5% (1 in 12 male and 1 in 200 female)
const colourBlindnessPC = 0.045
const colourBlindnessPCMale = 0.0425  //const colourBlindnessPCFemale = 0.0025

// Sight loss: 2m 3.33%
const sightLossPC = 0.0333

// Blind or partially sighted: 340k 0.56%
const blindPC = 0.0056

// Autistic spectrum: 700,000 1.16%
const autisticPC = 0.0116

// ADHD: 2,600,000 4.33%
const adhdPC = 0.0433

// NHS Mental Health: 1.91m 2.85%
const mentalHealthPC = 0.0285

// BSL users 151,000 0.2%
const bslPC = 0.002

// Chronic Pain: between 21m and 30.78m 35% to 51.3%
const chronicPainPC = 0.513

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
      'dyscalculiaNum' : Math.ceil(peopletotal * dyscalculiaPC).toLocaleString('en'),
      'colourBlindnessNum' : Math.ceil(peopletotal * colourBlindnessPC).toLocaleString('en'),
      'colourBlindnessMaleNum' : Math.ceil(peopletotal * colourBlindnessPCMale).toLocaleString('en'),
      'colourBlindnessFemaleNum' : (Math.ceil(peopletotal * colourBlindnessPC) - Math.ceil(peopletotal * colourBlindnessPCMale)).toLocaleString('en'),
      'sightLossNum' : Math.ceil(peopletotal * sightLossPC).toLocaleString('en'),
      'blindNum' : Math.ceil(peopletotal * blindPC).toLocaleString('en'),
      'autisticNum' : Math.ceil(peopletotal * autisticPC).toLocaleString('en'),
      'adhdNum' : Math.ceil(peopletotal * adhdPC).toLocaleString('en'),
      'mentalHealthNum' : Math.ceil(peopletotal * mentalHealthPC).toLocaleString('en'),
      'bslNum' : Math.ceil(peopletotal * bslPC).toLocaleString('en'),
      'chronicPainNum' : Math.ceil(peopletotal * chronicPainPC).toLocaleString('en')
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

