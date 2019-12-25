// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    // console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'developer.chrome.com' },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // if(changeInfo && changeInfo.status == "complete"){
  //     chrome.tabs.executeScript(tabId, {file: "jquery-3.1.1.min.js"}, function(){
  //         chrome.tabs.executeScript(tabId, {file: "semantic.min.js"}, function(){
  //           chrome.tabs.executeScript(tabId, {file: "content.js"});
  //     });
  // });
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.contentScriptQuery == "queryRatingsWithName") {
      var url = `https://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=University+Of+Hawaii&query=${request.name}`;
      $.ajax({
        url: url
      }).done(function (result) {
        const page = $(result).find("li.listing.PROFESSOR > a")[0];
        if (page != undefined) {
          let href = page.href;
          href = href.slice(href.lastIndexOf('/'), href.length);
          let link = `https://www.ratemyprofessors.com` + href;
          console.log(link);
          $.ajax({
            url: link
          }).done(function (rmpResult) {
            console.log('meow');
            //TODO: TBA and store prof page query data onto local variable or store google local storage
            //TODO: make HTML query searches more specific
            //TODO: cache
            //TODO: style popup so it looks legit
            //TODO: Do name in RateMyProfessor have dashes
            var quality = $(rmpResult).find("div.RatingValue__Numerator-qw8sqy-2.gxuTRq").text();
            var number_of_ratings = $(rmpResult).find('div.RatingValue__NumRatings-qw8sqy-0.BDziL a').text();
            sendResponse(
              { link,
                quality,
                number_of_ratings
              });
          });
        };
      });

      return true;  // Will respond asynchronously.
    }
  });