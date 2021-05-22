const express = require('express');
const morgan = require('morgan');
const app = express();

let users = [ // needs username, password, email, date of birth
	{
		username: "UserA",
		password: "UserAPassword",
		email: "UserA@gmail.com",
		DOB: "01/01/2000"
	},
	{
		username: "UserB",
		password: "UserBPassword",
		email: "UserB@gmail.com",
		DOB: "01/01/2000"
},
]

let topMovies = [
	{
		name: "Under Seige",
		description: "Action Thriller",
		genre: "Action",
		director: {
			name: "Andrew Davis",
			bio: "https://en.wikipedia.org/wiki/Andrew_Davis",
			birth_year: "1946",
			death_year: "-",
		},
		image_URL: "https://upload.wikimedia.org/wikipedia/en/3/3d/StevenSeagalUnderSiege_cover.jpg",
	},
	{
		name: "Schitt’s Creek",
		description: "Sitcom",
		genre: "Comedy",
		director: {
			name: "Eugene Levy",
			bio: "https://en.wikipedia.org/wiki/Eugene_Levy",
			birth_year: "1946",
			death_year: "-",
		},
		image_URL: "https://en.wikipedia.org/wiki/File:Schitt%27s_Creek_logo.png",
	},
	{
		name: "The Last Dance",
		description: "Miniseries",
		genre: "Documentary",
		director: {
			name: "Jason Hehir ",
			bio: "https://www.imdb.com/name/nm2629370/bio",
			birth_year: "1976",
			death_year: "-",
			},
		image_URL: "https://en.wikipedia.org/wiki/File:The_Last_Dance_2020.jpg",
	},
	{
		name: "The Queen’s Gambit",
		description: "Miniseries",
		genre: "Drama",
		director: {
			name: "Scott Frank",
			bio: "https://en.wikipedia.org/wiki/Scott_Frank",
			birth_year: "1960",
			death_year: "-",
	 },
		image_URL: "https://upload.wikimedia.org/wikipedia/en/1/12/The_Queen%27s_Gambit_%28miniseries%29.png",
	},
	{
		name: "Training Day",
		description: "Crime Thriller",
		genre: "Crime",
		director: {
			name: "Antoine Fuqua",
			bio: "https://en.wikipedia.org/wiki/Antoine_Fuqua",
			birth_year: "1966",
			death_year: "-",
		},
		image_URL: "https://upload.wikimedia.org/wikipedia/en/b/b3/Training_Day_Poster.jpg",
	},
	{
		name: "What's Eating Gilbert Grape",
		description: "Period Drama",
		genre: "Drama",
		director: {
			name: "Lasse Hallström",
			bio: "https://en.wikipedia.org/wiki/Lasse_Hallstr%C3%B6m",
			birth_year: "1946",
			death_year: "-",
		},
		image_URL: "https://upload.wikimedia.org/wikipedia/en/5/5c/What%27s_Eating_Gilbert_Grape_poster.png",
	},
	{
		name: "The Whole Truth",
		description: "Thriller",
		genre: "Drama",
		director: {
			name: "Courtney Hunt",
			bio: "https://en.wikipedia.org/wiki/Courtney_Hunt",
			birth_year: "1964",
			death_year: "-",
		},
		image_URL: "https://upload.wikimedia.org/wikipedia/en/a/a8/TheWholeTruth_2016poster.jpg",
	},
	{
		description: "Musical Drama",
		name: "My Fair Lady",
		genre: "Romance",
		director: {
			name: "George Cukor",
			bio: "https://en.wikipedia.org/wiki/George_Cukor",
			birth_year: "1899",
			death_year: "1923",
		},
		image_URL: "https://upload.wikimedia.org/wikipedia/en/d/d5/My_fair_lady_poster.jpg",
	},
	{
		name: "Ma Rainey’s Black Bottom",
		description: "Music",
		genre: "Drama",
		director: {
			name: "George C. Wolfe",
			bio: "https://en.wikipedia.org/wiki/George_C._Wolfe",
			birth_year: "1954",
			death_year: "-",
		},
		image_URL: "https://upload.wikimedia.org/wikipedia/en/1/19/Stranger_Things_Poster.jpg",
	},
	{
		name: "Nomadland",
		description: "Period Drama",
		genre: "Drama",
		director: {
			name: "Chloé Zhao",
			bio: "https://en.wikipedia.org/wiki/Chlo%C3%A9_Zhao",
			birth_year: "1982",
			death_year: "-",
		},
		image_URL: "https://en.wikipedia.org/wiki/Nomadland_(film)#/media/File:Nomadland_poster.jpeg",
	}
];

app.use(express.json());	// never forget this!!
app.use(morgan('common'));
app.use(express.static('public'));
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

// GET requests:
// Get a movie’s genre
app.get('/movies/genre/:genre', (req, res) => { //attaches to req.params
	const genre = req.params.genre;
	const filteredMovies = topMovies.filter(movie => {
		return movie.genre === genre;
	})
	res.json(filteredMovies);
})

// Get data about a director (bio, birth year, death year) by name
app.get('/movies/director/:name', (req, res) => {
	console.log(req.params);
	const directorName = req.params.name;
	const byDirector = topMovies.filter(movie => {
		return movie.director.name === directorName;
	} )
	res.json(byDirector);
})

// Get the user data base
app.get('/users', (req, res) => {
	res.json(users);
  });

// Get entire list of current top movies
app.get('/movies', (req, res) => {
	res.json(topMovies);
});

// Get data about a single movie, selected by title by the user: 
// data comprises description, genre, director, image URL, and
// whether movie’s featured or not.
app.get('/movies/:name', (req, res) => {
	let movieToFind = req.params.name
	let movieData = topMovies.find(item => {
		return item.name === movieToFind;
	})
	res.json(movieData);
})

app.get('/', (req, res) => {
	res.send('Welcome to Jonathan Levi\'s movie app!');
});

app.get('/documentation', (req, res) => {
	res.sendFile('public/documentation.html', { root: __dirname });
});

//POST requests
// Allow new users to register
app.post('/users/:username', (req, res) => {
	console.log("New User:",req.body.username);
	const userName = { username: req.body.username, }
	users.push(userName);
	res.send(users);
});

// Allow registered user to add to list of favorite movies
app.post('/users/:username/:favmovie', (req, res) => {
	const userName = req.params.username,
		favMovie = req.params.favmovie;
	console.log('User', req.params.username, 'entered favorite movie “' + favMovie + '”.');
	res.status(404).send('User ' + userName + ' will add favorite movie “' + favMovie + '”.');
})

// PUT request:
// Allow user to update their user info (currently username only)
app.put('/users/:username/:newname', (req, res) => {
	const oldName = req.params.username,
		newName = req.params.newname;
	const user = users.find(user => {
		return user.username === req.params.username;
	});
	if(user) {
		res.status(201).send(user);
	} else {
		res.status(404).send("User with name “" + oldName + "” was not found.");
	}	
});

// DELETE requests:
// Allow user to remove a movie from list of favorites (currently message only)
app.delete('/users/:username/:favmovie', (req, res) => {
	const userName = req.params.username,
		favMovie = req.params.favmovie;
	console.log(userName, 'will delete favorite movie “' + favMovie + '”');
	res.status(201).send(userName + ' will delete favorite movie “' + favMovie + '”.');
});

// Delete a user (user enters name; message also lists email)
app.delete('/users/:username/', (req, res) => {
	const userName = req.params.username;
	const user = users.find(user => {
		return user.username === userName;
	});
	if(user) {
		res.status(201).send('User “' + user.username + '” with email “' + user.email +
			'” will be deleted.');
	} else {
		res.status(404).send("User “" + userName + "” wasn’t found.");
	}	
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
