import { NavLink, useNavigate } from "react-router-dom"

interface HeaderProps{
    isLoggedIn:boolean;
    onLogout:() => void;
    userId?:string|null;
}

const Header = ({isLoggedIn, onLogout, userId}:HeaderProps) => {

    const navigate = useNavigate();

    return (
        <div className="header">
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>상품목록</NavLink>
                <NavLink to='/products/add'>상품등록</NavLink>
                {isLoggedIn ? (
                    <div className="header-user-info">
                        <span>{userId}</span>
                        <button className="logout-btn"
                            onClick={()=>{onLogout();navigate('/');}}>로그아웃</button>
                    </div>                    
                ) : (<NavLink to='/signin'>로그인</NavLink>)}
                
            </nav>
        </div>
    )
}

export default Header