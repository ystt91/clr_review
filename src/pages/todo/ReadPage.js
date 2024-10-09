import React from 'react';
import {createSearchParams, useNavigate, useParams, useSearchParams} from "react-router-dom";
import ReadComponent from "../../components/todo/ReadComponent";

function ReadPage(props) {


    // 이것도 결국 필요 없겠죠 hooks에서 설정 해줬으니까

    /*const navigate = useNavigate()
    const [queryParams] = useSearchParams()

    const page = queryParams.get('page') ? parseInt(queryParams.get('page')) : 1
    const size = queryParams.get('size') ? parseInt(queryParams.get('size')) : 10

    //쿼리 스트링 만들어 주는 함수당 ?뒤에 것들~
    const queryStr = createSearchParams({page:page, size:size}).toString()

    console.log(tno)

    const moveToModify = (tno) =>{
        navigate({pathname:`/todo/modify/${tno}`, search:queryStr})
    }

    const moveToList = () => {
        navigate({pathname:`/todo/list`, search:queryStr})
    }*/

    const {tno} = useParams()

    return (

        <div className="font-extrabold w-full bg-white mt-6">
            <div className="text-2xl "> Todo Read Page Component {tno} </div>
            <ReadComponent tno={tno} />
        </div>


    );
}

export default ReadPage;