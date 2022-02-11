// *** jira_model ***
const axios = require("axios");

module.exports = {
  getIssue,
};

// test data
const jira_issues = [
  {
    name: "Zebra-12345",
    description: "test data for issue Zebra-12345",
    linkedIssues: [
      {
        name: "Zebra-0000",
        description: "test data for linkedIssue 1",
      },
      {
        name: "Zebra-0001",
        description: "test data for linkedIssue 2",
      },
      {
        name: "Zebra-0002",
        description: "test data for linkedIssue 3",
      },
    ],
  },

  {
    name: "Zebra-67890",
    description: "test data for issue Zebra-67890",
    linkedIssues: [
      {
        name: "Zebra-0004",
        description: "test data for linkedIssue 1",
      },
      {
        name: "Zebra-0005",
        description: "test data for linkedIssue 2",
      },
      {
        name: "Zebra-0006",
        description: "test data for linkedIssue 3",
      },
    ],
  },
];

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
