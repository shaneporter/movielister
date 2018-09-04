# Movie listings

## Overview

This is a little React app, using create-react-app as a starting point, that uses the TMDb API to display a list of 'now showing movies'. The user can filter the movies by genre and rating.

The following APIs are used:

- TMDb Movies Now Playing;
- TMDb Movie Genres;
- TMDb Image API.

The user filters the movie results using the following:

- Minimum Rating select with values ranging from 0 to 10 with a step of 0.5. Defaults to 3;
- Multiple Genres, derived from the genres from the returned movies. Defaults to none selected. For each selected genre, only those movies with **all** of those genres will be shown.

For the results:

- Each shows a poster image, title and genres;
- Movies are ordered by popularity in descending order (most popular first);

## Implementation

As previously mentioned, this React app was bootstrapped using create-react-app. Despite the size of the app, it also demonstrates Redux, React-redux and Redux-thunk.

For some level of simplicity, I kept the reducer count to just 1; an option would be to use a couple of reducers, 1 for the Movies, 1 for the Genres - and use combineReducers to 'merge' the state.

**At present, there are no additional Jest tests, but I am working on that**
