import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

export default class Registration extends React.Component {
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
        axios.post('/register', {
            xsrfCookieName: 'mytoken',
            xsrfHeaderName: 'csrf-token',
            fname: this.fname,
            sname: this.sname,
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
            <div className= 'register'>
                {this.state.error && <div className='error'>Oops! Try again!</div>}
                <div className= 'regisForm'>
                    <input name='fname' placeholder='First name' onChange={e => this.handleChange(e)} />
                    <input name='sname' placeholder='Surname'onChange={e => this.handleChange(e)}/>
                    <input name='email' placeholder='Email' onChange={e => this.handleChange(e)}/>
                    <input name='pword' placeholder='Password' type='password' onChange={e => this.handleChange(e)}/>
                    <button onClick={e => this.submit(e)}>Register</button>
                </div>
                <div className='regisLink'>
                    Already have an account? <Link to="/login">Click here to Sign in!</Link>
                </div>
            </div>
        );
    }
}
