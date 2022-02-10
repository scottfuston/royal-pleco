// *** User router ***
const express = require("express");
const router = express.Router();

const { jira_model: jira } = require("../models");

// get a Jira issue by card
router.get("/:num", (req, res) => {
  //TODO: check req headers

  const issueNum = req.params.num.toString().trim();

  jira
    .getIssue(issueNum)
    .then((issue) => {
      const response = issue.data;

      if (response) {
        // filter out 'Bugs Found' types
        const issueLinks = response.fields.issuelinks.filter((iss) => {
          return iss.type.name !== "Bugs Found";
        });

        // init header str
        let resArray = issueLinks.length > 0 ? ["|||Issue|Tester"] : [];

        issueLinks.forEach((ele) => {
          let type = ele.inwardIssue
            ? "inwardIssue"
            : ele.outwardIssue
            ? "outwardIssue"
            : "";
          const key = ele[type].key;
          const description = ele[type].fields.summary;

          resArray.push(`||${key}: ${description}|`);
        });

        return res.status(200).json(resArray);
      }
      return res.status(404).json({ Error: `No issues matching ${issueNum}` });
    })
    .catch((err) => {
      return res.status(500).json({ Error: err });
    });
});

module.exports = router;
