# Uncountable Dataset Visualization

This repo contains my solution for the dataset visualization take home assignment.
In my solution, I created 3 separate views to visualize the data:

1. A bar chart that contains all of the experiments, and certain features of interest can be selected and sorted by.
2. A group of line charts for each of the experiment's attributes.
3. A radial chart to explore the features of one specific experiment.

For this solution, I focused on the user's experience, trying to provide a multitude of options to visualize this data, while keeping the design simple and intuitive for the user. 

Moreover, I also took into account some of the software engineering best practices for building this webapp:

1. I decided to use Typescript over plain Javascript in order to guarantee type safety and a more robust codebase.
2. Each view is defined by a different component, to remove dependecies in between each view.
3. Initially, I queried the data directly from the given json, but I decided to create a small SQL database insted for a more stable and scalable representation of the data. This also allows us to potentially add more data in the future easily, and to make use of SQL's features when querying the data.
4. Finally, I created a python api server using Flask, which I used to query this database and get all of my data. By using this api, we move all of the processing of the data on the backend and we decouple our front and backend.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `python3 server.py`

Runs the backend api server.
Open on [http://localhost:3001](http://localhost:3001)

The database that this server uses is included in the folder under experiments.db
