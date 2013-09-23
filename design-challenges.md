Design Challenges
---

1. Model-view-controller and separating the DOM manipulation from the controller logic.
	When I first wrote the DOM code, it was one large chunk wrapped around the $(document).ready function. As I thought about how to make the code more modular, there were a few alternatives considered:
	* Place all code that touches DOM elements into the view. This would have taken the controller's createBoard function and put it into the view. The biggest drawback to this approach was that creating the board, and attaching handlers to it, requires access to the model (the board object). Since each iteration of the game produces a new board object, it became fairly messy. It also didn't make sense for the DOM manipulation code to directly touch the model code.
	* Place the handlers (such as the select and button click handlers) in a separate file. Unfortunately, similar to above, the code ulimately relied on the board (for example, takeStep requires the board object).
	* The way that it is done now has the View dealing only with DOM element. The Controller creates the elements and passes them to the View, which renders the elements. This is similar to how I used the graphics library in part 1: my code checked if the cell was alive (via the Model) and then asked the View code to display that.
	Unfortunately, this doesn't seem to be perfect. In particular, there is still DOM code in the click listeners when creating the <div> elements. Creating the elements seemed to be appropriate for the Controller to do, but since the handlers should be attached right as the element is created, I decided to leave the few lines of code that refer to the <div> class attribute in the Controller.
2. Behavior - everything is locked down while the animation is running
	Ultimately, I believe that the decision to allow changing inital conditions and clicking the board to toggle alive/dead only while the board is paused made the UI simpler and programming easier. I tried to make the board click-able while the animation was running, but it was very difficult to achieve meaningful results, since the user did not have enough time to create a pattern before the next time step killed off some of the earlier clicked cells. By forcing the user to pause, it creates a clear separation between when the board is "editable" and when it is not, which I thought made the UI a lot more straightforward.
3. Absolute positioning vs. inline-divs
	One alternative to the way that I laid out my HTML would be to give each div element an absolute position. This is not difficult to achieve but made the Javascript a lot messier, since I had to set CSS attributes for every cell. The two main problems I ran into with my solution were
	* Shrinking the window made each row split into multiple rows. This was fixed with the CSS min-width attribute.
	* By default the <div> elements space themselves vertically. I adjusted this with line-height: 0, but it took awhile before realizing that this would work.
	Another option would have been to create a container div, and to make all cell div's float left, causing them to form a line and then stack. However, this made the CSS more confusing, since I would have to add up the widths of all cells + borders and hard-code the width to the container. (Also, not sure if different browsers treat borders differently in width calculations)



