import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Main.module.css';
import icon from '../components/image/icon.svg';

function Main({ setLoggedInUser, loggedInUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  const username = location.pathname.split('/')[1];

  const handleButtonClick = () => {
    if (username) {
      navigate(`/SongList/${username}`);
    } else {
      navigate('/Sign');
    }
  };
  
  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('expires')
    alert('로그아웃 되었습니다.');
    navigate('/');
  };


  return (
    <main className={styles.main}>
      <header className={styles.Header}>
                          <div className={styles.ilog}>
                            <div
                            className={styles.icon}
                            onClick={() => navigate(loggedInUser ? `/${loggedInUser}` : '/')}
                            >
                            <img src={icon} alt='.'/>
                            </div>
                            <div 
                            className={styles.logo}
                            onClick={() => navigate(loggedInUser ? `/${loggedInUser}` : '/')}
                            >
                             CODENENDA
                            </div>
                          </div>
                          
                          <div className={styles.SL}>
                            {loggedInUser ? (
                              <>
                                <div className={styles.welcomeMessage}>반갑습니다 {loggedInUser}님!</div>
                                <div className={styles.Logout} onClick={handleLogout}>
                                  로그아웃
                                </div>
                              </>
                            ) : (
                              <>
                                <div
                                  className={`${styles.headerbutton} ${location.pathname === '/coding' ? styles.active : ''}`}
                                  onClick={() => navigate('/Login')}
                                >
                                  문제 풀기
                                </div>
                                <div
                                  className={`${styles.headerbutton} ${location.pathname === '/Login' ? styles.active : ''}`}
                                  onClick={() => navigate('/Login')}
                                >
                                  로그인
                                </div>
                                <div
                                  className={`${styles.headerbutton} ${location.pathname === '/Sign' ? styles.active : ''}`}
                                  onClick={() => navigate('/Sign')}
                                >
                                  회원가입
                                </div>
                              </>
                            )}
                          </div>
              </header>
    </main>
  );
}

export default Main;
