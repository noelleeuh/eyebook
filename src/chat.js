import React from 'react';
import {connect} from 'react-redux';
import {getSocket} from './socket';

class Chat extends React.Component {

    handleKeyDown(e) {
        if (e.which === 13) {
            getSocket().emit('newMessage', e.target.value);
        }
    }

    componentDidUpdate() {
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }

    render() {
        const {tenMessages} = this.props;

        if (!tenMessages) {
            return null;
        }

        return (
            <div className = 'chatFrame'>
                <div id='chatMessages' ref={elem => (this.chatContainer = elem)}>
                    {tenMessages && tenMessages.map(messages => {
                        return (
                            <div className='chatMsg' key={messages.c_id}>
                                <img src={messages.pic} />
                                <div className='senderData'>
                                    <div className='nameAndDate'>
                                        <p id='senderName'>{messages.fname} {messages.sname}</p>
                                        <p id='msgDate'>{messages.created_at.split('T').shift()}, {messages.created_at.split('T')[1].slice(0, -5)}</p>
                                    </div>
                                    <p id='senderMsg'>{messages.msg}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <textarea onKeyDown = {this.handleKeyDown}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        tenMessages: state.lastMessages
    };
}

export default connect(mapStateToProps)(Chat);
