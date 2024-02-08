
    function handleHover() {
      var enterWarehouseBtn = document.getElementById('enterWarehouseBtn');
      enterWarehouseBtn.style.display = 'block';
    }


    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(function () {
          var sectionOffset = document.querySelector(".wrapper").offsetTop;

          window.scrollTo({
              top: sectionOffset,
              behavior: "smooth"
          });
      }, 1000); 
  });

