//Require SPICED PG//
var spicedPg = require('spiced-pg');
var db = spicedPg(process.env.DATABASE_URL ||'postgres:postgres:postgres@localhost:5432/socialnet');
//---//

//Require bcrypt for hashing//
const bcrypt = require("bcryptjs");
const {promisify} = require('util');
const genSalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash);
const compare = promisify(bcrypt.compare);
//---//

//Hash password//
module.exports.pwordHash = function pwordHash(randomPword) {
    return genSalt().then(
        salt => {
            return hash(randomPword, salt);
        }
    ).then(
        hash => {
            return hash;
        }
    );
};
//---//

//Compare passwords//
module.exports.pwordCompare = function pwordCompare(inputPword, hashedPword) {
    return compare(inputPword, hashedPword);
};
//---//

//Register new user//
module.exports.registerUser = function registerUser(firstName, surname, email, password) {
    return db.query(`INSERT INTO users (fname, sname, email, pword)
        VALUES ($1, $2, $3, $4)
        RETURNING id`, [firstName, surname, email, password]);
};
//---//

//Check if an email is in the database//
module.exports.isMailInDB = function isMailInDB(email) {
    return db.query(`SELECT email
        FROM users
        WHERE LOWER(email) = LOWER($1)`, [email]);
};
//---//

//Get all info from a user based on email//
module.exports.allUserInfo = function allUserInfo(email) {
    return db.query(`SELECT *
        FROM users
        WHERE LOWER(email) = LOWER($1)`, [email]);
};
//---//

//Get user info to display based on ID//
module.exports.getUserInfo = function getUserInfo(id) {
    return db.query(`SELECT fname, sname, pic, bio, id
        FROM users
        WHERE id = $1`, [id]);
};
//---//

//Upload profile pic based on ID//
module.exports.uploadNewProfPic = function uploadNewProfPic(newPic, id) {
    return db.query(`UPDATE users
        SET pic = $1
        WHERE id = $2`, [newPic, id]);
};
//---//

//Upload bio based on ID//
module.exports.uploadBio = function uploadBio(newBio, id) {
    return db.query(`UPDATE users
        SET bio = $1
        WHERE id = $2 RETURNING bio, id`, [newBio, id]);
};
//---//

//Get initial status of friendship//
module.exports.getFrienshipStatus = function getFrienshipStatus(userID, otherUserID) {
    return db.query(`SELECT * FROM friendships
        WHERE (receiver = $1 AND sender = $2)
        OR (sender = $1 AND receiver = $2)`, [userID, otherUserID]);
};
//---//

//Start relationship//
module.exports.setRelation = function setRelation(userID, otherUserID) {
    return db.query(`INSERT INTO friendships
        (sender, receiver) VALUES ($1, $2) RETURNING id`, [userID, otherUserID]);
};
//---//

//Start friendship//
module.exports.befriend = function befriend(userID, otherUserID) {
    return db.query(`UPDATE friendships
        SET accepted = true
        WHERE (receiver = $1 AND sender = $2)
        OR (sender = $1 AND receiver = $2)`, [userID, otherUserID]);
};
//---//

//End friendship//
module.exports.unfriend = function unfriend(userID, otherUserID) {
    return db.query(`DELETE FROM friendships
        WHERE (receiver = $1 AND sender = $2)
        OR (sender = $1 AND receiver = $2)`, [userID, otherUserID]);
};
//---//

//End friendship//
module.exports.getConnections = function getConnections(id) {
    return db.query(`SELECT users.id, fname, sname, pic, accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND receiver = $1 AND sender = users.id)
        OR (accepted = true AND receiver = $1 AND sender = users.id)
        OR (accepted = true AND sender = $1 AND receiver = users.id)`, [id]);
};
//---//

//Get online users//
module.exports.getOnlineUsers = function getOnlineUsers(onUsers) {
    return db.query(`SELECT id, fname, sname, pic
        FROM users
        WHERE id = ANY($1)`, [onUsers]);
};
//---//

//Get 10 last messages//
module.exports.getMessages = function getMessages() {
    return db.query(`SELECT users.id as u_id, chat.id as c_id, users.fname, users.sname, users.pic, chat.sender, chat.msg, chat.created_at
        FROM chat
        LEFT JOIN users
        ON users.id = chat.sender
        ORDER BY created_at DESC
        LIMIT 10`);
};
//---//

//Send new message//
module.exports.sendNewMessage = function sendNewMessage(userID, userMsg) {
    return db.query(`INSERT INTO chat (sender, msg)
        VALUES ($1, $2) RETURNING *`, [userID, userMsg]);
};
//---//
