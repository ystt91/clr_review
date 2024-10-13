import React from 'react';
import AddComponent from "../../components/products/AddComponent";

function AddPage(props) {
    return (
        <div className="w-full p-4 bg-white">
            <div className="text-3xl m-4 font-extrabold">
                Products Add Page
            </div>

            <AddComponent/>

        </div>
    );
}

export default AddPage;