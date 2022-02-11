// *** jira_model ***
const axios = require("axios");

module.exports = {
  getIssue,
  setTestRailDescription,
};

// get issue
async function getIssue(issueNum) {
  // call jira api and get current issue(card)
  let url = `https://bugs.grandpad.co/rest/api/2/issue/${issueNum}`;
  try {
    const res = await axios({
      method: "get",
      url: url,
      auth: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
      },
    });

    console.log("getIssue finished\n");
    return res;
  } catch (err) {
    return err;
  }
}

// set testRail description
async function setTestRailDescription(descStr, run_id) {
  let url = `https://grandpad.testrail.io/index.php?/api/v2/update_run/${run_id}`;
  try {
    const res = await axios({
      method: "post",
      url: url,
      auth: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
      },
      body: {
        descStr,
      },
    });

    console.log("setTestRailDescription finished\n");
    console.log("setTestRailDescription res: ", res);
    return res;
  } catch (err) {
    return err;
  }
}
