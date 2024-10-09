import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {useState} from "react";

const getNum = (param, defaultValue) => {
    if(!param) return defaultValue

    return parseInt(param)
}

const useCustomMove = () => {

    const navigate = useNavigate()

    const [refresh, setRefresh] = useState(false)

    const [queryParams] = useSearchParams()

    const page = getNum(queryParams.get('page'), 1)
    const size = getNum(queryParams.get('size'), 10)

    // ex) page=3&size=10
    const queryDefault = createSearchParams({page,size}).toString()

    // 위의 코드를 매번 사용하긴 싫으니까 함수를 하나 만들자
    // page와 size가 있어야 게시물의 위치를 알 수 있으니까 queryString은 항상 있어야 한다.

    const moveToList = (pageParam) => {

        let queryStr = ''

        if(pageParam){

            const pageNum = getNum(pageParam.page, 1)
            const sizeNum = getNum(pageParam.size, 10)

            queryStr = createSearchParams({page:pageNum, size:sizeNum}).toString()
        }else {
            queryStr = queryDefault
        }

        setRefresh(!refresh)

        navigate({pathname:`../list`, search:queryStr})

    }

    const moveToModify = (num) => {
        navigate({pathname:`../modify/${num}`,search:queryDefault})
    }

    const moveToRead = (num) => {
        navigate({
            pathname: `../read/${num}`,
            search:queryDefault,
        })
    }

    return {moveToList, moveToModify,moveToRead, page, size, refresh}

}

export default useCustomMove