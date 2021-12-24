// 리액트 컴포넌트를 생성하기 위한 리액트 불러오기
import React from 'react';

// 리액트 컴포넌트 생성
function Hello({color, name, isSpecial}) {
    return (
        <div style={{color}}>
            {isSpecial && <b>*</b>}
            안녕하세요 {name}
        </div>
    );
}

// 컴포넌트에 props를 지정하지 않았을 때 기본적으로 사용할 값 설정
Hello.defaultProps = {
    name: '이름없음'
}

// Hello 라는 컴포넌트를 내보내기(다른 컴포넌트에서 불러와서 사용할 수 있음.)
export default Hello;