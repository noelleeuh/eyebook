import React from 'react';
import Registration from './register';
import Login from './login';
import { HashRouter, Route } from 'react-router-dom';


export default function Welcome(props) {
    return (
        <div className='welcome'>
            <div className='welcomeLogo'>
                <img src='/assets/pics/main_logo.png'/>
                <div id='logoTxt'>Creep a look at people on the Internet</div>
            </div>
            <HashRouter>
                <div className='forms'>
                    <Route exact path="/" component= {Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
