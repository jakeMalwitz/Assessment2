$(document).ready(function () {
  getAnimals();
  $('#animal-submit').on('click', postAnimal);
});

function getAnimals() {
  $.ajax({
    type: 'GET',
    url: '/animals',
    success: function (animals) {
      console.log('GET /animals returns:', animals);
      animals.forEach(function (animal) {
        var $el = $('<li></li>');
        $el.append('<strong>' + animal.name + '</strong>');
        $el.append('<strong>' + " " + animal.quantity + '</strong>');
        $('#animals').append($el);
      });
    },

    error: function (response) {
      console.log('GET /animals fail. No books could be retrieved!');
    },
  });
}

function postAnimal() {
  event.preventDefault();

  var animal = {};
  console.log(animal);
  $.each($('#animal').serializeArray(), function (i, field) {
    animal[field.name] = field.value;
  });

  $.ajax({
    type: 'POST',
    url: '/animals',
    data: animal,
    success: function () {
      console.log('POST /animals works!');
      $('#animals').empty();
      getAnimals();
    },

    error: function (response) {
      console.log('POST /animals does not work...');
    },
  });
}
