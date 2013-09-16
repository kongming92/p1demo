Project 1 - Game of Life
===

To see the program in action, open index.html. The web page shows the initial configuration on the top
and the botton canvas shows the evolution in action.

Each time index.html is loaded, the board starts off with a random configuration. You can also always display
the 4 oscillators described by Wikipedia (http://en.wikipedia.org/wiki/Conway's_Game_of_Life#Examples_of_patterns)
by visiting index.html?oscillator=true

The Javascript is broken up into index.js, board.js, rules.js and initialize.js.
- index.js is the main entry point of the application, initializes the board, and draws the configuration
to the screen at every timestep.
- board.js holds the board data (which cells are alive or dead) and allows you to get the configuration at the
next timestep with rules that are passed in
- rules.js has the rules of Game of Life. Given a cell's information (number of neighbors and currently alive/dead)
it tells us whether the cell should be alive or dead in the next timestep
- initialize.js contains the initialization logic. It parses the url for the ?oscillator=true string, and either
initializes the board with those 4 oscillators or a random distribution of live cells.

In addition, graphics.js is used as given and util.js contains utility functions from lecture and a url parser
taken from the internet.


DESIGN CHALLENGES

Design challenges are described in design-challenges.txt


TESTING

Unit tests were written in QUnit for Board and Rules. These test functions individually on various inputs and
are repeatable.

The code in initialize.js mostly serves to randomly generate living cells or load in a specific
configuration, and the code in index.js deals with drawing the board information to the screen. Thus there were no
QUnit tests for those. Instead, I checked to make sure that the graphical output was reasonable (by comparing
the output for the oscillators to wikipedia, for example).