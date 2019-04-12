import React from 'react';
import axios from './axios';

export default class FriendRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        axios.get('/friendship-status/' + this.props.otherUserID).then(data => {
            if (data.data.length === 0) {
                this.setState({
                    buttonText: 'Send friend request'
                });
            }

            if (data.data.length === 1) {
                if (data.data[0].accepted == false) {
                    if (data.data[0].sender != this.props.otherUserID) {
                        this.setState({
                            buttonText: 'Cancel friend request'
                        });
                    }

                    if (data.data[0].sender == this.props.otherUserID) {
                        this.setState({
                            buttonText: 'Accept friend request'
                        });
                    }
                }

                if (data.data[0].accepted == true) {
                    this.setState({
                        buttonText: 'Unfriend'
                    });
                }
            }
        });
    }

    handleClick(e) {
        e.preventDefault();
        if (this.state.buttonText == 'Send friend request') {
            axios.post('/request-friendship/'+ this.props.otherUserID).then(data => {
                this.setState({
                    buttonText: 'Cancel friend request'
                });
            });
        }

        if (this.state.buttonText == 'Cancel friend request' || this.state.buttonText == 'Unfriend') {
            axios.post('/no-friendship/'+ this.props.otherUserID).then(data => {
                this.setState({
                    buttonText: 'Send friend request'
                });
            });
        }

        if (this.state.buttonText == 'Accept friend request') {
            axios.post('/friendship-with/'+ this.props.otherUserID).then(data => {
                this.setState({
                    buttonText: 'Unfriend'
                });
            });
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>{this.state.buttonText}</button>
            </div>
        );
    }
}
