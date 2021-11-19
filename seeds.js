const mongoose = require('mongoose')
const Celebrity = require('./models/celebrity')

// open up the connection to mongo
mongoose.connect('mongodb://localhost/movies-lab')

const celebrities = [
	{
		name: "The Henrik Thiess ",
		occupation: "King of Javascript",
		catchPhrase: "Master Coder and loves to Code alone",

	},
	{
		name: "Spongebob",
		occupation: "Actor",
		catchPhrase: "Best yellow dude from Bikini Bottom",

	},
	{
		name: "Christiano Ronaldo",
		occupation: "Futball-Star",
		catchPhrase: "Number 10",

	}
]

Celebrity.insertMany(celebrities)
	.then(celebrities => {
		console.log(`Success! - ${celebrities.length} were added to the database`)
		mongoose.connection.close()
	})
	.catch(err => console.log(err))