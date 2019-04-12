import React from 'react';
import axios from './axios';
import ProfPic from './profile_pic';
import Bio from './bio';
import FriendRequest from './friend_request';


export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get('/users/' + this.props.match.params.id).then(({data}) => {
            if (data.id) {
                this.setState(data);
            } else {
                this.props.history.push('/');
            }
        }).catch(function(err){
            this.props.history.push('/');
        });
    }
    render() {
        return (
            <div className='otherProfile'>
                <div className='otherConnect'>
                    <div className='userName'>{this.state.fname} {this.state.sname}'s profile</div>
                    <div id='pic'>
                        <ProfPic
                            pic = {this.state.pic}
                        />
                    </div>
                    <div id='request'>
                        <FriendRequest
                            otherUserID = {this.props.match.params.id}
                        />
                    </div>
                </div>
                <div id='bio'>
                    <Bio
                        bio = {this.state.bio}
                    />
                </div>


            </div>
        );
    }
}
