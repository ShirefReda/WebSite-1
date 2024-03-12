// ==UserScript==
// @name         Auto Click Button on Text Match
// @namespace    http://your.namespace.com
// @version      1.0
// @description  Automatically clicks a button when a specific text is found on the page
// @author       Your Name
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Define the text to match
    var textToMatch = "Wait 0 s";

    // Define the button selectors
    var buttonSelectors = [
        'button[id="btn6"]',
        'button#jambo',
        'button.btn-success',
        'button.get-link-button'
    ];

    // Variables to keep track of whether each button has been clicked
    var buttonsClicked = {};

    // Variable to keep track of whether the page has been reloaded
    var pageReloaded = false;

    // Function to check if the specified text is found on the page
    function checkForTextAndClickButton() {
        var textElements = document.getElementsByTagName('body')[0].innerText;
        if (textElements.includes(textToMatch)) {
            buttonSelectors.forEach(function(selector) {
                var button = document.querySelector(selector);
                if (button && !buttonsClicked[selector]) {
                    button.click();
                    buttonsClicked[selector] = true;
                }
            });
        }
        if (textElements.includes("✓")) {
            var successButton = document.querySelector('button.btn-success');
            var jamboButton = document.querySelector('button#jambo');
            if (successButton && !buttonsClicked['button.btn-success'] && !successButton.classList.contains('get-link-button')) {
                successButton.click();
                buttonsClicked['button.btn-success'] = true;
            }
            if (jamboButton && !buttonsClicked['button#jambo']) {
                jamboButton.click();
                buttonsClicked['button#jambo'] = true;
            }
        }
        
        // Click on any element containing the text "Close" as if it were a button
        var closeButtons = document.querySelectorAll('*:contains("Close")');
        closeButtons.forEach(function(closeButton) {
            if (!buttonsClicked['close-button']) {
                closeButton.click();
                buttonsClicked['close-button'] = true;
            }
        });
        
        // Click on any element containing the text "Get Link" as if it were a button
        var getLinkButtons = document.querySelectorAll('*:contains("Get Link")');
        getLinkButtons.forEach(function(getLinkButton) {
            if (!buttonsClicked['get-link-button']) {
                getLinkButton.click();
                buttonsClicked['get-link-button'] = true;
            }
        });
        
        // Click on the dismiss button if it appears
        var dismissButton = document.getElementById('dismiss-button');
        if (dismissButton && !buttonsClicked['dismiss-button']) {
            dismissButton.click();
            buttonsClicked['dismiss-button'] = true;
        }
        
        // Click on the "Get Link" button if timer equals 0
        var timerSpan = document.getElementById('timer');
        if (timerSpan && timerSpan.innerText === '0') {
            var getLinkButton = document.querySelector('button.get-link-button');
            if (getLinkButton && !buttonsClicked['get-link-button']) {
                getLinkButton.click();
                buttonsClicked['get-link-button'] = true;
            }
        }
    }

    // Function to check the URL hash and reload the page if necessary
    function checkURLHash() {
        if (!pageReloaded && window.location.hash.includes("#google_vignette")) {
            location.reload();
            pageReloaded = true;
        }
    }

    // Check for the text and click the buttons every 1 second
    setInterval(checkForTextAndClickButton, 1000);

    // Check the URL hash every 1 second
    setInterval(checkURLHash, 1000);
})();
