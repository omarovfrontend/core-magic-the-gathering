// ждем пока страница загрузится
$(document).ready(function() {
  // ставим таймер и через секунду
  setTimeout(function() {
    // берем Боди и ставим ему класс, который изменит стили
    $('body').addClass('page-loaded');
  }, 1000);
});
