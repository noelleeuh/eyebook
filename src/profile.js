import React from 'react';
import ProfPic from './profile_pic';
import Bio from './bio';


export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <div className= 'userProfile'>
                    <div className='myConnect'>
                        <div className='userName'>{this.props.fname} {this.props.sname}'s profile (This is you)</div>
                        <div id='pic'>
                            <ProfPic
                                pic = {this.props.pic}
                                displayUploader = {this.props.displayUploader}
                            />
                        </div>
                    </div>
                    <div id='bio'>
                        <Bio
                            bio = {this.props.bio}
                            setBio = {this.props.setBio}
                            displayEditBio = {this.props.displayEditBio}
                            visibleEditBio= {this.props.visibleEditBio}
                        />
                    </div>
                </div>
                <a className='logout' href='/logout'><button>Log out</button></a>
            </div>
        );
    }
}
