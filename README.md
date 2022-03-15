# Tray.io scripting 

Scripts to allow development and testing of multiple integrations, workflows and steps built on top of Tray.io, for SugarCRM Inc.

# Benefits

* Simplify and speed up the development and debug process, by allowing local coding of the Tray.io NodeJS steps
* Ability to restore code, when implementing git versioning of complex script components, outside of Tray.io
* Ability to build more resilient code, by being able to write targeted tests or testing scripts with various inputs

# Features

* Ability to develop and test multiple projects, workflows and steps
* Ability to test multiple input dataset for each step
 
# Requirements

* linux/osx command line
* node and npm

I use osx, with node v16.6.1 and npm 7.20.3

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
