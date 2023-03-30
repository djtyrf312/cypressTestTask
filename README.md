## HOW TO CLONE AND RUN TESTS
1. Clone the repository
2. Open cloned repository in your IDE
3. Install cypress using command `npm install cypress --save-dev`
4. Run cypress using command `npx cypress open`
5. In opened browser window click "e2e testing" card
6. Click "Start e2e testing in Chrome" button
7. Click "callForm.cy.js" file

## FILES AND FOLDERS
1. cypress/E2E/callForm.cy.js - main file with tests
2. cypress/support/testData/callForm.ts - file with form class and methods used in that form
3. cypress/support/testData/callForm.typedefs.ts - enums for different fields in the form
4. cypress/support/testData/constants.ts - constants and functions used in the form
5. cypress/support/pageObject.ts - file with page object class and methods used on the main page
6. cypress.config.js - config file with page url and other settings
