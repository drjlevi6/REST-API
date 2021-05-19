const express = require('express'),
	morgan = require('morgan');
const app = express();

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

app.use(morgan('common'));
app.use(express.static('public'));
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});


// GET requests

// Following request returns the app's list of current top movies
app.get('/movies', (req, res) => {
	res.json(topMovies);
});

//	Following request returns data about a single movie, selected by title by the user; data comprises
// (description, genre, director, image URL, whether movie’s featured or not)
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

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

