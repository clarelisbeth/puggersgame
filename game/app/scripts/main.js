(function() {

  'use strict';


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

// ***********************

// Game

// Each object in the games has it's own location on it

// Games tells the grid what should happen

// Game asks the grid for a startLocation, then sets the content to be the player
// Game can then create other objects and set the start location of them

// Have a separate function that gets a location and an object passed into it, which then updates the HTML

// There is an init function on the game which is what gets called when the games starts
// This starts a tick function which checks the location of the objects within the game

// Currently the new HTML overwrites the other so that they are never in the same location!!!

// ***********************

// 12th Aug:
// Don't let the player move outside of the boundary walls
// Get more than one piece of loot going

// ***********************

// 19th Aug
// Get the pieces of loot moving around in random directions
// put in fences that the loot and player cannot get through

// ***********************


// 2nd September
// create a random number of fences between 3 and 6, with a random number of blocks between 2 and 10

// ***********************

// 9th September
// create a predator!!
// create the object
// move in the direction of the Player - check the location and move towards it
// make the fences more evenly distributed and maybe a bit straighter?
// make it so that the loot and predator can't run into the fences

// ***********************

  var Grid = (function() {

    var Grid = function() {};

    Grid.prototype.getRandomCell = function() {
      var randomX = Math.floor(Math.random() * 25) + 1,
        randomY = Math.floor(Math.random() * 25) + 1,
        randomCell = [ randomX, randomY ];
      return randomCell;
    };

    Grid.prototype.getCell = function(coords) {
      var gridCells = document.querySelectorAll('.grid__cell'),
        xPosition = coords[0],
        yPosition = coords[1],
        gridRow = (yPosition - 1) * 25,
        gridCell = gridRow + (xPosition - 1),
        selected = gridCells[gridCell];
      return selected;

    };

    Grid.prototype.setCellContent = function( location, instance ) {
      instance.location = location;
      Game.grid.getCell(location).classList.add(instance.templateClass);
    };

    Grid.prototype.changeLootLocation = function(lootPiece) {
      var  x = Math.floor(Math.random() * 3) - 1,
        y = Math.floor(Math.random() * 3) - 1;
      Game.grid.findNewItemLocation( x, y, lootPiece );
    };

    Grid.prototype.updateItemLocation = function (oldLocation, newLocation, item, itemClass) {
      item.location = newLocation;
      Game.grid.getCell( oldLocation ).classList.remove(itemClass);
      Game.grid.getCell( newLocation ).classList.add(itemClass);
    };

    Grid.prototype.findNewItemLocation = function ( x, y, item ) {

      var oldLocation = item.location,
        oldX = oldLocation[0],
        oldY = oldLocation[1],
        newX = oldX,
        newY = oldY,
        newLocation = '';

      if ( x !== 0 ) {
        newX = oldX + x;
      }
      if ( y !== 0 ) {
        newY = oldY + y;
      }
      if ((newY > 25) || (newY < 1)) {
        newY = oldY;
      }
      if ((newX > 25) || (newX < 1)) {
        newX = oldX;
      }

      newLocation = [ newX, newY ];
      if (Game.grid.getCell(newLocation).classList.contains('fence') ) {
        newLocation = oldLocation;
      }

      Game.grid.updateItemLocation( oldLocation, newLocation, item, item.templateClass );
    };

    return Grid;

  })();


  var Player = (function() {

    var Player = function() {
      this.templateClass = 'player';
      bindEvents();
      this.score = 0;
    };

    function bindEvents() {
      document.addEventListener( 'keydown', function(e) {
        if (e.keyCode === 38) {
          Game.grid.findNewItemLocation( 0, -1, Game.player );
        }
        if (e.keyCode === 37) {
          Game.grid.findNewItemLocation( -1, 0, Game.player );
        }
        if (e.keyCode === 39) {
          Game.grid.findNewItemLocation( 1, 0, Game.player );
        }
        if (e.keyCode === 40) {
          Game.grid.findNewItemLocation( 0, 1, Game.player );
        }
      });
    }

    Player.prototype.incrementScore = function() {
      this.score++;
      // document.querySelector('.score').innerHTML = this.score;
    };

    return Player;

  })();


  var Loot = (function() {
    var Loot = function() {
      this.templateClass = 'loot';
    };
    return Loot;

  })();

  var Predator = (function() {

    var Predator = function() {
      this.templateClass = 'predator';
    };

    Predator.prototype.predatorChase = function(){
      var playerLocX = Game.player.location[0],
        playerLocY = Game.player.location[1],
        predatorLocX = this.location[0],
        predatorLocY = this.location[1],
        x,
        y;
      if (playerLocX < predatorLocX) {
        x =  -1;
      } else if  (playerLocX > predatorLocX) {
        x = 1;
      } else {
        x = 0;
      }
      if (playerLocY < predatorLocY){
        y = -1;
      } else if (playerLocY > predatorLocY){
        y = 1;
      } else {
        y = 0;
      }
      Game.grid.findNewItemLocation( x, y, Game.predator );
    };
    return Predator;
  })();

  var Fence = (function() {
    var Fence = function() {
      this.templateClass = 'fence';
    };
    return Fence;
  })();



  var Game = {

    grid: null,
    player: null,
    loot: null,
    fence: null,
    predator: null,

    createLoot: function(){
      var arr = ['a','b','c'],
        lootArr = arr.map( function(){
          return new Loot();
        } );
      return lootArr;
    },

    createFence: function(){
      // create a random number of fences, with a random number of blocks
      var numberOfFences = (Math.floor(Math.random() * 4)) + 4,
        fenceArr = [];

      fenceArr.length = numberOfFences;

      for (var i=0; i < numberOfFences; i++) {

        var fenceLength = (Math.floor(Math.random() * 10)) + 5,
          newFence = [],
          fenceStartLocation;

        newFence.length = fenceLength;
        Game.setStartLocation(newFence);
        fenceStartLocation = newFence.location;

        for (var j=1; j < fenceLength; j++) {
          var index = (Math.floor(Math.random() * 2));
          newFence[j] = {};
          newFence[j].location = fenceStartLocation;
          if (newFence[j].location[index] + 1 < 26) {
            newFence[j].location[index] = newFence[j].location[index] + 1;
            Game.grid.getCell( newFence[j].location ).classList.add('fence');
          }
        }
        fenceArr.push(newFence);
      }
      return fenceArr;
    },

    setStartLocation: function( gameElement ) {
      var randomCell = this.grid.getRandomCell();
      this.grid.setCellContent( randomCell, gameElement );
    },

    setLootStartLocations: function(){

      // var lootWithLocation = this.loot.map(function(current){
      //   return Game.setStartLocation( current );
      // });
      // return lootWithLocation;

      this.loot.forEach(function(current){
        this.setStartLocation( current );
      }, this);

    },

    showScore: function() {
      var score = this.player.score;
      document.querySelector('.score').innerHTML = score;
    },

    init: function() {
      this.grid = new Grid();
      this.player = new Player();
      this.predator = new Predator();
      this.loot = this.createLoot();
      this.fence = this.createFence();
      this.setStartLocation( this.player );
      this.setStartLocation( this.predator );
      this.setLootStartLocations();
      this.showScore();
      this.gameLoop = setInterval( this.tick.bind( this ), 300 );
    },
    // haveCollided: function( x, y ) {

    // }
    tick: function() {
      // console.log(Game.player.location + ' ' + Game.predator.location);
      var numLoot = Game.loot.length,
        randomCell;

      // move the predator in the direction of the Player
      Game.predator.predatorChase();

      if ( (Game.player.location[0]) === (Game.predator.location[0]) && (Game.player.location[1]) === (Game.predator.location[1]) ) {
        alert('FAILLLLLL HHAHAHAHAHHAAAA!!!!!');
        clearInterval( this.gameLoop );
      }


      for (var i=0; i < numLoot; i++) {
        Game.grid.changeLootLocation(Game.loot[i]);
        if ( (Game.player.location[0]) === (Game.loot[i].location[0]) && (Game.player.location[1]) === (Game.loot[i].location[1]) ) {
          Game.player.incrementScore();
          Game.showScore();

          // put Loot back in a random place - this should also change the image (when I get round to them being images!)
          Game.grid.getCell( Game.loot[i].location ).classList.remove('loot');
          randomCell = Game.grid.getRandomCell();
          Game.loot[i].location = randomCell;
          Game.grid.setCellContent( randomCell, Game.loot[i] );


        }
      }

    }
  };

  document.addEventListener('DOMContentLoaded', Game.init.bind( Game ));

})();
























