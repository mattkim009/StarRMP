// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
//   if(changeInfo && changeInfo.status == "complete"){
//       chrome.tabs.executeScript(tabId, {file: "jquery-3.1.1.min.js"}, function(){
//           chrome.tabs.executeScript(tabId, {file: "semantic.min.js"}, function(){
//             chrome.tabs.executeScript(tabId, {file: "content.js"});
//       });
//   });
// }});
