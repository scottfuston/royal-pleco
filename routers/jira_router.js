// *** User router ***
const express = require("express");
const router = express.Router();

const { jira_model: jira } = require("../models");

// get a Jira issue by card
router.get("/", async (req, res) => {
  //TODO: check req headers

  const jira_issue = req.query.jira_issue;
  const run_id = req.query.run_id.trim();

  try {
    const issueStr = await jira.getIssue(jira_issue);

    if (!issueStr.data.fields) {
      console.log("issueStr: ", issueStr.data.errorMessages[0]);
      return res
        .status(404)
        .send({ Error: issueStr.response.data.errorMessages[0] });
    }

    // filter out 'Bugs Found' types
    const issueLinks = issueStr.data.fields.issuelinks.filter((iss) => {
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

    const testRailRes = await jira.setTestRailDescription(descStr, run_id);
    console.log("testRailRes: ", testRailRes.response.data.error);
  } catch (err) {
    console.log("issueStr err: ", err);
    return res.status(500).send(err);
  }

  // jira
  //   .getIssue(jira_issue)
  //   .then(async (issue) => {
  // if (!issue.data) return { Error: issue.response.statusText };
  // const response = issue.data;
  // // filter out 'Bugs Found' types
  // const issueLinks = response.fields.issuelinks.filter((iss) => {
  //   return iss.type.name !== "Bugs Found";
  // });
  // // init header str
  // let resArray = issueLinks.length > 0 ? ["|||Issue|Tester"] : [];
  // issueLinks.forEach((ele) => {
  //   let type = ele.inwardIssue
  //     ? "inwardIssue"
  //     : ele.outwardIssue
  //     ? "outwardIssue"
  //     : "";
  //   const key = ele[type].key;
  //   const description = ele[type].fields.summary;
  //   resArray.push(`||${key}: ${description}|`);
  // });
  // // send data to TestRail api
  // let descStr = "";
  // resArray.forEach((r) => {
  //   descStr += r + "\n";
  // });
  // return descStr;
  // })
  // .then((descStr) => {
  //   if (descStr.Error) {
  //     console.log("descStr: ", descStr.Error);
  //     return res.status(404).send({ Error: descStr.Error });
  //   }
  //   jira
  //     .setTestRailDescription(descStr, run_id)
  //     .then((testRailRes) => {
  //       console.log("testRail res:  ", testRailRes.status);
  //       return res.status(testRailRes.status).send({ testRailRes });
  //     })
  //     .catch((err) => {
  //       return err;
  //     });
  // })

  // .catch((err) => {
  //   return res.status(500).send({ Error: err });
  // });
});

module.exports = router;
