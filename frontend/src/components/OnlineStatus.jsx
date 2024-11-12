import React, { useState } from 'react';
import { Button } from './ui/button';

function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(null); 

  const checkOnlineStatus = () => {
    setIsOnline(navigator.onLine);
  };

  return (
    <div>
      <h1>Online status</h1>
      <Button onClick={checkOnlineStatus}>Is online?</Button>
      <h2>Connection Status: <strong>{isOnline === null ? 'Click to check' : isOnline ? 'Online' : 'Offline'}</strong></h2>
      <p>Attention : le statut peut afficher "Online" même sans connexion Internet réelle, car <code>navigator.onLine</code> considère "localhost" comme une connection.</p>
    </div>
  );
}

export default OnlineStatus;
