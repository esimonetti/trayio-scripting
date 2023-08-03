# Tray.io Scripting Tool

Welcome to Tray.io Scripting, a powerful tool designed to simplify and accelerate the development and testing of multiple integrations, workflows, and steps built on top of Tray.io. Developed by Enrico Simonetti @ Naonis, in collaboration with Tray.io, this script allows you to take control of your Tray.io projects like never before.

## Benefits

* **Faster Development**: With this script, you can code locally Tray.io JavaScript/NodeJS script steps, allowing for quicker iteration, a better coding experience and debugging.

* **Leverage Your Skills**: Work in your favorite code editor with autocomplete functionality and advanced debugging capabilities. Enjoy the familiarity and power of your preferred tools.

* **Version Control**: Take advantage of Git versioning outside of Tray.io. Easily manage complex parts of your code and collaborate seamlessly with your team.

* **Resilient Code**: Build more robust integrations by testing various input datasets and simulating edge cases. Identify potential issues before they happen, ensuring smoother workflows.

## Features

* **Multiple Projects**: Develop and test multiple projects, workflows, and steps in a single environment. Stay organised and efficient.

* **Flexible Testing**: Test multiple input datasets for each step. Tailor your testing to ensure a more comprehensive coverage and a more robust end-result.

## Author

For all your integration and automation needs, don't hesitate to reach out to [Naonis](https://www.naonis.tech), your trusted experts in software integration and business automation. We are here to help you streamline your processes and drive your success.

# Requirements

* node and npm

I use osx with node v16.6.1 and npm v7.20.3 and linux with node v18.17.0 and npm v9.6.7 and those are the only environments this script has been tested on at this stage.

# Installation

* `git clone git@github.com:esimonetti/trayio-scripting.git`
* `cd trayio-scripting`
* `npm install`

# Usage

* Create the `scripts` directory, and within it, all subdirectories necessary to make sense for your project(s) structure
    * (e.g.: `./scripts/sample-project/workflow-name/step-name`)
* Create within the subdirectories, the `script.js` file
    * The file content should contain the same code as the matching step from Tray.io's UI
        * e.g.: `./scripts/sample-project/workflow-name/step-name/script.js`
* Create also the `inputs` directory, on the same level as the file `script.js`
    * e.g.: `./scripts/sample-project/workflow-name/step-name/inputs/`
* Add all the parameters required as input by the script, on the Tray.io step, within Tray.io's UI
* Then run the script at least once in debug mode, to get some input/output information on the Tray.io UI
    * Extract the debug inputs from Tray.io's UI
    * Create one or more `.json` files inside the directory `inputs`, and copy the content as-is from Tray.io's UI, for each set of possible inputs to test
        * e.g.: `./scripts/sample-project/workflow-name/step-name/inputs/input1.json`, `./scripts/sample-project/workflow-name/step-name/inputs/input2.json` etc.
* Execute `./execute.sh <path>`
    * e.g.: `./execute.sh ./scripts/sample-project/workflow-name/step-name`
* Alternatively execute directly `node app.js <path>`
    * e.g.: `npm app.js ./scripts/sample-project/workflow-name/step-name`

Happy local coding, debugging and versioning!

# Output

```
====================================================================================================
===== Executing: ./scripts/sample-project/workflow-name/step-name/script.js with input file: ./scripts/sample-project/workflow-name/step-name/inputs/input1.json
====================================================================================================


Script logs:

{
  id: '-99',
  name: 'US Dollar',
  symbol: '$',
  iso4217: 'USD',
  _acl: { fields: {} },
  _module: 'Currencies'
}
{
  id: '3aaf06e4-95c5-11ec-803c-0221da82edeb',
  name: 'Dollars',
  symbol: '$',
  iso4217: 'AUD',
  date_modified: '2022-03-03T03:13:27+00:00',
  _acl: { fields: {} },
  _module: 'Currencies'
}
{
  id: '85a4baaa-95c4-11ec-82ab-0656f3e316d1',
  name: 'Euro',
  symbol: '€',
  iso4217: 'EUR',
  date_modified: '2022-03-01T23:46:07+00:00',
  _acl: { fields: {} },
  _module: 'Currencies'
}

Script output:

{ currencyId: '85a4baaa-95c4-11ec-82ab-0656f3e316d1' }

====================================================================================================
===== Output of: ./scripts/sample-project/workflow-name/step-name/script.js with input file: ./scripts/sample-project/workflow-name/step-name/inputs/input1.json
====================================================================================================

.....


====================================================================================================
===== Executing: ./scripts/sample-project/workflow-name/step-name/script.js with input file: ./scripts/sample-project/workflow-name/step-name/inputs/input4.json
====================================================================================================


Script logs:


Script output:

{ currencyId: -99 }

====================================================================================================
===== Output of: ./scripts/sample-project/workflow-name/step-name/script.js with input file: ./scripts/sample-project/workflow-name/step-name/inputs/input4.json
====================================================================================================
```


# Credits for the original work

Work derived and adapted from the original ISC based work on https://github.com/trayio/script-connector-tester . Thank you Tray.io!
