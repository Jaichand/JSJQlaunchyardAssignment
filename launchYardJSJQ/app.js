    var listPeople = [];
    $.get("product.json").done(function(data) {
      listPeople = JSON.parse(data);
      listPeople.sort(SortByName);
      iterateEmp('');
    });

    function SortByName(a, b) {
      var aName = a.name.toLowerCase();
      var bName = b.name.toLowerCase();
      return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
    }

    function getEmpRow(title, designation, img) {
      return '<div id="box">' + '<div id="img" >' +
        '<img id="avatar" src="' + img + '">' + '</div>' +
        '<div id="contain">' + '<h3>' + title + '</h3 >' + '<p>' +
        designation + '</p>' + '</div>' + '</div>';
    }

    function iterateEmp(searchString) {
      listPeople.sort(SortByName);
      if (searchString) searchString = searchString.value;
      var numMatched = 0;
      var $empListDiv = $("#empList");
      $empListDiv.empty();
      for (var i = 0; i < listPeople.length; i++) {
        if (listPeople[i].name.search(new RegExp(searchString, 'i')) !=
          -1) {
          numMatched++;
          $empListDiv.append(getEmpRow(listPeople[i].name, listPeople[i]
            .designation, listPeople[i].avatar));
        }
      }
      if (numMatched == 0) {
        $input = $('<input>').attr('id', 'inputDesg');
        $input.attr('placeholder', 'Type Designation');
        $button = $('<button>').text('Add');
        $button.click(function() {
          var name = $('#name').val();
          var designation = $('#inputDesg').val();
          listPeople.unshift({
            name: name,
            designation: designation,
            avatar: 'male.jpeg'
          });
          iterateEmp();
        });
        $empListDiv.append($input);
        $empListDiv.append($button);
      }
    }