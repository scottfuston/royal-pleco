// *** User router ***
const express = require("express");
const router = express.Router();

const { jira_model: jira } = require("../models");

// get a Jira issue by card
router.get("/:num", (req, res) => {
  //TODO: check req headers

  const issueNum = req.params.num.toString().trim().toLowerCase();
  console.log("issue: ", issueNum);

  jira
    .getByCardNum(issueNum)
    .then((issue) => {
      if (issue.hasOwnProperty("name")) {
        return res.status(200).json(issue);
      }
      res.status(401).json({ Error: `No issues matching ${issue.name}` });
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
});

// get user by id
// router.get("/:id", (req, res, next) => {
//   const { id } = req.params;
//   users
//     .findById(id)
//     .then((user) => {
//       if (user) {
//         return res.status(200).json(user);
//       }
//       res.status(401).json({ Error: "User not found" });
//     })
//     .catch(next);
// });

// update a user
// router.put("/", (req, res, next) => {
//   users
//     .updateUser(req.body)
//     .then((user) => {
//       res.status(200).json({
//         user_id: user[0].id,
//         user_name: user[0].userName,
//         message: "Successully updated",
//       });
//     })
//     .catch(next);
// });

// delete a user
// router.delete("/:id", (req, res, next) => {
//   // returns number of affected rows
//   common
//     .deleteResource(req.params.id, 'users')
//     .then((delRes) => {
//       res.status(200).json(delRes);
//     })
//     .catch(next);
// });

module.exports = router;
