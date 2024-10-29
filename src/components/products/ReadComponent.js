import React, {useEffect, useState} from 'react';
import {API_SERVER_HOST} from "../../api/todoApi";
import {getOne} from "../../api/productsApi";
import FetchingModal from "../../common/FetchingModal";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomCart from "../../hooks/useCustomCart";
import useCustomLogin from "../../hooks/useCustomLogin";
import {useQuery} from "@tanstack/react-query";


const initState = {
    pno:0,
    pname:'',
    pdesc:'',
    price:0,
    uploadFileNames:[]
}

const host = API_SERVER_HOST

function ReadComponent({pno}) {

    //const [product, setProduct] = useState(initState)
    //const [fetching, setFetching] = useState(false)

    const {moveToList, moveToModify,page,size} = useCustomMove()

    //현재 사용자의 장바구니 아이템들
    const {cartItems, changeCart} = useCustomCart()

    const {loginState} = useCustomLogin()

    // v5에서는 파라미터가 객체로 처리
    // v까지는 , 처리
    // isFetching의 효과로 아래 코드가 필요 없어진다.
    // const [fetching, setFetching] = useState(false)
    const {data, isFetching} = useQuery({
        queryKey: ['products', pno],
        queryFn: () => getOne(pno),
        staleTime : 1000 * 10
    })

/*    useEffect(() => {

        setFetching(true)

        getOne(pno).then(data => {
            console.log(data)
            setFetching(false)
            setProduct(data)
        })

    }, [pno]);*/

    const handleClickAddCart = () => {
        let qty = 1

        const addedItem = cartItems.filter(item => item.pno === parseInt(pno))[0]

        if(addedItem){
            if(window.confirm('이미 추가된 상품이거든요. 추가할래요?') === false){
                return
            }
            qty = addedItem.qty + 1
        }

        changeCart({email:loginState.email, qty:qty, pno:pno})
    }

    //react query의 힘으로 아래 코드가 필요 없어진다.
    //const [product, setProduct] = useState(initState)
    const product = data || initState

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {isFetching ? <FetchingModal/> : <></>}
            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PNO</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{product.pno}</div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PNAME</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{product.pname}</div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PRICE</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{product.price}</div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PDESC</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{product.pdesc}</div>
                </div>
            </div>
            <div className="w-full justify-center flex flex-col m-auto items-center">
                {product.uploadFileNames.map((imgFile, i) =>
                    <img alt="product" key={i} className="p-4 w-1/2" src={`${host}/api/products/view/${imgFile}`}/>
                )}
            </div>
            <div className="flex justify-end p-4">
                <button type="button"
                        className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-green-500"
                        onClick={handleClickAddCart}
                >
                    Add Cart
                </button>
                <button type="button"
                        className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
                        onClick={() => moveToModify(pno)}
                >
                    Modify
                </button>
                <button type="button"
                        className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                        onClick={() => moveToList({page, size})}>
                    List
                </button>
            </div>
        </div>

    );
}

export default ReadComponent;