import axios from './axios';

export async function FriendsAndWannabes(){
    const {data} = await axios.get('/connection');
    return {
        type: 'USER_CONNECTIONS',
        connections: data
    };
}

export function Befriend(otherUserID){
    return axios.post('/friendship-with/'+ otherUserID).then(() => {
        return {
            type: 'BEFRIEND',
            otherUserID
        };
    });
}

export function Unfriend(otherUserID){
    return axios.post('/no-friendship/'+ otherUserID).then(() => {
        return {
            type: 'UNFRIEND',
            otherUserID
        };
    });
}

export function onlineUsers(data) {
    return {
        type: 'ONLINE_USERS',
        usersOn: data,
    };
}

export function userJoined(data) {
    return {
        type: 'USER_JOINED',
        userIn: data,
    };
}

export function userLeft(data) {
    return {
        type: 'USER_LEFT',
        userOut: data,
    };
}

export function showMessages(data) {
    return {
        type: 'LAST_MESSAGES',
        lastMessages: data,
    };
}

export function newMessage(data) {
    return {
        type: 'NEW_MESSAGE',
        newMsg: data,
    };
}
