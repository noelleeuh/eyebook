import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    submit(e) {
        e.preventDefault();
        axios.post('/login', {
            xsrfCookieName: 'mytoken',
            xsrfHeaderName: 'csrf-token',
            email: this.email,
            pword: this.pword,
        }).then(({data}) => {
            if (data.success) {
                location.replace('/');
            } else {
                this.setState({
                    error: true
                });
            }
        });
    }
    render() {
        return (
            <div className='login'>
                <img src='/assets/pics/main_logo.png'/>
                {this.state.error && <div className='error'>Oops! Try again!</div>}
                <div className= 'loginForm'>
                    <input name='email' placeholder='Email' onChange={e => this.handleChange(e)}/>
                    <input name='pword' placeholder='Password' type='password' onChange={e => this.handleChange(e)}/>
                    <button onClick={e => this.submit(e)}>Login</button>
                </div>
                <div className= 'loginLink'>
                    Don't have an account yet? <Link to="/">Register now</Link>
                </div>
            </div>
        );
    }
}
