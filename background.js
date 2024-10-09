/**
 * Executes when a webNavigation occurs
 */
function navigationHandler(details) { 
  // Check for the Erroroneous URL that Brave/Chrome Generates when accessing a legacy RDP URI
  if (details.url.indexOf("http://rdp//") === 0) {

    // Close the http://rdp// tab that Brave erroroneusly opens
    chrome.tabs.remove(details.tabId);
  
    generateRDPFile(details.url);

    console.log("RDP detected.");
  }
}

/**
 * Generates an RDP file from a legacy RDP URI scheme
 */
function generateRDPFile(rdpUrl) {
  var rdpConf = rdpUrl.replace("http://rdp//","");
  rdpConf = rdpConf.replaceAll("%20"," "); // fix spaces
  rdpConf = rdpConf.replaceAll("&","\r\n"); // make new line for each param
  rdpConf = rdpConf.replaceAll("=",":"); // make parameter assignment use a colon

  // Generate a data URI with the RDP configuration
  var outputFile = "data:application/x-rdp;base64," + btoa(rdpConf);

  // Download
  chrome.downloads.download({
    url: outputFile, 
    filename: "RdpFile.rdp", 
    conflictAction: chrome.downloads.FilenameConflictAction.OVERWRITE, 
    saveAs: false
  });
}

// Wire up the listener so it executes when a page is loaded
chrome.webNavigation.onBeforeNavigate.addListener(navigationHandler);