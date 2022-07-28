# Estimate how many people using your website might be disabled

A simple website to calculate how many users of a service have disabilities. Based on the GOV.UK Prototype Kit.

## What the site does

You enter the estimated total number of visitors to your site. (Error checking restricts this to at least 100 and fewwr than 67 million.) The site produces a list of estimated numbers for different types of disability. To calculate these, it mainly uses percentages taken from the [Government Digital Service (GDS) accessibility personas](https://alphagov.github.io/accessibility-personas/).

The list is:

* wear glasses or contact lenses
* have any disability
* have literacy skills below level 1
* are deaf or hard of hearing
* are dyslexic
* have a colour vision deficiency
* are blind or partially sighted
* are autistic
* are British Sign Language (BSL) users


## How to update the percentages used

`/app/routes.js` includes a list of the percentages - for example `const glassesContactsPC = 0.74`. Change the values in this list.

## Developer notes

### Site uses GOV.UK Prototype Kit

The site uses the [GOV.UK Prototype Kit](https://govuk-prototype-kit.herokuapp.com/docs). Instructions to update the kit are in [Update your Prototype Kit](https://govuk-prototype-kit.herokuapp.com/docs/updating-the-kit).

The main service name that appears in the site banner is stored in `/app/config.js`.


### How the code works

The default page is `/app/views/index.html`.
On submit, the form action is a virtual URL `/check` which is read by `/app/routes.js`.

Code in `/app/routes.js`, in the `/check` section, checks for 3 types of error (see comments in that file) and if any are found serves `/app/views/index.html` again with the required error message.

If there are no errors, then the code redirects to a special `/people/nnnnn` which contains the number of users and can be bookmarked or called directly.

The `/people/nnnnn` URL uses the `results.html` template to display the results. These are calculated using the percentages in `routes.js`.


### Other pages

There are 3 other pages:

* `/app/views/about.html` - provides general information about the app and also displays the raw percentages used which are included dynamically from the values stored in `routes.js`
* `/app/views/accessibility.html` - the accessibility statement
* `/app/views/glasses-contact-lenses.html` - some background information about the statistic we use - it's stored here because the relevant link was a PDF and not accessible.
