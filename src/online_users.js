import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class WhoIsOnline extends React.Component {
    render() {
        const {onlineUsers} = this.props;
        if (!onlineUsers) {
            return null;
        } else {
            return (
                <div className='online'>
                    <div id='connection'>ONLINE USERS</div>
                    {onlineUsers && onlineUsers.map(onlineUser => {
                        return (
                            <div className='usersOnline'key={onlineUser.id}>
                                <Link to={`/user/${onlineUser.id}`}>
                                    <img src={onlineUser.pic}/>
                                </Link>
                                <p>{onlineUser.fname} {onlineUser.sname}</p>
                            </div>
                        );
                    })}
                </div>
            );
        }

    }
}

function mapStateToProps(state) {
    return {
        onlineUsers: state.usersOn
    };
}

export default connect(mapStateToProps)(WhoIsOnline);
