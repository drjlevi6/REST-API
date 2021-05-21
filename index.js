const express = require('express');
const morgan = require('morgan');
const app = express();

let users = [
	{
		username: "User A",
	},
	{
		username: "User B",
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

// As defined in your project brief (PDF), the REST API must do the 
//	following:
// 
// x Return data (description, genre, director, image URL, whether it’s 
// x	featured or not) about a single movie by title to the user
// x Return data about a genre (description) by name/title (e.g., 
// x	“Thriller”)
app.get('/movies/genre/:genre', (req, res) => { //attaches to req.params
	const genre = req.params.genre;
	const filteredMovies = topMovies.filter(movie => {
		return movie.genre === genre;
	})
	res.json(filteredMovies);
})
// Return data about a director (bio, birth year, death year) by name
app.get('/movies/director/:name', (req, res) => {
	console.log(req.params);
	const directorName = req.params.name;
	const byDirector = topMovies.filter(movie => {
		return movie.director.name === directorName;
	} )
	res.json(byDirector);
})

//  X Allow users to update their user info (username) PUT
// Allow users to add a movie to their list of favorites (showing only 
//		a text that a movie has been added—more on this later) POST
// Allow users to remove a movie from their list of favorites (showing DELETE
//	only a text that a movie has been removed—more on this later)
// Allow existing users to deregister (showing only a text that a user DELETE
//	email has been removed—more on this later)

// GET requests
// Get the student data base
app.get('/users', (req, res) => {
	res.send('Successful GET request returning data on all the users');
  });

// Following request returns the app's list of current top movies
app.get('/movies', (req, res) => {
	res.json(topMovies);
});

//	Following request returns data about a single movie, selected by title by the user; 
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
	res.send('Welcome to Jonathan Levi\'s book club!');
});

app.get('/documentation', (req, res) => {
	res.sendFile('public/documentation.html', { root: __dirname });
});

//POST requests
// Allow new users to register
app.post('/users', (req, res) => {
	const userName = { username: req.body.username, }
	users.push(userName);
	res.send(users);
});

// PUT request:
// Allow users to update their user info (currently username only)
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


app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
