$(document).ready(function() {
  var scrollLink = $(".scroll");

  // Smooth scrolling
  scrollLink.click(function(e) {
    e.preventDefault();
    $("body,html").animate(
      {
        scrollTop: $(this.hash).offset().top
      },
      1000
    );
  });

  // Active link switching
  $(window).scroll(function() {
    var scrollbarLocation = $(this).scrollTop();
    scrollLink.each(function() {
      var sectionOffset = $(this.hash).offset().top - 0;
      if (sectionOffset <= scrollbarLocation) {
        $(this)
          .parent()
          .addClass("active");
        $(this)
          .parent()
          .siblings()
          .removeClass("active");
      }
    });
  });
});
function isOnScreen(elem) {
  // if the element doesn't exist, abort
  if (elem.length == 0) {
    return;
  }
  var $window = jQuery(window);
  var viewport_top = $window.scrollTop();
  var viewport_height = $window.height();
  var viewport_bottom = viewport_top + viewport_height;
  var $elem = jQuery(elem);
  var top = $elem.offset().top;
  var height = $elem.height();
  var bottom = top + height;

  return (
    (top >= viewport_top && top < viewport_bottom) ||
    (bottom > viewport_top && bottom <= viewport_bottom) ||
    (height > viewport_height &&
      top <= viewport_top &&
      bottom >= viewport_bottom)
  );
}

var oldsState = "header";
var newState = "";
jQuery(document).ready(function() {
  window.addEventListener("scroll", function(e) {
    if (isOnScreen(jQuery("#feed"))) {
      /* Pass element id/class you want to check */
      newState = "feed";
      if (newState == oldsState) {
        return;
      } else {
        oldsState = "feed";
        $("#header").hide(100, function() {
          $(this)
            .html(' <div class="stickyHeader"><h1>     FEED    </h1></div>')
            .show(100);
        });
      }
    } else if (isOnScreen(jQuery("#save"))) {
      /* Pass element id/class you want to check */
      newState = "save";
      if (newState == oldsState) {
        return;
      } else {
        oldsState = "save";
        $("#header").hide(100, function() {
          $(this)
          .html(
            '<div class="stickyHeader"><h1>     SAVE    </h1></div>'
          )
            .show(100);
        });
      }
    } else if (isOnScreen(jQuery("#scale"))) {
      /* Pass element id/class you want to check */
      newState = "scale";
      if (newState == oldsState) {
        return;
      } else {
        oldsState = "scale";
        $("#header").hide(100, function() {
          $(this)
          .html(
            ' <div class="stickyHeader"><h1>     SCALE    </h1></div>'
          )
            .show(100);
        });
      }
    } else if (isOnScreen(jQuery("#header"))) {
      newState = "header";
      if (newState == oldsState) {
        return;
      } else {
        oldsState = "header";
        $("#header").hide(100, function() {
          $(this)
          .html(
            ' <div class="stickyHeader">    <h1>      Clean Milk for    </h1>    <h1>People & Planet.</h1>  </div>'
          )
            .show(100);
        });
      }
    } else {
      oldsState = "new"
      $("#header").html('<div class="stickyHeader"></div>');
    }
  });
});
