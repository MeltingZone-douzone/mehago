import React from 'react';
import styled from 'styled-components';
import Jdenticon from 'react-jdenticon';

export default function Thumbnail({ thumbnailUrl, nickname }) {

    console.log(thumbnailUrl);
    return(
        <>
            {
                thumbnailUrl ?
                <img style={{width:"100%",height:"100%",  objectFit:"cover"}} src={thumbnailUrl} alt={"thumbnailUrl"}/>
                :
                <Jdenticon value={nickname} />
            }
        </>
    )
}
