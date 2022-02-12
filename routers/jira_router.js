// *** User router ***
const express = require("express");
const router = express.Router();

const { jira_model: jira } = require("../models");

// get a Jira issue by card
router.get("/", async (req, res) => {
  //TODO: check req headers

  const jira_issue = req.query.issue;
  const run_id = req.query.run_id.trim();
  console.log("jira_issue: ", jira_issue);

  jira
    .getIssue(jira_issue)
    .then((issRes) => {
      // console.log("issRes: ", issRes);

      if (!issRes.data.fields) {
        console.log("issRes: ", issRes.data.errorMessages[0]);
        return res
          .status(404)
          .send({ Error: issRes.response.data.errorMessages[0] });
      }

      // filter out 'Bugs Found' types
      const issueLinks = issRes.data.fields.issuelinks.filter((iss) => {
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

      // format the description string
      let descStr = "";
      resArray.forEach((r) => {
        descStr += r + "\n";
      });

      jira
        .setTestRailDescription(descStr, run_id)
        .then((descRes) => {
          console.log(
            "setTestRailDescription Success!: ",
            descRes.status,
            "\n\n"
          );
          if (descRes.status === 200) {
            res.status(200).send("Success!");
          }
        })
        .catch((descErr) => {
          const status = descErr.response.status;
          console.log("descErr: ", descErr.response);
          res.status(status).json({ error: descErr.response.data.error });
        });
    })

    .catch((issueErr) => {
      const error = issueErr.response.data.errorMessages[0];
      const status = issueErr.response.status;

      console.log("issueErr: ", issueErr.response);
      return res.status(status).send(error);
    });
});

module.exports = router;
