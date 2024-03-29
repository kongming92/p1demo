1. Separation of concerns between drawing and game code

	As discussed many times on the project page and Piazza, the drawing code should not be deeply embedded in the game code. When designing this project, I made sure that none of the information about the behavior of the game (such as Board, Rules) contained any drawing code.

	The only time any drawing code is called is in index.js, where the drawing function is called every timestep. The drawing function is basically standalone, takes a Board object and only requres the isAlive(x, y) function. Thus, the internal representation of the Board and other parts of the code can change, and the drawing function will be unaffected.


2. Separation of concerns between Board (game state) and Rules (change of game state)

	It seemed reasonable to make the rules that the game operates under to be decoupled from the game state itself. As suggested in a Piazza thread, it would be nice to be able make the rules modular so that it can be swapped for a different set of rules.

	There were two things that I considered: passing the entire board to a rules function and have rules return the new board, or passing rules to the board. I decided that rules should be passed to the board. This way, we can be certain that rules do not need to know the internals of the board. If the rules function had to return a board, I would have to construct the board in the rules function, instead of doing it where the code already existed with the board.

	With the way that it is implemented now, the board just expects rules to have a isAliveNext function. Thus it is very easy to swap the rules for a different set of rules just by modifying that function, while no other code for the board needs to change.


3. What functions to expose for the board

	The necessary functions to expose were isAlive and getNewBoardState. I also considered exposing a function that would return a copy of the board, but ultimately decided against it. It is not necessary now, since everything deals with the board one cell at a time, so the isAlive function can be used to "recreate" the current state of the board. For example, in the drawing code, the drawing function iterates square by square, and drawing only if isAlive(x,y) = true.


4. Immutability of the board

	There were two main reasons for making the board immutable. The first is that the board becomes a lot simpler. All anyone needs to know is that they can read whether a cell is alive or not (via isAlive) and get the next timestep (via getNewBoardState). I don't have to worry about the board changing when I'm trying to make the new board.

	The second (more practical) reason is that the changes only depend on the current state of the board. So it would be very difficult to change a board "in place" since some of the information will be updated and some will be old, and we don't want the new changes to factor into further changes during the same timestep. Thus, all changes are recorded on a new board, which is returned. While having an immutable board means that I am creating a new board object every timestep and is less space efficient, it makes thinking about the code and ensuring its correctness a lot easier.