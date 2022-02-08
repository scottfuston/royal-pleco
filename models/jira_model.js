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
  // https://<site-url>/rest/api/3/<resource-name>
  // For example, https://your-domain.atlassian.net/rest/api/3/issue/DEMO-1
  let url= 'https://bugs.grandpad.co/rest/api/3/issue'

  // NzU2NzY3NTc4MDEzOhr3WccJQvuGyqSb2v+Gz+NSvrev

  // encoded: c2NvdHQuZnVzdG9uQGdyYW5kcGFkLm5ldDpOelUyTnpZM05UYzRNREV6T2hyM1djY0pRdnVHeXFTYjJ2K0d6K05TdnJldg==

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
