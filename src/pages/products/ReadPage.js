import React from 'react';
import {useParams} from "react-router-dom";
import ReadComponent from "../../components/products/ReadComponent";

function ReadPage(props) {

    const {pno} = useParams()

    return (
        <div className="w-full p-4 bg-white">
            <div className="text-3xl m-4 font-extrabold">
                Products Read Page
            </div>

            <ReadComponent pno={pno}/>
        </div>
    );
}

export default ReadPage;