import React, {useState} from 'react';

const initState = {
    email:'',
    pw:''
}

function LoginComponent(props) {

    //전역적으로 사용 될 수 있어서 그런가
    const [loginParam, setLoginParam] = useState({...initState});

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value
        setLoginParam({...initState})
    }

    return (
        <div className = "border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">Login Component</div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-2/5 p-6 text-right font-bold">Email</div>
                    <input className="w-1/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                           name="email" type={'text'} value={loginParam.email} onChange={handleChange} > </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-2/5 p-6 text-right font-bold">Password</div>
                    <input className="w-1/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                           name="pw" type={'password'} value={loginParam.pw} onChange={handleChange} > </input>
                </div>
            </div>
            <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full justify-center">
                        <div className="w-2/5 p-6 flex justify-center font-bold">
                            <button className="rounded p-4 w-36 bg-blue-500 text-xl text-white">
                            LOGIN
                        </button>
                    </div>
                </div>
            </div>
        </div>

);
}

export default LoginComponent;
