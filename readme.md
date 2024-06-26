# Habits

## Summary
This is a simple habit tracking app. Users can sign up for accounts, create habits, track habit completions (once per day for now) and make changes to habits and habit completions. The app uses EJS with one Javascript element for rendering the habit summary table which I thought would be too painful to do in EJS. It runs on an Azure Web App and uses Cosmos DB with the Mongo API for data storage. For authentication I very heavily relied on [this article](https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2), everything else is my own work. 

Link to app: [Habits](https://habits.konthecat.com/habits)

## Initial Plans

The initial wireframes for the project are here: [wireframes](wireframes.pdf). The only substantial departure from the core design is switching to a table that shows all the habits against a single span of dates but if we are being honest that departure was probably intended from the start, I just knew that the list would be easier to create at the initial establishment of concept stage of the project.

These were the initial user stories, all of which are implemented: 
As a regular user, I want to be see a page that shows my habits at a glance.
As a regular user, I want to be able to enter new habits.
As a regular user, I want to be able to edit existing habits.
As a regular user, I want to be able to enter new habit completions.
As a regular user, I want to be able to delete a habit.

## Future Plans

1. Add the ability to have a goal for a habit, and have the app compare the actual completions vs. that goal.
2. Potentially add a social element to the app, allowing for sharing and comment threads on habits and completions.
3. Have multiple completions per day.
4. It would be nice to have an admin page for user management, and to implement an authentication mechanism more robust and consistent than what I have now.