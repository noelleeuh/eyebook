import * as io from 'socket.io-client';
import {onlineUsers, userJoined, userLeft, showMessages, newMessage} from './actions';
let socket;

export function getSocket(store) {
    if (!socket) {
        socket = io.connect();
        socket.on('onlineUsers', data => {
            store.dispatch(
                onlineUsers(data.onlineUsers)
            );
        });

        socket.on('userJoined', data => {
            store.dispatch(
                userJoined(data.user)
            );
        });

        socket.on('userLeft', data => {
            store.dispatch(
                userLeft(data)
            );
        });

        socket.on('showMessages', data => {
            store.dispatch(
                showMessages(data)
            );
        });

        socket.on('newMessage', data => {
            store.dispatch(
                newMessage(data)
            );
        });
    }

    return socket;
}
