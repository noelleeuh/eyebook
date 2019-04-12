import React from 'react';
import axios from './axios';

export default class Bio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.submitBio = this.submitBio.bind(this);
    }

    handleChange(e) {
        this.setState({bio: e.target.value});
    }


    submitBio(e) {
        e.preventDefault();
        axios.post('/bio', {
            bio: this.state.bio
        }).then(({data}) => {
            this.props.setBio(data.bio);
        });
    }

    render() {
        const bio = this.props.bio;
        const defBio = 'Empty bio';
        if (bio) {
            return (
                <div className='bio'>
                    <div id='bioDesc'>
                        {bio}
                    </div>
                    <div id='bioLink'>
                        <a onClick={this.props.displayEditBio}>Edit bio</a>
                        {this.props.visibleEditBio &&
                            <div className='bioInput'>
                                <textarea
                                    id='bioDesc'
                                    onChange={this.handleChange}
                                />
                                <button onClick={this.submitBio}>Update</button>
                            </div>
                        }
                    </div>
                </div>
            );
        } else {
            return (
                <div className='bio'>
                    <div id='bioDesc'>
                        <i>{defBio}</i>
                    </div>
                    <div id='bioLink'>
                        <a onClick={this.props.displayEditBio}>Add bio</a>
                        {this.props.visibleEditBio &&
                            <div className='bioInput'>
                                <textarea
                                    id='bioDesc'
                                    onChange={this.handleChange}
                                />
                                <button onClick={this.submitBio}>Submit</button>
                            </div>
                        }
                    </div>
                </div>
            );
        }
    }
}
