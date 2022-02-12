// *** jira_model ***
const axios = require("axios");

module.exports = {
  getIssue,
  setTestRailDescription,
};

// get issue
function getIssue(issueNum) {
  // call jira api and get current issue(card)
  let url = `${process.env.JIRA_URL}/rest/api/2/issue/${issueNum}`;

  return axios({
    method: "get",
    url: url,
    auth: {
      username: process.env.JIRA_USERNAME,
      password: process.env.JIRA_PASSWORD,
    },
  });
}

// set testRail description
function setTestRailDescription(descStr, run_id) {
  // console.log("descStr: ", descStr, "run_id: ", run_id);

  let url = `${process.env.TEST_RAIL_URL}/index.php?/api/v2/update_run/${run_id}`;
  return axios({
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    url: url,
    auth: {
      username: process.env.TEST_RAIL_EMAIL,
      password: process.env.TEST_RAIL_PASSWORD,
    },
    data: {
      description: descStr,
    },
  });
}
