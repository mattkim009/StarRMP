console.log('Content Script Running!');

$(document).ready(function () {
  $('.n-requirement-component.n-course-instructor p')
    .popup({
      position: 'top center',
      // target   : '.test.image',
      title: 'My favorite dog',
      content: 'My favorite dog would like other dogs as much as themselves'
      // popup: '#pop'
    });
  console.log($('.n-requirement-component.n-course-instructor p'));

  $('.n-requirement-component.n-requirement-course-instructor p')
    .popup({
      position: 'top center',
      // target   : '.test.image',
      title: 'My favorite dog',
      content: 'My favorite dog would like other dogs as much as themselves'
      // popup: '#pop'
    });
  console.log($('.n-requirement-component.n-requirement-course-instructor p'));

  var popupLoading = '<div class="ui inline active loader indeterminate text centered tiny">Loading...</div>';
  $('table[class="listOfClasses"] tr td:nth-child(7) abbr')
    .each(function () {
      const name = $(this).attr("title");
      $(this).popup({
        position: 'top center',
        exclusive: true,
        hoverable: true,
        html: popupLoading,
        delay: {
          show: 200,
          hide: 40000
        },
        onShow: function (el) { // load data (it could be called in an external function.)
          var popup = this;
          console.log(name);
          popup.html(popupLoading);
          chrome.runtime.sendMessage({ contentScriptQuery: "queryRatingsWithName", name: name },
            response => {
              var tags = ``;
              for (let i = 0; i < response.tags.length; i++) {
                tags += `<span class="card-tag">${response.tags[i]}</span>`
              }
              popup.html(`
              <div>
              <a href=${response.link} target="_blank">
              <article class="card assignment-card course-id-1">
                <header class="card-header card-background-color">
                  <h2>${name}</h2>
                </header>
                <section class="card-body">
                  <div class="card-info">
                    <div class="card-info-element">
                      <div class="card-info-description">
                        Quality
                      </div>
                      <div class="card-info-value">
                        ${response.quality}
                      </div>
                    </div>
                    <div class="card-info-element">
                      <div class="card-info-description">
                        # Ratings
                      </div>
                      <div class="card-info-value">
                        ${response.number_of_ratings}
                      </div>
                    </div>
                  </div>
                  <p class="card-body-delimiter"></p>
                  <br />
                  <p class="card-tags">
                    ${tags}
                  </p>
                </section>
              </article>
              </a>
              </div>
            `);
            }



          );

        }
      })
    });
})