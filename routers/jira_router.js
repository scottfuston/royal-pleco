// *** User router ***
const express = require("express");
const router = express.Router();

const { jira_model: jira } = require("../models");

// get a Jira issue by card
router.get("/:num", (req, res) => {
  //TODO: check req headers

  const issueNum = req.params.num.toString().trim();
  // console.log("issue: ", issueNum);

  jira
    .getIssue(issueNum)
    .then((issue) => {
      const response = issue.data;
      // console.log('res: ', response)

      if (response) {
        const tester = response.fields.assignee;

        const issueLinks = response.fields.issuelinks.filter((iss) => {
          return iss.type.name !== "Bugs Found";
        });

        let results= {
          tester: tester,
          linkedIssues: issueLinks
        }

        return res.status(200).json(results);
      }
      res.status(404).json({ Error: `No issues matching ${issueNum}` });
    })
    .catch((err) => {
      return res.status(500).json({ Error: err });
    });
});

module.exports = router;
