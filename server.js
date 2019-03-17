const express = require('express');
const app = express();

app.use((req,res, next) => {
    res.header("Access-Control-Allow-Origin","http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const session =  require('express-session');
const FileStore = require('session-file-store')(session);

const passport       = require('passport');
const LocalStrategy  = require('passport-local').Strategy;
const User = require('./models').User;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(username, password,done){

    User.findOne({ where:{email:username}})
        .then((user,err) => {
            return err
                ? done(err)
                : user
                    ? password === user.password
                        ? done(null, user)
                        : done(null, false, { message: 'Incorrect password.' })
                    : done(null, false, { message: 'Incorrect username.' });
        });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user,err) => {
            err ? done(err) : done(null,user);
        });
});

// Middlewares, которые должны быть определены до passport:
app.use(session({
    secret: 'passport-tutorial',
    store: new FileStore(),
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));

// Passport:
app.use(passport.initialize());
app.use(passport.session());

const expressValidator = require('express-validator');
app.use(expressValidator());

const Sequelize = require('sequelize');
const sequelize = new Sequelize('blog', 'root', '123456789root', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.get('/', (req, res) => {
    console.log('Inside the homepage callback function');
    console.log(req.sessionID);
    res.send(`You hit home page!!!\n`);
});

app.post('/login', (req, res, next) => {
	passport.authenticate('local',
		(err, user, info) => {
			console.log('\x1b[31m',err);
			return err
				? next(err)
				: user
					? req.logIn(user, function(err) {
						console.log('\x1b[31m',err);
						return err
							? next(err)
							: res.json({status:'login'});
					})
					: res.json({
						error:'not logged user',
						...info
					});
		}
	)(req, res, next);
},);


app.post('/a', (req, res, next) => {
    console.log('\x1b[31m',req.isAuthenticated());
    if(req.isAuthenticated()){
        return res.json({status:"auth"})
    }
    return res.json({status:"not auth"})
});

// const products = require('./routes/products');
// app.use('/products', products);
//
// const cart = require('./routes/cart');
// app.use('/cart', cart);

app.listen(5000, err => {
    if(err){
        console.log('\x1b[31m', 'Error...');
    }
    console.log('App was started... on 3000 port');
});