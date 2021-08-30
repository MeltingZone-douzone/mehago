import React from 'react';
import Logo from '../../assets/images/black-mehago.png';
import styles from "../../assets/sass/account/AccountPage.scss";
import { Switch, Route, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Links from "../../components/Links";
import LoginForm from "../../account/LoginForm";
import SignUpForm from "../../account/SignUpForm";
import PasswordSearchPage from "../../account/PasswordSearch";
import IdSearchPage from "../../account/IdSerach";

export default function AccountPage ({match, setAuthentication}) {

    return (
        <div className={styles.PageContainer}>
            <div className={styles.Page}>
                <div className={styles.LogoWrapper}>
                    <NavLink to="/account/login">
                        <img
                            src={Logo}
                            height="24"
                            alt="MEHAGO"
                        />
                    </NavLink>
                </div>
                <div className={styles.ContentWrapper}>
                
                        <AnimatePresence>
                            <Switch location={location} key={location.pathname}>
                                <motion.div
                                  style={pageStyle}
                                  initial="initial"
                                  animate="in"
                                  exit="out"
                                  variants={pageVariants}
                                  transition={pageTransition}>
                                    <Route
                                      exact
                                      path={`${match.path}/login`}
                                      render={ (props) =>( <LoginForm setAuthentication = {setAuthentication} {...props} />)}
                                    />
                                    <Route
                                      exact
                                      path={`${match.path}/signup`}
                                      component={SignUpForm}
                                    />
                                    <Route
                                      exact
                                      path={`${match.path}/idsearch`}
                                      component={IdSearchPage}
                                    />
                                    <Route
                                      exact
                                      path={`${match.path}/passwordsearch`}
                                      component={PasswordSearchPage}
                                    />
                                </motion.div>
                            </Switch>
                        </AnimatePresence>
                </div>
                <Links />
            </div>
        </div>
    )
}

const pageVariants = {
    initial: {
        x: "-10vw",
        opacity: 0,
    },
    in: {
        x: 0,
        opacity: 1,
    },
    out: {
        x: "10vw",
        opacity: 0,
    }
};

const pageTransition = {
    type: "tween",
    ease: "linear",
    duration: .2
};

const pageStyle = {
    width: "100%",
    height: "100%",
    position: "absolute"

};