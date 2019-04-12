import React from 'react';
import axios from './axios';
import ProfPic from './profile_pic';
import Uploader from './pic_uploader';
import Profile from './profile';
import OtherProfile from './other_profile';
import Connections from './social_connections';
import WhoIsOnline from './online_users';
import Chat from './chat';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleUploader: false, visibleEditBio: false
        };
        this.displayUploader = this.displayUploader.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
        this.selectPic = this.selectPic.bind(this);
        this.displayEditBio = this.displayEditBio.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    displayUploader() {
        this.setState({
            visibleUploader: true
        });
    }

    hideUploader() {
        this.setState({
            visibleUploader: false
        });
    }

    selectPic(pic) {
        this.setState({pic});
    }

    displayEditBio() {
        this.setState({
            visibleEditBio: true
        });
    }

    setBio(bio) {
        this.setState({bio, visibleEditBio: false});
    }

    componentDidMount() {
        axios.get('/user').then(({data}) => {
            if (data.id) {
                this.setState(data);
            }
        });
    }

    render() {
        if (!this.state.id) {
            return <img src='/assets/pics/loading.gif'/>;
        }
        return (
            <div>
                <div className= 'header'>
                    <div className= 'headerLogo'>
                        <a href="./"><img src='/assets/pics/header_logo.png' alt='My social network'/></a>&nbsp;&nbsp;
                        <a href="./connections"><img src='/assets/pics/friends_icon.png' alt='My connections'/></a>&nbsp;
                        <a href="./chat"><img src='/assets/pics/chat_icon.png' alt='Chat room'/></a>&nbsp;
                        <a href="./online-users"><img src='/assets/pics/online_icon.png' alt='Online users'/></a>
                    </div>
                    <div className='headerProfPic'>
                        <ProfPic
                            pic={this.state.pic}
                            fname={this.state.fname}
                            sname={this.state.sname}
                            onClick={this.displayUploader}
                        />
                    </div>
                </div>
                {this.state.visibleUploader && <Uploader selectPic={this.selectPic} hideUploader={this.hideUploader}/>}
                <Router>
                    <div>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    id={this.state.id}
                                    fname={this.state.fname}
                                    sname={this.state.sname}
                                    pic={this.state.pic}
                                    onClick={this.displayUploader}
                                    bio={this.state.bio}
                                    setBio={this.setBio}
                                    displayEditBio= {this.displayEditBio}
                                    visibleEditBio= {this.state.visibleEditBio}
                                />
                            )}
                        />
                        <Route path="/user/:id" component={OtherProfile} />
                        <Route
                            path="/connections"
                            render={() => (
                                <Connections/>
                            )}
                        />
                        <Route
                            path="/online-users"
                            render={() => (
                                <WhoIsOnline/>
                            )}
                        />
                        <Route
                            path="/chat"
                            render={() => (
                                <Chat/>
                            )}
                        />
                    </div>
                </Router>
            </div>
        );
    }
}
