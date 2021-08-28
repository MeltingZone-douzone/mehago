import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import styles from '../assets/sass/chat/ChatList.scss';

export default function ChatSection(){
    return (
        <div className={styles.chatSection}>
          <Grid container>
                  {/* 
                      ListItemText 
                          align=
                              right는 나 
                              left는 다른사람 
                          primary=
                              채팅
                          secondary=
                              보낸 시간
                  */}
                  <List className={styles.messageArea}>
  
                      <ListItem key="1">
                          <Grid container>
                              <Grid item xs={12}>
                                  <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                              </Grid>
                              <Grid item xs={12}>
                                  <ListItemText align="right" secondary="09:30"></ListItemText>
                              </Grid>
                          </Grid>
                      </ListItem>
  
                      <ListItem key="2">
                          <Grid container>
                              <Grid item xs={12}>
                                  <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                              </Grid>
                              <Grid item xs={12}>
                                  <ListItemText align="left" secondary="09:31"></ListItemText>
                              </Grid>
                          </Grid>
                      </ListItem>
  
                      <ListItem key="3">
                          <Grid container>
                              <Grid item xs={12}>
                                  <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                              </Grid>
                              <Grid item xs={12}>
                                  <ListItemText align="right" secondary="10:30"></ListItemText>
                              </Grid>
                          </Grid>
                      </ListItem>
                  </List>
                  <Divider />
                  <Grid container style={{padding: '20px'}}>
                      <Grid item xs={11}>
                          <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                      </Grid>
                      <Grid xs={1} align="right">
                          <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                      </Grid>
                  </Grid>
              </Grid>
        </div>
    );
  
}
  
