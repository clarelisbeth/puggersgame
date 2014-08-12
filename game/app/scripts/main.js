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

// TODO:
// Get the pieces of loot moving around in random directions
//


  var Game = {};

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
        if (e.keyCode == '38') {
          updatePlayerLocation( 0, -1 );
        }
        if (e.keyCode == '37') {
          updatePlayerLocation( -1, 0 );
        }
        if (e.keyCode == '39') {
          updatePlayerLocation( 1, 0 );
        }
        if (e.keyCode == '40') {
          updatePlayerLocation( 0, 1 );
        }
      });
    }

    function updatePlayerLocation( x, y ) {
      var oldLocation = Game.player.location,
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
      Game.player.location = newLocation;
      Game.grid.getCell( oldLocation ).classList.remove('player');
      Game.grid.getCell( newLocation ).classList.add('player');
    }

    Player.prototype.incrementScore = function() {
      this.score++;
      document.querySelector('.score').innerHTML = this.score;
      // console.log(this.score);
    };

    return Player;

  })();


  var Loot = (function() {
    var Loot = function() {
      this.templateClass = 'loot';
    };
    return Loot;

  })();

  Game = {

    grid: null,
    player: null,
    loot: null,

    createLoot: function(){
      var arr = ['a','b','c'],
        lootArr = arr.map( function(){
          return new Loot();
        } );
      return lootArr;
    },

    setStartLocation: function( gameElement ) {
      var randomCell = this.grid.getRandomCell();
      this.grid.setCellContent( randomCell, gameElement );
    },

    setLootStartLocations: function(){

      var lootWithLocation = this.loot.map(function(current){
        return Game.setStartLocation( current );
      });
      return lootWithLocation;

    },

    showScore: function( player ) {
      var score = player.score;
      document.querySelector('.score').innerHTML = score;
    },

    init: function() {
      this.grid = new Grid();
      this.player = new Player();
      this.loot = this.createLoot();
      this.setStartLocation( this.player );
      this.setLootStartLocations();
      this.showScore( this.player );
      setInterval( this.tick, 500 );
    },

    tick: function() {

      var numLoot = Game.loot.length;

      for (var i=0; i < numLoot; i++) {

        if ( (Game.player.location[0]) === (Game.loot[i].location[0]) && (Game.player.location[1]) === (Game.loot[i].location[1]) ) {
          Game.player.incrementScore();
          Game.grid.getCell( Game.loot[i].location ).classList.remove('loot');

          var randomCell = Game.grid.getRandomCell();
          Game.loot[i].location = randomCell;
          Game.grid.setCellContent( randomCell, Game.loot[i] );
        }
      }

    }

  };

  Game.init();

})();
























