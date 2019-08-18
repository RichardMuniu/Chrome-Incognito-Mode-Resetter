document.addEventListener('DOMContentLoaded', () => {

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        // define functions 
        function resetIncognitoMode(tabs) {
            console.log("Got to reset!");
            if (tabs[0].incognito) { // only do this in incognito mode
                /* 
                Clear cache, cookies, and all that good stuff that users accumulate
                in browsing sessions.
                */
                chrome.browsingData.removeAppcache({ "since": 0 });
                chrome.browsingData.removeCache({ "since": 0 });
                chrome.browsingData.removeCookies({ "since": 0 });
                chrome.browsingData.removeDownloads({ "since": 0 });
                chrome.browsingData.removeFileSystems({ "since": 0 });
                chrome.browsingData.removeIndexedDB({ "since": 0 });
                chrome.browsingData.removeLocalStorage({ "since": 0 });
                chrome.browsingData.removePluginData({ "since": 0 });
                chrome.browsingData.removeWebSQL({ "since": 0 });
                return true;
            } else {
                return false;
            }
        }

        /* Just a fun function for visual feedback and the illusion of progress */
        function loadBar(done) {
            console.log("Loading...");
            var textElement = document.getElementById("confirmation");
            var progBar = document.getElementById("loadingBar"); 
            var width = 10;
            var id = setInterval(frame, 8);
            if (done) {
                textElement.innerHTML = "Your incognito mode has been reset!";
            } else {
                textElement.innerHTML = "ERROR! Only use in incognito mode.";
                progBar.style.backgroundColor = "red";
            }
            // frame function used to animate the progress bar
            function frame() {
                if (width > 100) {
                    clearInterval(id);
                    progBar.innerHTML = 'Done.';
                } else {
                    width++; 
                    progBar.style.width = width + '%'; 
                    progBar.innerHTML = width * 1 + '%';
                }
            }
        }

        // now call functions above, based on output
        let done = resetIncognitoMode(tabs);
        loadBar(done);
    });
});


