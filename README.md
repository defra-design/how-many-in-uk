# Estimate how many people using your website might be disabled

A simple website to calculate how many users of a service have disabilities. Based on the GOV.UK Prototype Kit.

[Live site - estimate how many people using your website might be disabled](https://how-many.herokuapp.com/)

## What the site does

You enter the estimated total number of visitors to your site. (Error checking restricts this to at least 100 and fewer than 67 million.) The site produces a list of estimated numbers for different types of disability. To calculate these, it mainly uses percentages taken from the [Government Digital Service (GDS) accessibility personas](https://alphagov.github.io/accessibility-personas/).

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


## Developer notes

### Site uses GOV.UK Prototype Kit

The site uses the [GOV.UK Prototype Kit](https://govuk-prototype-kit.herokuapp.com/docs). Instructions to update the kit are in [Update your Prototype Kit](https://govuk-prototype-kit.herokuapp.com/docs/updating-the-kit).


### How to update the percentages used

`/app/routes.js` includes a list of the percentages - for example `const glassesContactsPC = 0.74`. Change the values in this list.


### Main template and config

The site uses the template in `app/views/layout_unbranded.html`.

The main service name that appears in the site banner is stored in `/app/config.js`.


### Useful background information

* [GOV.UK Prototype Kit Tutorials and templates](https://govuk-prototype-kit.herokuapp.com/docs/tutorials-and-examples)
* [Design System components](https://design-system.service.gov.uk/components/) - the kit uses HTML or Nunjucks components from the system
* [Nunjucks templating guide](https://mozilla.github.io/nunjucks/templating.html) - the templates use Nunjucks


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
* `/app/views/glasses-contact-lenses.html` - some background information about the statistics we use - it's stored here because the relevant link was a PDF and not accessible.


### Images

The ear and eye icons in the open graph image for this site are licensed under the Creative Commons Attribution 4.0 International license. The original icon artwork was used under the icon licence provided by Font Awesome.

The images are stored in `/app/assets/images/`.

The code to link to these is in `app/views/layout_unbranded.html`.


### Styling/CSS

We are mostly using the default [GOV.UK Design System](https://design-system.service.gov.uk/) styles from the prototype kit. The few overrides are in `app/assets/sass/unbranded.scss` and `app/assets/sass/application.scss`.


### Font

We are not licensed to use the GOV Transport font so we cannot use that (it is the default in the prototype kit). We use Atkinson Hyperlegible served from Google Fonts. The code to link to the fonts is in `app/views/layout_unbranded.html`.


## Forking or creating a copy

We welcome forking or copying but please consider before you do that if your needs are better served by:

* linking to our version instead of creating a copy
* submitting an update or making a feature request to [accessibility@defra.gov.uk](mailto:accessibility@defra.gov.uk)

If you do make a copy please:

* change or remove the open graph images and icon files to avoid confusion
* change the site name or title, unless you are using statistics for a different country
* consider giving a credit to the original authors


## To contact us

Email [accessibility@defra.gov.uk](mailto:accessibility@defra.gov.uk)
