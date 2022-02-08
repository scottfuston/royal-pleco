// *** jira_model ***

module.exports = {
  getByCardNum,
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
function getByCardNum(issueNum) {
  // call jira api and get current issue(card)

  // simulate a promise
  const promise = new Promise((resolve, reject) => {

    setTimeout(() => {

      const res = jira_issues.filter((iss) => {
        return iss.name.toLowerCase() === issueNum;
      })[0];

      if (res) {
        resolve(res);
      } else {
        reject(`no resource found for ${issueNum}`);
      }

    }, 1000);

  });
  return promise;
}
