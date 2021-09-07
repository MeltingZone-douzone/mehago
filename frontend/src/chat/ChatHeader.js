import React, { useState, useEffect } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background : '#2E3B55'
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
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

export default function ChatHeader({messageFunction}) {
  const [hiddenSearchInput, setHiddenSearchInput] = useState(true);
//   const [searchKeyword, setSearchKeyword] = useState('');

  const classes = useStyles();
  const handleSetSearch = () => {
    setHiddenSearchInput(!hiddenSearchInput); // 어떻게 키고 끌지 정해야함
  }
  const handleBlur = (e) => {
      if(e.target.value === '') {
        handleSetSearch();
        return;
      }
  }
/*   const handleChange = (e) => {
      setSearchKeyword(
          e.target.value
      )
  } */
/*   const handleKeyPress = (e) => {
      if(e.key == 'Enter') {
          searchMessage(searchKeyword).then(res => {
            if(res.statusText === 'OK') {
                console.log('res.data.data: ', res.data.data); // 길이, 번호
                set
            }
          })
      }
  } */
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
            {
            hiddenSearchInput?
                <IconButton
                    edge="start"
                    className={classes.backButton}
                    color="inherit"
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
            헬창모임
            </Typography>
            {
                hiddenSearchInput?
                <IconButton
                    edge="end"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => handleSetSearch()}>
                    <SearchIcon />
                </IconButton>
                :
                <div className={classes.search}>
                    <div className={classes.searchInputIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        name={'searchKeyword'}
                        onBlur={(e) => handleBlur(e)}
                        onChange={messageFunction.onChangeSearchKeyword}
                        onKeyPress={messageFunction.onSearchKeyPress}
                        inputProps={{ 'aria-label': 'search' }}/>
                </div> 
            }
        </Toolbar>
      </AppBar>
    </div>
  );
}
