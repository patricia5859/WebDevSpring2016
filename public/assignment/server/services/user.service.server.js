var passport      = require('passport');
var LocalStrategy    = require('passport-local').Strategy;



module.exports = function(app,userModel){



    var auth = authorized;

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/login',    passport.authenticate('local'), login);
    app.get('/api/loggedin', loggedin);
    app.post  ('/api/register', register);
    app.get('/api/logout',logout);

    app.get("/api/assignment/user?username=username&password=password", getUsers);
    app.get("/api/assignment/user?username=username", getUsers);
    app.get("/api/assignment/user", getUsers);
    app.get("/api/assignment/user/:id", getProfile);
    app.delete("/api/assignment/user/:id", deleteUser);
    app.post("/api/assignment/user", registerUser);
    app.put("/api/assignment/user/:id", updateUser);



    function register(req, res) {

        var tempUser = req.body;

        userModel
            .findUserByUsername(tempUser.username)
            .then(function (user) {
                    if (user) {
                        res.json(null);
                    }
                    else {
                        console.log(user);
                        return userModel.createUser(tempUser);

                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }



    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }


    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }




    function getUsers(req, res){
        if(req.query.username) {

            if (req.query.password) {
                console.log("in user.service.server.js");
                var user = userModel.findUserByCredentials(req.query.username, req.query.password)
                    .then(function(user){
                        res.json(user);

                    });
            }
            else {
                var user = userModel.findUserByUsername(req.query.username);
                res.json(user);
            }
        }

        else{
            var users = userModel.findAllUsers();
            res.json(users);
        }
    }


    function getProfile(req, res){
        var user = userModel.findUserById(req.params._id);
        res.json(user);
    }

    function deleteUser(req, res){
        var users = userModel.deleteUserById(req.params._id);
        res.json(users);
    }

    function registerUser(req, res){
        var newUser = req.body;
        console.log(newUser);
        var user = userModel.createUser(newUser);
        res.json(user);
    }

    function updateUser(req, res){
        var user = userModel.updateUserById(req.params.id, user);
        res.json(user);
    }
};