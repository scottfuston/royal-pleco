// name: The Cool NEW Get Linked Issues Button
// description: Sends a request to a REST API to start running the automated test for this project
// author: Gurock Software
// version: 2.0
// includes: ^runs/add
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

    await fetch(`https://royal-pleco.herokuapp.com/jira/${jira_issue}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let temp = "";
        data.forEach((d) => {
          temp += d + "\n";
        });
        console.log("temp: ", temp);
        console.log("done");
        btn.removeEventListener("click", getLinkedIssues);
        return (descBox.innerHTML = temp);
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
  const descBox = document.querySelector(".field-editor");
  const btn = document.querySelector(".button-start");

  /* Bind the click event to trigger the script */
  btn.addEventListener("click", () => {
    getLinkedIssues();
  });
});
