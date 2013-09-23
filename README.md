Project 1 - Game of Life
===

To see the program in action, open index.html. The web page shows the initial configuration. You can start seeing
the progression of the board by clicking the start button. The board may be paused at any time by clicking the
stop button.

The dropdown menu gives the possible initial configurations and can be changed when the board is paused.
* Cells start off alive randomly with probability 0.1
* Cells start off alive randomly with probability 0.2
* The 4 oscillators described by Wikipedia (http://en.wikipedia.org/wiki/Conway's_Game_of_Life#Examples_of_patterns)
are shown
* A blank starting grid; useful for playing with your own creations.

In addition, the board itself is click-able when paused. Clicking on any cell toggles it between alive and dead.
Thus, you may pause the board at any configuration and change it, then resume play.

File structure
---
* index.js is the main entry point of the application. It creates a Board object with default parameters
and passes control onto the Board Controller.
* board.js holds the board data (the Model - which cells are alive or dead) and allows you to get the configuration at the
next timestep with rules that are passed in
* board-control.js holds the board Controller. This contains functions for attaching handlers to the buttons, the
dropdown menu, and each cell in the grid. The Controller is also responsible for starting and pausing the animation
as well as loading different inital states.
* board-view.js holds the board View. This is the interface between the Controller and the actual DOM manipulation.
* rules.js has the rules of Game of Life. Given a cell's information (number of neighbors and currently alive/dead)
it tells us whether the cell should be alive or dead in the next timestep
* initialize.js contains the initialization logic. It gives the lists of initial conditions for the random,
oscillator, and blank grid cases.
* util.js contains various utility functions taken from various sources.


Design challenges
---
Design challenges are described in design-challenges.md


Testing
---
Unit tests were written in QUnit for Board and Rules. These test functions individually on various inputs and
are repeatable.

The Controller and View deal with attaching handlers to DOM elements and rendering the board state in the
browser. Thus, instead of writing QUnit tests, I checked to make sure the graphical output was reasonable. It was
very useful to have click-able cells, since I could create new test cases on the fly.
