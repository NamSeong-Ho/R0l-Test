import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Main.css';

function Main() {
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

  return (
    <main className="Main">
      
    </main>
  );
}

export default Main;
