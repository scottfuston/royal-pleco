// *** jira_model ***
const { getData, postData } = require("../api/utils");

// get issue
function getIssue(issueNum) {
  // call jira api and get current issue(card)
  const url = process.env.JIRA_URL;
  const endPoint = `/rest/api/2/issue/${issueNum}`;
  const jiraAuth = {
    username: process.env.JIRA_USERNAME,
    password: process.env.JIRA_PASSWORD,
  };

  return getData(url, endPoint, jiraAuth);
}

// set testRail description
function setTestRailDescription(descStr, run_id) {
  // console.log("descStr: ", descStr, "run_id: ", run_id);

  const url = process.env.TEST_RAIL_URL;
  const endPoint = `/index.php?/api/v2/update_run/${run_id}`;
  const testRailAuth = {
    username: process.env.TEST_RAIL_EMAIL,
    password: process.env.TEST_RAIL_PASSWORD,
  };

  return postData(url, endPoint, testRailAuth, descStr);
}

module.exports = {
  getIssue,
  setTestRailDescription,
};
