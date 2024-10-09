import React, {useCallback} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";

function IndexPage(props) {

    const navigate = useNavigate()

    const handleClickList = useCallback(() => {
        navigate({pathname: `list`})
        /* path name = 경로, search = queryString */
    },[])

    const handleClickAdd = useCallback(() => {
        navigate({pathname:`add`})
        /* path name = 경로, search = queryString */
    },[])

    return (
        <BasicLayout>
            <div className="w-full flex m-2 p-2 ">
                <div className="text-xl m-1 p-2 w-20 font-extrabold text-center underline"
                     onClick={handleClickList}>
                LIST</div>
                <div className="text-xl m-1 p-2 w-20 font-extrabold text-center underline"
                     onClick={handleClickAdd}>
                ADD</div>
            </div>
            <div className="flex flex-wrap w-full">
                <Outlet/>
                {/* 서브 메뉴의 내용들이 나타나게 한다? */}
            </div>
        </BasicLayout>
    );
}

export default IndexPage;