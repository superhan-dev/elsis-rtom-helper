// async function fetchData() {
//   const res = await fetch("https://api.coronavirus.data.gov.uk/v1/data");
//   const record = await res.json();

//   console.log("fetched", record);

//   /**
//    * This linked popup html.
//    */
//   document.getElementById("date").innerHTML = record.data[0].date;
//   document.getElementById("areaName").innerHTML = record.data[0].areaName;
//   document.getElementById("latestBy").innerHTML = record.data[0].latestBy;
//   document.getElementById("deathNew").innerHTML = record.data[0].deathNew;
// }
// fetchData();

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");
  var convertButton = document.getElementById("convertButton");
  var resetButton = document.getElementById("resetButton");

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "check_login" });
  });

  convertButton.addEventListener("click", function () {
    console.log("convertButton event listener");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "convert" });
    });
  });

  resetButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "reset" });
    });
  });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (!message.isLogin) {
    document.querySelector("#title-h1").innerHTML = "Login Required!";
  } else {
    const title = chrome.runtime.getManifest().name;
    document.querySelector("#title-h1").innerHTML = title;
  }
});
