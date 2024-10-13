import React from 'react';
import {useParams} from "react-router-dom";
import ModifyComponent from "../../components/products/ModifyComponent";

function ModifyPage(props) {

    const {pno} = useParams()

    return (
        <div className="w-full p-4 bg-white">
            <div className="text-3xl m-4 font-extrabold">
                Products Modify Page
            </div>

            <ModifyComponent pno={pno}></ModifyComponent>

        </div>
    );
}

export default ModifyPage;