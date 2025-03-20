import React, {useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import icon from './image/icon.ico'

function Header({ loggedInUser, setLoggedInUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setLoggedInUser(null);
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  useEffect = () => {
    console.log()
  }
  

  return (
    <header className="Header">
      <div className="ilog">
        <div
        className="icon"
        onClick={() => navigate(loggedInUser ? `/${loggedInUser}` : '/')}
        >
        <img src={icon} alt='.'/>
        </div>
        <div 
        className="logo"
        onClick={() => navigate(loggedInUser ? `/${loggedInUser}` : '/')}
        >
         CODENENDA
        </div>
      </div>
      
      <div className="SL">
        {loggedInUser ? (
          <>
            <div className="welcomeMessage">반갑습니다 {loggedInUser}님!</div>
            <div className="Logout" onClick={handleLogout}>
              로그아웃
            </div>
          </>
        ) : (
          <>
            <div
              className={`Sign ${location.pathname === '/Sign' ? 'active' : ''}`}
              onClick={() => navigate('/Sign')}
            >
              회원가입
            </div>
            <div
              className={`Login ${location.pathname === '/Login' ? 'active' : ''}`}
              onClick={() => navigate('/Login')}
            >
              로그인
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;