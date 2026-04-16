import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// 회원 폼 타입 정의
interface SignUpFormData{
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
}


const SignUp = () => {
    const [formData, setFormData] = useState<SignUpFormData>({
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
    });

    const navigate = useNavigate();
    
    //입력값 변경 핸들러 함수
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        //입력된 값을 추출
        const {username, password, confirmPassword, email} = formData;

        //유효성 검사
        if(!username || !password || !confirmPassword || !email){
            alert("모든 필드를 입력해주세요.");
            return ;
        }

        //비밀번호 일치하지 않을때
        if(password !== confirmPassword){
            alert("비밀번호가 일치하지 않습니다.");
            return ;
        }
        console.log("회원가입 : ", formData);
        alert("회원 가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
        navigate('/signin');
        
    }

    return (
        <div className="signup">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">아이디</label>
                    <input 
                        type="text" 
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="아이디를 입력하세요"
                        />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input 
                        type="password" 
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="비밀번호를 입력하세요"
                        />
                </div>
                <div>
                    <label htmlFor="confirmPassword">비밀번호 확인</label>
                    <input 
                        type="password" 
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="비밀번호를 다시 입력하세요"
                        />
                </div>
                <div>
                    <label htmlFor="email">이메일</label>
                    <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="이메일을 입력하세요"
                        />
                </div>

                <button type="submit">회원가입</button>
            </form>
        </div>
    )
}

export default SignUp