import React, {useContext} from 'react';
import BasicLayout from "../layouts/BasicLayout";
import useCustomLogin from "../hooks/useCustomLogin";

function AboutPage(props) {

    const {isLogin, moveToLoginReturn} = useCustomLogin()

    if(!isLogin){
        return moveToLoginReturn();
    }

    return (
        <BasicLayout>
            <div>About Page</div>
        </BasicLayout>
    );
}

export default AboutPage;