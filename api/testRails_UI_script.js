// name: The Cool NEW Get Linked Issues Button
// description: Sends a request to a REST API to start running the automated test for this project
// author: Gurock Software
// version: 2.0
// includes: ^runs/view
// excludes:

// js:
$(document).ready(function () {
  const getLinkedIssues = async () => {
    const jira_issue = document.querySelector(
      "form .form-group:nth-child(4) input"
    ).value;

    if (jira_issue === null || jira_issue == "") {
      return false;
    }

    const run_id = document.querySelector(
      ".content-header-inner div.content-header-id"
    ).innerHTML;
    console.log("run_id: ", run_id);

    await fetch(
      `https://royal-pleco.herokuapp.com/jira?issue=${jira_issue}&run_id=${run_id}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("done: ", data);
        btn.removeEventListener("click", getLinkedIssues);
        return;
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  /* Create the button */
  var button = $(
    '<div class="toolbar content-header-toolbar"><a class="toolbar-button toolbar-button-last toolbar-button-first content-header-button button-start" href="javascript:void(0)">Get Linked Issues</a></div>'
  );

  /* Add it to the toolbar */
  $("#content-header .content-header-inner").prepend(button);

  //   other elements used
  const btn = document.querySelector(".button-start");

  /* Bind the click event to trigger the script */
  btn.addEventListener("click", () => {
    getLinkedIssues();
  });
});
