import React from 'react';
import {connect} from 'react-redux';
import {FriendsAndWannabes, Unfriend, Befriend} from './actions';
import {Link} from 'react-router-dom';

class Connections extends React.Component {
    componentDidMount() {
        this.props.dispatch(FriendsAndWannabes());
    }

    render() {
        const {friends, wannabes} = this.props;

        if (!friends || !wannabes) {
            return null;
        }

        return (
            <div className='connections'>
                <div className='friends'>
                    <div id='connection'>FRIENDS</div>
                    <div id='users'>
                        {friends.map(friends => {
                            return (
                                <div className='userPics' key={friends.id}>
                                    <Link to={`/user/${friends.id}`}>
                                        <img src={friends.pic} />
                                    </Link>
                                    <p>{friends.fname} {friends.sname}</p>
                                    <button onClick={() => this.props.dispatch(Unfriend(friends.id))}>Unfriend</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className='wannabes'>
                    <div id='connection'>PENDING REQUESTS</div>
                    <div id='users'>
                        {wannabes.map(wannabes => {
                            return (
                                <div className='userPics' key={wannabes.id}>
                                    <Link to={`/user/${wannabes.id}`}>
                                        <img src={wannabes.pic} />
                                    </Link>
                                    <p>{wannabes.fname} {wannabes.sname}</p>
                                    <button onClick={() => this.props.dispatch(Befriend(wannabes.id))}>Accept friend request</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

        );

    }
}

const mapStateToProps = state => {
    return {
        friends: state.connections && state.connections.filter(connections => connections.accepted == true),
        wannabes: state.connections && state.connections.filter(connections => connections.accepted == false),
    };
};

export default connect(mapStateToProps)(Connections);
