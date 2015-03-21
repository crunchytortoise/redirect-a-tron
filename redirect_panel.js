function onPageDetailsReceived(pageDetails)  { 
    document.getElementById('str').value = pageDetails.str; 
    document.getElementById('rstr').value = pageDetails.rstr;
    document.getElementById('title').value = pageDetails.title; 
    document.getElementById('url').value = pageDetails.url; 
}

// chrome.runtime.onMessageExternal.addListener(m, user, function () {

// 	if (window.strdd in m) {
// 		m = window.rstr;
// 	}
// 	xmlHttp = new XMLHttpRequest();
//     xmlHttp.open( "GET", m, false );
//     xmlHttp.send( null );
//     return xmlHttp.responseText;

// })


// Global reference to the status display SPAN
var statusDisplay = null;

// POST the data to the server using XMLHttpRequest
function addBookmark() {
    // Cancel the form submit
    event.preventDefault();

    // // // The URL to POST our data to
    // var postUrl = 'http://post-test.local.com';

    // // // Set up an asynchronous AJAX POST request
    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', postUrl, true);

    // // // Prepare the data to be POSTed by URLEncoding each field's contents
    var str = encodeURIComponent(document.getElementById('str').value);
    var rstr = encodeURIComponent(document.getElementById('rstr').value);

    // var params = 'str=' + str + 
    //              '&rstr=' + rstr;

    // // Replace any instances of the URLEncoded space char with +
    // params = params.replace(/%20/g, '+');

    // //Set correct header for form data 
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // // Handle request state change events
    // xhr.onreadystatechange = function() { 
    //     // If the request completed
    //     if (xhr.readyState == 4) {
    //         statusDisplay.innerHTML = '';
    //         if (xhr.status == 200) {
    //             // If it was a success, close the popup after a short delay
    //             statusDisplay.innerHTML = 'Saved!';
    //             window.setTimeout(window.close, 1000);
    //              chrome.devtools.inspectedwindow.reload();
    //         } else {
    //             // Show what went wrong
    //             statusDisplay.innerHTML = 'Error saving: ' + xhr.statusText;
    //         }
    //     }
    // };

    // // Send the request and set status
    //xhr.send(params);
    statusDisplay.innerHTML = str;
    chrome.devtools.inspectedWindow.reload()
}



// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    // Cache a reference to the status display SPAN
    statusDisplay = document.getElementById('status-display');
    // Handle the bookmark form submit event with our addBookmark function
    document.getElementById('addbookmark').addEventListener('submit', addBookmark);
    // Get the event page
    chrome.runtime.getBackgroundPage(function(eventPage) {
        // Call the getPageInfo function in the event page, passing in 
        // our onPageDetailsReceived function as the callback. This injects 
        // content.js into the current tab's HTML
        eventPage.getPageDetails(onPageDetailsReceived);
    });
});