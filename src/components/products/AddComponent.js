import React, {useRef, useState} from 'react';
import {postAdd} from "../../api/productsApi";
import FetchingModal from "../../common/FetchingModal";
import ResultModal from "../../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const initState = {
    pname:'',
    pdesc:'',
    price:0,
    files:[]
}

//new Formdata() -> POST, PUT

function AddComponent(props) {

    const [product, setProduct] = useState(initState)

    // REACT에서 DOM ELEMENT를 식별하기 위해 쓰는 것이 useRef
    const uploadRef = useRef()

    //const [fetching, setFetching] = useState(false);
    //const [result, setResult] = useState(false);

    const {moveToList} = useCustomMove()

    const addMutation = useMutation({mutationFn: (product) => postAdd(product)})

    // multipart/form-data Formdata()
    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value
        setProduct({...product})
    }

    const handleClickAdd = () => {

        console.log(product)

        const formData = new FormData()

        //현재 돔 객체
        const files = uploadRef.current.files

        console.log(files.length)

        for (let i = 0; i < files.length; i++) {

            formData.append("files", files[i])

        }

        formData.append("pname", product.pname)
        formData.append("pdesc", product.pdesc)
        formData.append("price", product.price)

        console.log(formData)

        //setFetching(true)

        addMutation.mutate(formData)

/*        postAdd(formData).then(data => {
            setFetching(false)
            setResult(data.result)
        })*/

    }

    const queryClient = useQueryClient()

    const closeModal = () => {
        //setResult(null)
        queryClient.invalidateQueries('products/list')
        moveToList({page:1})
    }

    return (
            <div className="border-2 border-sky-200 mt-10 m-2 p-4">
                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
                        <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                               name="pname" type={'text'} value={product.pname} onChange={handleChangeProduct}>
                        </input>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <div className="w-1/5 p-6 text-right font-bold">Desc</div>
                        <textarea
                            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
                            name="pdesc" rows="4" onChange={handleChangeProduct} value={product.pdesc}>
                        {product.pdesc}
                        </textarea>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <div className="w-1/5 p-6 text-right font-bold">Price</div>
                        <input
                            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                            name="price" type={'number'} value={product.price} onChange={handleChangeProduct}>
                        </input>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <div className="w-1/5 p-6 text-right font-bold">Files</div>
                        <input
                            ref={uploadRef}
                            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                            type={'file'} multiple={true}>
                        </input>
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                        <button type="button"
                                className="rounded p-4 w-36 bg-blue-500 text-xl text-white "
                                onClick={handleClickAdd} >
                            ADD
                        </button>
                    </div>
                </div>
                {addMutation.isPending ? <FetchingModal /> : <></>}
                {addMutation.isSuccess ?
                    <ResultModal
                        callbackFn={closeModal}
                        title={'Product Add Result'}
                        content={`${addMutation.data.result}번 상품 등록 완료`}
                    ></ResultModal> : <></>}
            </div>
        );
        }

export default AddComponent;