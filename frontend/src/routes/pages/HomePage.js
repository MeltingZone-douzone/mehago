import React from 'react';
import { Link } from 'react-router-dom';
export default function HomePage() {

    return (
        <div>
            <h1 style={{ fontWeight: "bold", fontSize: "2em" }}>Home Page 입니다</h1>
            <br></br>
            <p>어떤 기능 혹은 뷰를 넣을지 생각을 해봐야 합니다.</p>
            <Link to="/chat">이걸로만 채팅방을 들어갈 수 있음.</Link>
        </div>
    )
}