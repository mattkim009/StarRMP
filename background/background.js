// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// chrome.runtime.onInstalled.addListener(function () {
//   chrome.storage.sync.set({ color: '#3aa757' }, function () {
//     // console.log('The color is green.');
//   });
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
//     chrome.declarativeContent.onPageChanged.addRules([{
//       conditions: [new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: { hostEquals: 'developer.chrome.com' },
//       })],
//       actions: [new chrome.declarativeContent.ShowPageAction()]
//     }]);
//   });
// });

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.contentScriptQuery == "queryRatingsWithName") {
      var url = `https://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=University+Of+Hawaii&query=${request.name}`;
      $.ajax({
        url: url,
        timeout: 5000,
      }).done(function (result) {
        const page = $(result).find("li.listing.PROFESSOR > a")[0];
        if (page != undefined) {
          let href = page.href;
          href = href.slice(href.lastIndexOf('/'), href.length);
          let link = `https://www.ratemyprofessors.com` + href;
          $.ajax({
            url: link,
            timeout: 5000,
          }).done(function (rmpResult) {
            //TODO: TBA and store prof page query data onto local variable or store google local storage
            //TODO: make HTML query searches more specific
            //TODO: cache
            //TODO: Do name in RateMyProfessor have dashes
            var quality = $(rmpResult).find("div.RatingValue__Numerator-qw8sqy-2.gxuTRq").text();
            var number_of_ratings = $(rmpResult).find('div.RatingValue__NumRatings-qw8sqy-0.jvzMox a').text().replace('ratings', '').trim();
            var tags = $(rmpResult).find('div.TeacherTags__TagsContainer-sc-16vmh1y-0.dbxJaW span').map((i, val) => $(val).text());
            if (!quality || !number_of_ratings) {
              sendResponse({error: `Couldn't parse the information from this professor's website.`});
            } else {
              sendResponse(
                { link,
                  quality,
                  number_of_ratings,
                  tags
                });
            }
          }).fail(function() {
            sendResponse({error: `Couldn't parse the information from this professor's website.`});
          });
        } else {
          sendResponse({error: `Couldn't find "${request.name}".`});
        }
      }).fail(function() {
        sendResponse({error: `Couldn't find "${request.name}".`});
      });

      return true;  // Will respond asynchronously.
    }
  });