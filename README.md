How I Built the HMCTS Task Manager

What I created:
I built a task management app where caseworkers can create, view, update, and delete tasks.

How I store the data:
I'm using React's `useState` to keep all tasks in an array in memory. Each task I create gets a unique ID, title, description, status, and due date.

The main functions I wrote:

- **createTask()** - First, I check if the user filled in the title and due date. If they did, I add the new task to my tasks array.
- **deleteTask()** - When someone clicks delete, I show them a confirmation modal I built.
- **confirmDelete()** - Once they confirm, I use `filter()` to create a new array without that task.
- **updateStatus()** - I use `map()` to loop through all tasks and update just the one that matches the ID.
- **searchTask()** - I use `find()` to look up a specific task by its ID.

How the screen updates:
Whenever I update the state (add/delete/modify tasks), React automatically refreshes what's displayed on screen.

The dashboard:
I count tasks by status by filtering my array - for example, counting how many have "To Do" status.

Validation I added:
If users try creating a task without required fields, I make the input borders red and show error messages.

Why I use filter/map:
React needs a completely new array to notice changes, so I create new copies instead of changing the original array directly.
