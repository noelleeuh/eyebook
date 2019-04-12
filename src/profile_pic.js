import React from 'react';

export default function ProfPic({fname, sname, onClick, pic='/assets/pics/default.png'}) {
    return (
        <img src={pic} alt={`${fname} ${sname}`} onClick={onClick}/>
    )
}
