$(document).ready(function () {
  var currentFloor = 2;
  var counterUp = $('.counter__button--up');
  var counterDown = $('.counter__button--down');
  var floorPath = $('#home-img path');
  var flatPath = $('#flats-img path');
  var flatTextPath = $('.flat-list__item');
  var modal = $('.modal');
  var modalCloseButton = $('.modal__close-button');
  var viewFlatsButton = $('.view-flats');

  floorPath.on('mouseover', function () {
    floorPath.removeClass('current-floor');
    currentFloor = $(this).attr("data-floor");
    $('.floor').text(currentFloor);
  });

  counterUp.on('click', function () {
    if (currentFloor < 18) {
      currentFloor++;
      // Форматирование переменной с этажом. Из "4" в "04"
      useCurrentFloor = currentFloor.toLocaleString('en-Us', {minimumIntegerDigits: 2,useGrouping: false});
      $('.floor').text(useCurrentFloor);
      floorPath.removeClass('current-floor');
      $(`[data-floor=${useCurrentFloor}]`).toggleClass('current-floor');
    }
  });

  counterDown.on('click', function () {
    if (currentFloor > 2) {
      currentFloor--;
      useCurrentFloor = currentFloor.toLocaleString('en-Us', {minimumIntegerDigits: 2,useGrouping: false});
      $('.floor').text(useCurrentFloor);
      floorPath.removeClass('current-floor');
      $(`[data-floor=${useCurrentFloor}]`).toggleClass('current-floor');
    }
  });

  // При наведении на область изображения находим (с помощью метода eq)
  // соответствующий ей(текущей области) элемент списка и добавляем ему класс
  // Если пользователь убрал курсор с текущего элемента, то удаляем класс
  flatPath.on('mouseover', function () {
    flatTextPath.eq($(this).attr("data-flat")).addClass('flat-list__item--current');
  });
  flatPath.on('mouseout', function () {
    flatTextPath.eq($(this).attr("data-flat")).removeClass('flat-list__item--current');
  });

  // При наведении на описание одной из квартир по индексу элемента списка квартир
  // находим соответствующую ей область изображения и добавляем области класс
  // Если пользователь убрал курсор с текущего элемента, то удаляем класс
  flatTextPath.on('mouseover', function () {
    $(`[data-flat=${$(this).index()}]`).addClass('current-floor');
  });
  flatTextPath.on('mouseout', function () {
    $(`[data-flat=${$(this).index()}]`).removeClass('current-floor');
  });

  floorPath.on('click', toggleModal);
  viewFlatsButton.on('click', toggleModal);
  modalCloseButton.on('click', toggleModal);

  function toggleModal() {
    modal.toggleClass('is-open');
  }
})