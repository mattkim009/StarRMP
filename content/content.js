$(document).ready(function () {
  const popupLoading = '<div class="ui inline active loader indeterminate text centered tiny">Loading...</div>';
  const popupTemplate = (data) => {
    return `<div>
              <a href=${data.link} target="_blank">
              <article class="card assignment-card course-id-1">
                <header class="card-header card-background-color">
                  <h2>${data.name}</h2>
                </header>
                <section class="card-body">
                  <div class="card-info">
                    <div class="card-info-element">
                      <div class="card-info-description">
                        Quality
                      </div>
                      <div class="card-info-value">
                        ${data.quality}
                      </div>
                    </div>
                    <div class="card-info-element">
                      <div class="card-info-description">
                        # Ratings
                      </div>
                      <div class="card-info-value">
                        ${data.number_of_ratings}
                      </div>
                    </div>
                  </div>
                  <p class="card-body-delimiter"></p>
                  <br />
                  <p class="card-tags">
                    ${data.tags}
                  </p>
                </section>
              </article>
              </a>
            </div>`;
  }

  const queryRatingsWithName = function (popup, name) {
    chrome.runtime.sendMessage({ contentScriptQuery: "queryRatingsWithName", name: name },
      response => {
        if (!response) {
          return popup.html(`Error!`);
        }
        if (response.error) {
          return popup.html(`${response.error}`);
        }
        var tags = ``;
        for (let i = 0; i < response.tags.length; i++) {
          tags += `<span class="card-tag">${response.tags[i]}</span>`
        }
        popup.html(popupTemplate(
          {
            link: response.link,
            name: name,
            quality: response.quality,
            number_of_ratings: response.number_of_ratings,
            tags: tags
          }
        ));
      }
    );
  }

  var intervalID = setInterval(function () {
    if ($('.n-course').length >= 2) {
      $('.n-course-component.n-course-instructor')
        .each(function () {
          $(this).css('cursor', 'pointer');
          const name = $(this).text().trim().replace(/ /g, ' ').split('\n')[0].split(' ').reverse().join(' ').replace(/-/g, ' ');
          if (!name) {
            $(this.popup({
              position: 'left center',
              exclusive: true,
              hoverable: true,
              html: `Invalid Search`,
              delay: {
                show: 400,
                hide: 400
              },
            }))
          } else {
            $(this).popup({
              position: 'left center',
              exclusive: true,
              hoverable: true,
              html: popupLoading,
              delay: {
                show: 400,
                hide: 400
              },
              onShow: function (el) { // load data (it could be called in an external function.)
                var popup = this;
                popup.html(popupLoading);
                queryRatingsWithName(popup, name);
              }
            })
          }
        });
      clearInterval(intervalID);
      $('.btn.btn-default').click(function () { // Load More Courses Button
        var oldLength = $('.n-course').length;
        var intervalID3 = setInterval(function () {
          if (oldLength != $('.n-course').length) {
            $('.n-course-component.n-course-instructor')
              .each(function () {
                $(this).css('cursor', 'pointer');
                const name = $(this).text().trim().replace(/ /g, ' ').split('\n')[0].split(' ').reverse().join(' ').replace(/-/g, ' ');
                if (!name) {
                  $(this.popup({
                    position: 'left center',
                    exclusive: true,
                    hoverable: true,
                    html: `Invalid Search`,
                    delay: {
                      show: 400,
                      hide: 400
                    },
                  }))
                } else {
                  $(this).popup({
                    position: 'left center',
                    exclusive: true,
                    hoverable: true,
                    html: popupLoading,
                    delay: {
                      show: 400,
                      hide: 400
                    },
                    onShow: function (el) { // load data (it could be called in an external function.)
                      var popup = this;
                      popup.html(popupLoading);
                      queryRatingsWithName(popup, name);
                    }
                  })
                }
              });
            clearInterval(intervalID3);
          }
        }, 250);
      });
      $('.btn.btn-primary.btn-block').click(function () { // Search Button
        var intervalID4 = setInterval(function () {
          if ($('.n-course').length >= 2) {
            $('.n-course-component.n-course-instructor')
              .each(function () {
                $(this).css('cursor', 'pointer');
                const name = $(this).text().trim().replace(/ /g, ' ').split('\n')[0].split(' ').reverse().join(' ').replace(/-/g, ' ');
                if (!name) {
                  $(this.popup({
                    position: 'left center',
                    exclusive: true,
                    hoverable: true,
                    html: `Invalid Search`,
                    delay: {
                      show: 400,
                      hide: 400
                    },
                  }))
                } else {
                  $(this).popup({
                    position: 'left center',
                    exclusive: true,
                    hoverable: true,
                    html: popupLoading,
                    delay: {
                      show: 400,
                      hide: 400
                    },
                    onShow: function (el) { // load data (it could be called in an external function.)
                      var popup = this;
                      popup.html(popupLoading);
                      queryRatingsWithName(popup, name);
                    }
                  })
                }
              });
            clearInterval(intervalID4);
          }
        }, 250);
      });
    }
  }, 250);

  var intervalID2 = setInterval(function () {
    if ($('.n-requirement-component.n-requirement-status').length) {
      $('.n-requirement-component.n-requirement-course-instructor')
        .each(function () {
          $(this).css('cursor', 'pointer');
          const name = $(this).text().trim().replace(/ /g, ' ').split('\n')[0].split(' ').reverse().join(' ').replace(/-/g, ' ');
          if (!name) {
            $(this.popup({
              position: 'left center',
              exclusive: true,
              hoverable: true,
              html: `Invalid Search`,
              delay: {
                show: 400,
                hide: 400
              },
            }))
          } else {
            $(this).popup({
              position: 'left center',
              exclusive: true,
              hoverable: true,
              html: popupLoading,
              delay: {
                show: 400,
                hide: 400
              },
              onShow: function (el) { // load data (it could be called in an external function.)
                var popup = this;
                popup.html(popupLoading);
                queryRatingsWithName(popup, name);
              }
            })
          }
        });
      clearInterval(intervalID2);
    }
  },
  500);



  $('table[class="listOfClasses"] tr td:nth-child(7) abbr')
    .each(function () {
      $(this).css('cursor', 'pointer');
      const name = $(this).attr("title").replace(/-/g, ' ');
      $(this).popup({
        position: 'bottom center',
        exclusive: true,
        hoverable: true,
        html: popupLoading,
        delay: {
          show: 400,
          hide: 400
        },
        onShow: function (el) { // load data (it could be called in an external function.)
          var popup = this;
          popup.html(popupLoading);
          queryRatingsWithName(popup, name);
        }
      })
    });
    
});