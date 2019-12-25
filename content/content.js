console.log('Content Script Running!');

$(document).ready(function(){
  $('.n-requirement-component.n-course-instructor p')
  .popup({
    position : 'top center',
    // target   : '.test.image',
    title    : 'My favorite dog',
    content  : 'My favorite dog would like other dogs as much as themselves'
    // popup: '#pop'
  })
  ;
  console.log($('.n-requirement-component.n-course-instructor p'));

  $('.n-requirement-component.n-requirement-course-instructor p')
    .popup({
      position : 'top center',
      // target   : '.test.image',
      title    : 'My favorite dog',
      content  : 'My favorite dog would like other dogs as much as themselves'
      // popup: '#pop'
    })
  ;
  console.log($('.n-requirement-component.n-requirement-course-instructor p'));

  var popupLoading = '<div class="ui inline active loader indeterminate text centered tiny">Loading...</div>';
  var popupContent = `<div class="top left transition ">
                        <div class="right aligned ">
                          <h4>Basic Plan</h4>
                          <p><b>2</b> projects, $10 a month</p>
                        </div>
                      </div>`;
  $('table[class="listOfClasses"] tr td:nth-child(7) abbr')
    .each(function() {
      // $( this ).addClass( "foo" );
      // console.log($(this).attr("title"));
      const name = $(this).attr("title");
      $(this).popup({
        position : 'top center',
        exclusive: true,
        hoverable: true,
        html: popupLoading,
        delay: {
          show: 400,
          hide: 400
        },
        // title    : $(this).attr("title"),
        // content  : 'My favorite dog would like other dogs as much as themselves\n asdfa\nasdfasd\nasdf'
        onShow: function (el) { // load data (it could be called in an external function.)
          var popup = this;
          console.log(name);
          // var name = $(this).attr("title").replace(/ /g,"+");
          // var lastName =
          popup.html(popupLoading);
          chrome.runtime.sendMessage(
            {contentScriptQuery: "queryRatingsWithName", name: name},
            response => {
              popup.html(`<a href=${response.link} style="color:black;" target="_blank">
                        <div class="top left transition ">
                          <div class="right aligned ">
                            <h3>${name}</h3>
                            <p><b>Overall Quality:</b> ${response.quality}/5.0</p>
                            <p><b>${response.number_of_ratings}</b></p>
                          </div>

                        </div>
                      </a>`);
            });    
              
          // $.ajax({
          //     url: `https://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=University+Of+Hawaii&query=${name}`
          // }).done(function(result) {
          //   const page = $(result).find("li.listing.PROFESSOR > a")[0];
          //   if(page != undefined) {
          //       link = `https://www.ratemyprofessors.com/${page.href.replace('https://www.sis.hawaii.edu/', '')}`;
          //       // const pathname = page.pathname;
          //       // const search = page.search;
          //       // link = `https://www.ratemyprofessors.com${pathname}${search}`;
          //       var quality = null;
          //       var difficulty = null;
          //       var retake = null;
          //       var numOfRatings = null;
          //       $.ajax({
          //         url: link
          //       }).done(function(profResult) {
          //         console.log('meow');
          //         //TODO: TBA and store prof page query data onto local variable or store google local storage
          //         //TODO: make HTML query searches more specific
          //         //TODO: cache
          //         //TODO: style popup so it looks legit
          //         //TODO: Do name in RateMyProfessor have dashes
          //         quality = $(profResult).find(".RatingValue__Numerator-qw8sqy-2 .gxuTRq").text();
          //         // difficulty = $(profResult).find(".breakdown-section.difficulty .grade").text();
          //         // retake = $(profResult).find(".breakdown-section.takeAgain .grade").text();
          //         numOfRatings = $(profResult).find(".TeacherRatingTabs__StyledTab-pnmswv-1 .cuqpDu .react-tabs__tab--selected").text();
          //         popup.html(`<a href=${link} style="color:black;">
          //                       <div class="top left transition ">
          //                         <div class="right aligned ">
          //                           <h3>${name}</h3>
          //                           <p><b>Overall Quality:</b> ${quality}/5.0
          //                             // <br>
          //                             // <b>Level of Difficulty:</b> ${difficulty}/5.0
          //                             // <br>
          //                             // <b>Would Take Again:</b> ${retake}
          //                             // <br>
          //                             <b>${numOfRatings}</b>
          //                         </div>
          //                       </div>
          //                     </a>`);
          //         }).fail(function() {
          //           popup.html('error');
          //         });
          //     } else {
          //       popup.html(`Couldn't find information`);
          //     }
          // }).fail(function() {
          //     popup.html('error');
          // });
        } 
      })
    })
    // .popup({
    //   position : 'top center',
    //   // target   : '.test.image',
    //   title    : 'My favorite dog',
    //   content  : 'My favorite dog would like other dogs as much as themselves'
    //   // popup: '#pop'
    // })
  ;
  console.log($('table[class="listOfClasses"] tr td:nth-child(7) abbr'));
  console.log("test");
})
