import React, { useEffect } from 'react';
import Logo from '../../assets/images/black-mehago.png';
import "../../assets/sass/account/AccountPage.scss";

export default function HomePage({ history }) {

    useEffect(() => {
        setTimeout(function () {
            history.replace("/account/login");
        }, 1000);
    }, []);


    return (
        <div className={"PageContainer"}>
            <div className={"Page"}>
                <p>이미지 넣자 이쁘게 만들어서</p>
            </div>
        </div>
    )
}