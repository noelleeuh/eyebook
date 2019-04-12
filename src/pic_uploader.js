import React from 'react';
import axios from './axios';

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='modalicious'>
                <h4 onClick={this.props.hideUploader}>❌</h4>
                <form className='uploadForm'>
                    <label htmlFor='file'>Choose file</label>
                    <input type='file' id='file' onChange={e => {
                        const form = new FormData;
                        form.append('file', e.target.files[0]);
                        axios.post('/upload', form);
                    }}/>
                    <button>Upload</button>
                </form>
            </div>
        );
    }
}
