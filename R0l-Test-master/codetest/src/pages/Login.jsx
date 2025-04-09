import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Loginpage.module.css';
import git from '../components/image/github1.svg';
import google from '../components/image/Google.svg';
import icon from '../components/image/icon.svg';

const Login = ({ setLoggedInUser, loggedInUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUserData = JSON.parse(localStorage.getItem('user'));

    if (storedUserData) {
      if (formData.username === storedUserData.username && formData.password === storedUserData.password) {
        setLoggedInUser(formData.username);
        alert('로그인 성공!');
        navigate(`/${formData.username}`);
      } else {
        alert('아이디 또는 비밀번호가 틀렸습니다.');
      }
    } else {
      alert('회원가입을 먼저 해주세요.');
    }
  };

  const location = useLocation();
  
  if (localStorage.getItem('token') != '') {
      loggedInUser = localStorage.getItem('username');
      setLoggedInUser(true);
    } 
  
    const handleLogout = () => {
      setLoggedInUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('expires')
      alert('로그아웃 되었습니다.');
      navigate('/');
    };
  
    useEffect = () => {
      console.log()
    }

  return (
      <div className={styles.Login}>
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
        <div className={styles.top}></div>
          <div className={styles.title}>로그인</div>
            <form onSubmit={handleSubmit}>
          <div className={styles.inputlogin}>
            <input
              type="text"
              name="username"
              placeholder="아이디"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputlogin}>
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            로그인
          </button>
          <div className={styles.whatsign}>
            <div className={styles.what}>
            아직 회원이 아니신가요?
            </div>
            <div className={styles.signnow}
            onClick={() => navigate('/Sign')}>
            회원가입
          </div>
          </div>
          <div className={styles.github}>
            <img src={git} alt='1'/>
            <div>GitHub로 로그인하기</div>
          </div>
          <div className={styles.google}>
            <img src={google} alt='1'/>
            <div>Google로 로그인하기</div>
            </div>
          </form>
      </div>
  );
};

export default Login;