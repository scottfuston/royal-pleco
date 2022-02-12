// name: The Cool NEW Get Linked Issues Button
// description: Sends a request to a REST API to start running the automated test for this project
// author: Gurock Software
// version: 2.0
// includes: ^runs/view
// excludes:

// js:
$(document).ready(function () {
  const jira_issue = document.querySelector(".referenceLink").text;
  const getLinkedIssues = async () => {
    if (jira_issue === null || jira_issue == "") {
      return false;
    }

    let run_id = document
      .querySelector(".content-header-inner div.content-header-id")
      .innerHTML.slice(1)
      .trim();

    await fetch(
      `https://royal-pleco.herokuapp.com/jira?issue=${jira_issue}&run_id=${run_id}`,
      {
        method: "get",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((data) => {
        if (data.status !== 200) {
          const error = `Error: please confirm: jira issue: ${jira_issue}.\n\n If problems persist contact Scott.`;
          alert(error);
          return;
        }

        btn.removeEventListener("click", getLinkedIssues);
        window.alert("Linked issues successfully added!");
        location.reload();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  /* Create the button */
  const button = $(
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