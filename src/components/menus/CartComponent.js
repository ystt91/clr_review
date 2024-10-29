import React, {useEffect} from 'react';
import useCustomLogin from "../../hooks/useCustomLogin";
import {useDispatch, useSelector} from "react-redux";
import {getCartItemsAsync} from "../../slices/cartSlice";
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "../cart/CartItemComponent";

function CartComponent(props) {

    const {isLogin, loginState} = useCustomLogin()

    const {refreshCart, cartItems, changeCart} = useCustomCart

    useEffect(() => {

        if(isLogin){
            refreshCart()
        }

    }, [isLogin]);

    return (
        <div className="w-full">

            {
                isLogin
                ?
                    <div>
                        <div>${loginState.nickname}'s Cart</div>
                        <div className="bg-orange-600 w-9 text-center text-white font-bold rounded-full m-2">
                            {cartItems.length}
                        </div>

                        <div>
                            <ul>
                                {
                                    cartItems.map(item =>
                                    <li><CartItemComponent
                                        {...item}
                                        key={item.cino}
                                        changeCart={changeCart}/>
                                        email = {loginState.email}
                                    </li>)
                                }
                            </ul>
                        </div>

                    </div>
                    :
                    <div></div>
            }


            <div> Cart</div>
        </div>
    );
}

export default CartComponent;