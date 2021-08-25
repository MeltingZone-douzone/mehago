import React from 'react';
import Jdenticon from 'react-jdenticon';

export default function Thumbnail({ thumbnailUrl, nickname }) {

    return(
        <div>
            {
                thumbnailUrl ?
                null
                :
                <Jdenticon value={nickname} />
            }
        </div>
    )
}