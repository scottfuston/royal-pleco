// *** User router ***
const express = require("express");
const router = express.Router();

const { jira_model: jira } = require("../models");

// get a Jira issue by card
router.get("/", (req, res) => {
  console.log("route hit\n");
  //TODO: check req headers

  const { jira_issue, run_id } = req.query;

  jira
    .getIssue(jira_issue)
    .then((issue) => {
      const response = issue.data;
      console.log("res: ", res);
      if (response) {
        // filter out 'Bugs Found' types
        const issueLinks = response.fields.issuelinks.filter((iss) => {
          return iss.type.name !== "Bugs Found";
        });

        // init header str
        let resArray = issueLinks.length > 0 ? ["|||Issue|Tester"] : [];

        issueLinks
          .forEach((ele) => {
            let type = ele.inwardIssue
              ? "inwardIssue"
              : ele.outwardIssue
              ? "outwardIssue"
              : "";
            const key = ele[type].key;
            const description = ele[type].fields.summary;

            resArray.push(`||${key}: ${description}|`);

            return resArray;
          })
          .then(async (resArray) => {
            // send data to TestRail api
            let descStr = "";
            resArray.forEach((r) => {
              descStr += r + "\n";
            });
            const trRes = await setTestRailDescription(descStr, run_id);
            res.status(200).send(trRes);
            return res.end();
          });
      }
      return res.status(404).send({ Error: `No issues matching ${issueNum}` });
    })
    .catch((err) => {
      return res.status(500).send({ Error: err });
    });
});

module.exports = router;
