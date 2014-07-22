(function() {

  'use strict';

  var APP = {};

  var Grid = (function() {

    var Grid = function() {};

    Grid.prototype.getRandomCell = function() {
      var gridCells = document.querySelectorAll('.grid__cell'),
        randomX = Math.floor(Math.random() * 50) + 1,
        randomY = Math.floor(Math.random() * 50) + 1,
        randomCell = [ randomX, randomY ];
      return randomCell;
    };

    Grid.prototype.getCell = function(coords) {
      var gridCells = document.querySelectorAll('.grid__cell'),
        xPosition = coords[0],
        yPosition = coords[1],
        gridRow = (yPosition - 1) * 50,
        gridCell = gridRow + (xPosition - 1),
        selected = gridCells[gridCell];

      selected.classList.add('blue');

      return selected;
    };
    return Grid;
  })();


  var Player = (function() {

    var Player = function() {
      // this.myPublicInstanceProp = 0;
      // this._score = 0;

      createPlayer();
      bindEvents();
      APP.pugpig.position = [1,2];
      // var coords = [50,20];
      // APP.grid.getCell( coords );
    };

    function getPlayerStartLocation() {
      var randomCell = APP.grid.getRandomCell(),
        startLocation = APP.grid.getCell( randomCell );
      setCurrentLocation(randomCell);
      return startLocation;
    }


    function setCurrentLocation(currentPosition){
      console.log (currentPosition);
      //APP.pugpig.position = currentPosition;
      //APP.this.position = currentPosition;
      //console.log (APP.player.position);
      //return currentPosition;
    }

    // function getCurrentLocation() {
    //   console.log(currentPosition[0], currentPosition[1]);
    // }

    function movePlayer( x, y ) {
      var oldLocation = currentLocation(),
        oldX = oldLocation[0],
        oldY = oldLocation[1],
        newX = '',
        newY = '',
        newLocation;

      console.log('old location:' + oldLocation);

      if (x !== '0') {
        newX = oldX + x;
      }
      if (y !== '0') {
        newY = oldY + y;
      }

      newLocation = [ newX, newY ];
      //currentLocation( newLocation );
    }

    // function updateLocation( xIncrement, yIncrement) {
    //   // increments can be 1, 0 or -1 depending on direction of movement
    //   if (xIncrement == 1)

    //   //return ( xIncrement, yIncrement);
    // }

    function createPlayer() {
      var startLocation = getPlayerStartLocation(),
        playerMarkUp = '<div class="player"></div>';
      startLocation.innerHTML = playerMarkUp;
    }


// left arrow   37
// up arrow   38
// right arrow  39
// down arrow   40
    function bindEvents() {
      document.addEventListener( 'keyup', function(e) {
        if (e.keyCode == '38') {
          movePlayer( '0', '1' );
          console.log('move up!');
        }
      });
    }

    // Player.prototype.incrementScore = function() {
    //   score++;
    // };

    // Player.prototype.getScore = function() {
    //   return score;
    // };

    // function updatePlayerLocation() {

    // }

    // Player.prototype.getLocation = function() {
    //   playerLocation
    // }

    return Player;

  })();

  APP.grid = new Grid();
  APP.pugpig = new Player();
  APP.pugpig.position = '';
  //APP.pugpig.position = [34,75];
  console.log(APP.pugpig.position);

})();




    // game
    // constructor: new game:
    // creates new player - in random square
    // creates a few magazines in random squares
    // starts tick function which checks in every half second to check the state of the game

    // player
    // constructor
    // moves from square to square using arrow keys

    // magazine
    // constructor

    // score
    // updates when player and magazine overlap


    // TODO NEXT
    // need state on player, so that I know where it should move from and to on key up function
    // player position on the app element that I update when the events


  // 'use strict';

  // var Person = (function() {

  //   var Person = function() {
  //     this.myPublicInstanceProp = 0;
  //     this._score = 0;
  //   };


  //   Person.prototype.incrementScore = function(first_argument) {
  //     score++;
  //   };

  //   Person.prototype.getScore = function() {
  //     return score;
  //   }

  //   Person.prototype.destroy = function() {
  //     this.destructor();
  //   }

  //   return Person;

  // })();

  // var mark = new Person();



