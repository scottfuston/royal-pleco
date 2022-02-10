name: The Cool NEW Get Linked Issues Button
description: Sends a request to a REST API to start running the automated test for this project
author: Gurock Software
version: 2.0
includes: ^runs/add
excludes: 

js:
$(document).ready(
	function() {
		/*if (!uiscripts.context.project || uiscripts.context.project.id != 21)
		{
		    return; // Only apply this UI script to project with ID 21
		}*/

		const getLinkedIssues= async () => {
			alert('clicked')
			const jira_issue= document.querySelector('form .form-group:nth-child(4) input').value
			// var jira_issue = prompt("Please provide the corresponding JIRA card for this roll-out", "Zebra-1234")

			if(jira_issue === null || jira_issue == "")
			{
				return false;
			}
                console.log('jira_issue: ', jira_issue)


			await fetch(`https://royal-pleco.herokuapp.com/jira/${jira_issue}`, {
                keepalive: false,
                cache: "no-cache"
            }).then(response => {
                return response.json()
            }).then(data => {

                let temp= ''
                data.forEach(d => {
                temp+= d+'\n'
                })
                console.log('temp: ', temp)
                console.log('done')
				btn.removeEventListener('click', getLinkedIssues)
                return descBox.innerHTML= temp
            })
		}

		/* Create the button */
				var button = $('<div class="toolbar content-header-toolbar"><a class="toolbar-button toolbar-button-last toolbar-button-first content-header-button button-start" href="javascript:void(0)">Get Linked Issues</a></div>');

		/* Add it to the toolbar */
		
		$("#content-header .content-header-inner").prepend(button);	


		/* Bind the click event to trigger the script */

		const descBox= document.querySelector('.field-editor')
		const btn= document.querySelector('.button-start')
		btn.addEventListener('click', () => {
			getLinkedIssues()
		})

		// $("a", button).click(
		// 	function()
		// 	{	

            // const jira_issue= document.querySelector('form .form-group:nth-child(4) input').value
			// // var jira_issue = prompt("Please provide the corresponding JIRA card for this roll-out", "Zebra-1234")
            //     console.log('jira_issue: ', jira_issue)

			// if(jira_issue === null || jira_issue == "")
			// {
			// 	return false;
			// }
			
			// if(jira_issue == "Zebra-1234")
			// {	
			// 	window.alert("Please enter a real JIRA issue in the same format as the example \"ZEBRA-1234\". The script will not work if there are any spaces or if you past the URL")
			// 	return false;
			// }


				// $.ajax(
				// {
				// 	url: `https://royal-pleco.herokuapp.com/jira/${jira_issue}`,
				// 	dataType: 'json',
				// 	type: "GET",
				// 	headers: {
    			// 		   "Access-Control-Allow-Origin": "*"
				// 	},
				// 	success: function(data)
				// 	{
                //          const descBox= document.querySelector('.field-editor')
				// 		// console.log(uiscripts.context.run.description)
                //         let temp= ''
                //          data.forEach(d => {
                //             temp+= d+'\n'
                //         })
                //         console.log('temp: ', temp)
                //         descBox.innerHTML= temp
				// 		// var response = confirm('Was successful in getting the linked issues! You must refresh the page to see the updated description, would you like to refresh now?')
				// 		// if(response){
				// 		// 	location.reload();
				// 		// }
				// 	},
				// 	error: function(err)
				// 	{
				// 		console.error(err.responseText)
				// 		window.alert(
				// 			'An error occurred while trying to get the linked issues for the provided JIRA issue.  Please make sure that the format is exactly the same as the hint and that the issue number is correct.\nIf all else fails call Kevin.\n\nNOTE: THIS SCRIPT IS A WORK IN PROGRESS. DO NOT LET IT BEING BROKEN DISTRACT YOU FROM YOUR ASSIGNED TASK.');

				// 	}
				// });
			
 
		// 		return true;
		// 	}
		// );
	}	
);