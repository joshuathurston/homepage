document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.image-grid-hover').forEach(function(area) {
    const mainImg = area.querySelector('.main-print-img');
    area.querySelectorAll('.thumb-img').forEach(function(thumb) {
      thumb.addEventListener('click', function(e) {
        e.stopPropagation();
        mainImg.src = thumb.src;
      });
    });
  });
}); 