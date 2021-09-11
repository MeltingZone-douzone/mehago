import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';



export default function ChatHeader({ messageFunction, roomObject, cursor }) {
  const [hiddenSearchInput, setHiddenSearchInput] = useState(true);
  const [hiddenSearchResult, setHiddenSearchResult] = useState(true);
  //   const [searchKeyword, setSearchKeyword] = useState('');

  const classes = useStyles();
  const handleSetSearch = () => setHiddenSearchInput(!hiddenSearchInput)
  const handleKeyPress = () => setHiddenSearchResult(!hiddenSearchResult)

  const handleBlur = (e) => {
    if (e.target.value === '') {
      handleSetSearch();
      setHiddenSearchResult(true);
      return;
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          {
            hiddenSearchInput ?
              <IconButton
                edge="start"
                className={classes.backButton}
                color="inherit"
                onClick={() => messageFunction.leaveRoom()}
              >
                <ArrowBackIcon />
              </IconButton>
              :
              <IconButton
                edge="start"
                className={classes.closeButton}
                color="inherit"
                onClick={() => handleSetSearch()}
              >
                <CloseIcon />
              </IconButton>
          }
          <Typography className={classes.title} variant="h6" noWrap>
            {roomObject.title}
          </Typography>
          {
            hiddenSearchInput ?

              <IconButton
                edge="end"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={() => handleSetSearch()}>
                <SearchIcon />
              </IconButton>
              :
              <>
                <div className={classes.search}>
                  <div className={classes.searchInputIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    autoComplete="off"
                    autoFocus={true}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    name={'searchKeyword'}
                    onBlur={(e) => handleBlur(e)}
                    onChange={messageFunction.onChangeSearchKeyword}
                    onKeyPress={(e) => {
                      if (e.target.value !== '') {
                        messageFunction.onSearchKeyPress(e);
                        hiddenSearchResult ? handleKeyPress() : null
                      }
                    }
                    }
                    inputProps={{ 'aria-label': 'search' }} />
                </div>
                {hiddenSearchResult ?

                  null
                  :
                  <ToggleTemplate>
                    <SearchResult>
                      {cursor.lastIndex ? `${cursor.index} / ${cursor.lastIndex}` : '0'}
                    </SearchResult>
                    <ButtonGroup className={classes.buttonGroup} variant="text" color="primary" aria-label="text primary button group">
                      <Button onClick={(e) => messageFunction.moveSearchResult(e, "left")}>{'<'}</Button>
                      <Button onClick={(e) => messageFunction.moveSearchResult(e, "right")}>{'>'}</Button>
                    </ButtonGroup>
                  </ToggleTemplate>
                }
              </>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

const ToggleTemplate = styled.div`
    position:absolute;
    z-index:100;
    display:flex;

    top:55px;
    right:25px;
    width:200px;
    height:40px;
    
    background: #fff;
    border: 1px solid #ccc;
    border-top: none;
    border-color: rgba(0,0,0,.2);
    box-shadow: 0px 4px 10px rgba(0,0,0,.2);
    color:#000;
`
const SearchResult = styled.p`
    width: 100%;
    line-height: 40px;
    padding: 0 0 0 1em;
`

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: '#2E3B55'
  },
  //   backButton: {
  //     marginRight: theme.spacing(2),
  //   },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    textAlign: 'center'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchInputIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    marginLeft: theme.spacing(0, 2),
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: 'fit-content'
  }
}));