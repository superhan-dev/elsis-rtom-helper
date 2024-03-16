// () => {
//   chrome.runtime.onMessage.addListener((obj, sender, response) => {
//     console.log("obj: ", obj);
//     console.log("sender: ", sender);
//     console.log("response: ", response);

//     const { type, value, testId } = obj;

//     if (type === "NEW") {
//       console.log("testId: ", testId);
//     }
//   });
// };
// content.js
// alert("Hello, content!");
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "convert") {
    document.documentElement.style.filter = "grayscale(100%)";
    sendResponse({ message: "Website converted to black and white." });
  } else if (request.action === "reset") {
    document.documentElement.style.filter = "none";
    sendResponse({ message: "Website reset to original colors." });
  } else if (request.action === "check_login") {
    var loginTextPanel = document.getElementById(
      "ctl00_Main_panelLogin_ECAALL"
    );

    if (loginTextPanel) {
      chrome.runtime.sendMessage({ isLogin: false });
    } else {
      chrome.runtime.sendMessage({ isLogin: true });
    }
  }
});
