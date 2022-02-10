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
  // let url = `${process.env.JIRA_URL}/rest/api/2/issue/${issueNum}`;
  let url = `https://bugs.grandpad.co/rest/api/2/issue/${issueNum}`;

  // console.log("url :", url);

  // auth header:
  // headers: {
  // Authorization: 'Basic c2NvdHQuZnVzdG9uQGdyYW5kcGFkLm5ldDpOelUyTnpZM05UYzRNREV6T2hyM1djY0pRdnVHeXFTYjJ2K0d6K05TdnJldg=='
  // }
  try {
    const res = await axios({
      method: "get",
      url: url,
      auth: {
        username: "scott.fuston",
        password: "Release123!",
      },
    });

    return res;
  } catch (err) {
    return { err: err };
  }
}
