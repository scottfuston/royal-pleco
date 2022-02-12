# Royal-Pleco: Node/Express API for Plecostomus automation testing and other scripts

## About this project

- This server is deployed on Heroku
  api base url is: https://royal-pleco.herokuapp.com/

---

## Tech used

- [Expressjs Docs](https://expressjs.com/)

- Local development server uses [nodemon](https://www.npmjs.com/package/nodemon)

---

## Run this server locally:

- Clone to your machine.
- Run 'npm install'
- set up your local .env file:
- Run 'npm run server' to start up the server (running with nodemon)

---

## Endpoints

 > ### "/jira?issue=ZEBRA-115256&run_id=785"
  - url params: 
    1. issue: the jira issue or card name i.e. "issue=ZEBRA-115256". Must match the card exactly
    2. run_id: after you creat a run in testRail, this will be the id displayed in top left i.e. R785. We remove the letter and only send the num 785 in the url param i.e. "run_id=785"
  - [jira api docs](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/)
  - [test rail api docs](https://www.gurock.com/testrail/docs/customization/ui-scripts/introduction/)
---

## Middleware

---

