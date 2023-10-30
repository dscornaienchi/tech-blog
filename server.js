const express = require('express');
const session = require('express-session');
const homeRoutes = require('./controllers/home-routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(
  session({
    secret: '765b25eb31a753341f6eeb7db282c364a2645d5ea434320e610b212789fbe81c2cda0981fc11452a2ea31b76097ed9869a7f70564e65414d51be396c873284f4',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(homeRoutes); // Use the home-routes from the controllers directory

// Import and use the user-routes and post-routes from the api directory inside the controllers directory
const userRoutes = require('./controllers/api/user-routes');
const postRoutes = require('./controllers/api/post-routes');

app.use(userRoutes); // Use the user-routes from the api directory
app.use(postRoutes); // Use the post-routes from the api directory

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server is now running on http://localhost:${PORT}`));
});
