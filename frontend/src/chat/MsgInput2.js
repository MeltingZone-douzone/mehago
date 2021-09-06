import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import styled from 'styled-components';
import { Button } from '@material-ui/core'

export default function MsgInput2({message, messageFunction}) {
    return(
        <Grid container style={{padding: '20px'}}>
            <Grid item xs={11}>
                <form onSubmit={ messageFunction.onSubmitMessage }>
                    <TextField 
                        id="message" 
                        name="message"
                        label="입력해라" 
                        // value={ message }
                        onChange={ messageFunction.onChangeMessage }
                        fullWidth 
                        />
                </form>
            </Grid>
            <Grid item xs={1} align="right">
                <Fab color="primary" aria-label="보내기"><SendIcon /></Fab>
            </Grid>
        </Grid>
    );
}