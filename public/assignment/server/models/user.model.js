var users = require("./user.mock.json");

module.exports = function(){

    var api = {
        findUserByCredentials : findUserByCredentials,
        findUserByUsername : findUserByUsername,
        findAllUsers : findAllUsers,
        findUserById : findUserById,
        createUser : createUser,
        deleteUserById : deleteUserById,
        updateUserById : updateUserById
    };
    return api;

    function findUserByCredentials(username, password){
        console.log("user "+username+" password "+password);

        for(user in users){
            console.log(user);
            if(users[user].username==username && users[user].password==password){
                console.log(users[user]);
                return users[user];
            }
        }
        return null;
    }

    function findUserByUsername(username){
        for(user in users){
            if(user.username==username){
                console.log(users[user]);
                return users[user];
            }
        }
        return null;
    }

    function findAllUsers(){
        return users;
    }

    function findUserById(Id){
        for(user in users){
            if(user._id==Id){
                console.log(users[user]);
                return users[user];
            }
        }
        return null;
    }

    function createUser(newUser){
        newUser._id = (new Date).getTime();
        users.push(newUser);
        return newUser;
    }

    function deleteUserById(Id){
        for(user in users){
            if(user._id==Id){
                users.splice(user,1);
                break;
            }
        }
        return users;
    }

    function updateUserById(Id, user){
        for(user in users){
            if(users[user]._id == Id){
                users[user].firstName = user.firstName;
                users[user].lastName = user.lastName;
                users[user].username = user.username;
                users[user].password = user.password;
                users[user].role = user.role;
            }
        }
        return user;
    }
};