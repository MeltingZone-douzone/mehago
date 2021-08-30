import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import styles from '../assets/sass/chat/ChatList.scss';

export default function ParticipantsList(){
    return (
        <div>
              <Grid className={styles.borderRight500}>
                  <List>
                      <ListItem button key="RemySharp">
                          <ListItemIcon>
                          <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                          </ListItemIcon>
                          <ListItemText primary="John Wick"></ListItemText>
                      </ListItem>
                  </List>
                  <Divider />
                  <Grid item xs={12} style={{padding: '10px'}}>
                      <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                  </Grid>
                  <Divider />
  
                  {/* 접속자 리스트 */}
                  <List>
                      <ListItem button key="RemySharp">
                          <ListItemIcon>
                              <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                          </ListItemIcon>
                          <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                          <ListItemText secondary="online" align="right"></ListItemText>
                      </ListItem>
                      <ListItem button key="Alice">
                          <ListItemIcon>
                              <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                          </ListItemIcon>
                          <ListItemText primary="Alice">Alice</ListItemText>
                      </ListItem>
                      <ListItem button key="CindyBaker">
                          <ListItemIcon>
                              <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                          </ListItemIcon>
                          <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                      </ListItem>
                  </List>
  
              </Grid>
              
        </div>
    );
  
}
  
