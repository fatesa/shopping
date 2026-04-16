import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import users from '../data/users.json';

// 로그인 폼 데이터 타입 정의
interface SigninForm{
    username:string;
    password:string;    
}

interface SignProps{
    onLogin:(username:string, role:string) => void;    
}

const SignIn = ({onLogin}:SignProps) => {
    const [formData, setFormData] = useState<SigninForm>({
        username:'',
        password: ''
    });

    // 로그인 결과 상태 관리(success/fail)
    const [loginResult, setLoginResult] = useState<string>('');

    const navigate = useNavigate();


    //입력값 상태 관리 핸들러
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    //폼 제출 핸들러
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault(); //새로고침 방지

        const {username, password} = formData; // 입력값 추출

        if(!username || !password){
            alert('모든 필드를 입력해주세요.');
            return ;
        }

        console.log('로그인 시도: ', formData);

        //로그인 일치여부
        const user = users.find(user =>
            (user.username === username && user.password === password)
        );

        if(!user){
            setLoginResult('fail');
            //alert('아이디 또는 비밀번호가 올바르지 않습니다.');
            return ;
        }

        onLogin(user.username, user.role); //로그인 성공시 부모 컴포넌트에 알림
        
        // 인증 - 권한에 따른 다른 페이지 이동
        if(user.role === 'admin'){
            setLoginResult('success'); 
            navigate('/dashboard',{state:{username: user.username, role:user.role}});
        }else{
            setLoginResult('success');                        
            navigate('/products');
        }
                
    }

    return (
        <div className="signin">
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">아이디</label>
                    <input 
                        type="text" 
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="아이디를 입력하세요"/>
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input 
                        type="password" 
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="비밀번호를 입력하세요"/>
                </div>

                <button type="submit">로그인</button>
            </form>
            <p className="signup-link">아직 계정이 없으신가요? <Link to='/signup'>회원가입</Link></p>

            {/* 로그인 오류 메세지 표시 */}
            {loginResult === 'fail' && <p className="error">로그인 실패, 다시 시도 하세요</p>}

        </div>
    )
}

export default SignIn