
module.exports = function(app,userModel){
    app.get("/api/assignment/user?username=username&password=password", getUsers);
    app.get("/api/assignment/user?username=username", getUsers);
    app.get("/api/assignment/user", getUsers);
    app.get("/api/assignment/user/:id", getProfile);
    app.delete("/api/assignment/user/:id", deleteUser);
    app.post("/api/assignment/user", registerUser);
    app.put("/api/assignment/user/:id", updateUser);

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
        var user = userModel.createUser(user);
        res.json(user);
    }

    function updateUser(req, res){
        var user = userModel.updateUserById(req.params._id, user);
        res.json(user);
    }
};