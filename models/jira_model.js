// *** jira_model ***
const axios = require("axios");

module.exports = {
  getIssue,
  setTestRailDescription,
};

// get issue
async function getIssue(issueNum) {
  // call jira api and get current issue(card)
  let url = `${process.env.JIRA_URL}/rest/api/2/issue/${issueNum}`;
  try {
    const res = await axios({
      method: "get",
      url: url,
      auth: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
      },
    });

    return res;
  } catch (err) {
    return err;
  }
}

// set testRail description
async function setTestRailDescription(descStr, run_id) {
  console.log("descStr: ", descStr, "run_id: ", run_id);

  let url = `${process.env.TEST_RAIL_URL}/index.php?/api/v2/update_run/${run_id}`;
  try {
    const res = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "*"
      },
      url: url,
      auth: {
        username: process.env.EMAIL,
        password: process.env.PASSWORD,
      },
      data: {
        description: descStr,
      },
    });

    console.log("setTestRailDescription finished: ");
    return res;
  } catch (err) {
    return err;
  }
}
