var textareaResize = function(source, dest) {
  var resizeInt = null;

  // the handler function
  var resizeEvent = function() {
      dest.outerWidth( source.outerWidth() );
      dest.outerHeight(source.outerHeight());
  };

  // This provides a "real-time" (actually 15 fps)
  // event, while resizing.
  // Unfortunately, mousedown is not fired on Chrome when
  // clicking on the resize area, so the real-time effect
  // does not work under Chrome.
  source.on("mousedown", function(e) {
      resizeInt = setInterval(resizeEvent, 1000/15);
  });

  // The mouseup event stops the interval,
  // then call the resize event one last time.
  // We listen for the whole window because in some cases,
  // the mouse pointer may be on the outside of the textarea.
  $(window).on("mouseup", function(e) {
      if (resizeInt !== null) {
          clearInterval(resizeInt);
      }
      resizeEvent();
  });
};

