export default function reducer(state = {}, action) {
    if (action.type == 'USER_CONNECTIONS') {
        state = Object.assign({}, state, {
            connections: action.connections
        });
    }

    if (action.type == 'UNFRIEND') {
        state = Object.assign({}, state, {
            connections: state.connections && state.connections.filter(
                connections => action.otherUserID != connections.id
            )});
    }

    if (action.type == 'BEFRIEND') {
        state = Object.assign({}, state, {
            connections: state.connections.map(connections => {
                if (action.otherUserID == connections.id) {
                    return Object.assign({}, connections, {
                        accepted: true
                    });
                } else {
                    return Object.assign({}, connections);
                }
            })
        });
    }

    if (action.type == 'ONLINE_USERS') {
        state = Object.assign({}, state, {
            usersOn: action.usersOn
        });
    }

    if (action.type == 'USER_JOINED') {
        state = Object.assign({}, state, {
            usersOn: state.usersOn.concat(action.userIn)
        });
    }

    if (action.type == 'USER_LEFT') {
        state = Object.assign({}, state, {
            usersOn: state.usersOn.filter(usersOn => usersOn.id != action.userOut)
        });
    }

    if (action.type == 'LAST_MESSAGES') {
        state = Object.assign({}, state, {
            lastMessages: action.lastMessages
        });
    }

    if (action.type == 'NEW_MESSAGE') {
        state = Object.assign({}, state, {
            lastMessages: state.lastMessages.concat(action.newMsg)
        });
    }

    return state;
}
