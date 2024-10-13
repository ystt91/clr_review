함수의 호출 방식

<button onClick={() => moveToModify(tno)}>Test Modify</button>
<button onClick={moveToList}>Test List</button>

# 함수 참조 : 함수 자체를 값으로 넘깁니다.
#           렌더링 시 함수가 호출되지 않고, 이벤트가 발생할 때 브라우저가 함수를 실행 합니다.

# 함수 호출 : 함수가 즉시 실행됩니다.
#           렌더링 시 즉시 실행 됩니다.


# Page = routing 처리 + 컴포넌트 조합
# Component = 일처리할 부분 부분

# useState = 상태가 변경 되면 렌더링 됩니다.

# Modal
# 기존의 SSR의 POST , REDIRECT, GET (RPG) 패턴에서 벗어난 방법으로 모달을 쓴다.


    const deleteOldImages = (imageName) => {
        
        const resultFileNames = product.uploadFileNames.filter(fileName => fileName !== imageName)

        product.uploadFileNames = resultFileNames

        setProduct({...product})

    }

# React의 큰 특징 : 데이터가 변경되면 렌더링 된다는 것을 주의하세요