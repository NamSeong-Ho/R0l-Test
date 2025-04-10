import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import styles from './Signpage.module.css';
import icon from '../components/image/icon.svg';

const Sign = ({ setLoggedInUser, loggedInUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    password: '',
    password_check: '',
    email: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (formData.name && formData.id && formData.password && formData.password_check && formData.email) {
      const existingUser = JSON.parse(localStorage.getItem('user'));
        
      if (existingUser && existingUser.id === formData.id) {
        alert('이미 가입된 아이디입니다. 다른 아이디를 사용해주세요.');
        return;
      }
      if (formData.password_check !== formData.password) {
        alert("비밀번호가 틀렸습니다. 다시 입력해주세요.")
        return;
      }
    }
      try {
        const { confirmPassword, ...dataToSend } = formData;
        const response = await axios.post('http://127.0.0.1:8080/user', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert(response.data.message || '회원가입 완료!');
      navigate('/Login');
    } catch (error) {
      console.error('오.류.발.생', error);
      alert(error.response?.data?.message || '응 아니야');
    }
  };

  const location = useLocation();

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('expires')
    alert('로그아웃 되었습니다.');
    navigate('/');
  };
  
  return (
    <div className={styles.Sign}>
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
      <div className={styles.title}>회원가입</div>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputsign}>
          <input
            type="text"
            name="id"
            placeholder="아이디"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputsign}>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputsign}>
          <input
            type="password"
            name="password_check"
            placeholder="비밀번호 확인"
            value={formData.password_check}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputsign}>
          <input
            type="text"
            name="name"
            placeholder="닉네임"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputsign}>
          <input
            type="tel"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.signUpButton}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Sign;