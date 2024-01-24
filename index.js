const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require("cors");
const connectToMongo = require('./allServices/mongoConnect');
// Import Passport configuration
const passportConfig = require('./config/passport');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());


// Use the Passport configuration defined in config/passport.js
// passportConfig(passport);


let whitelist = [
    "https://test123.com",
    // if you want to add any other domains you can add them here
];

let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS" + origin));
        }
    },
    credentials: true,
};
app.use(cors(corsOptions));

// Connect to MongoDB
connectToMongo();


app.use('/organizations', require('./routes/organizations'));
app.use('/users', require('./routes/users'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.get("/", function (req, res) {
    res.send("Sciflare_projects_Works"); // checking the domain working or Not
});