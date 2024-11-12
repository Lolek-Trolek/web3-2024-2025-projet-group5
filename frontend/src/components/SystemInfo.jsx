import React, { useEffect, useState } from 'react';

function SystemInfo(){
    /*
  const [systemInfo, setSystemInfo] = useState({
    cpuLoad: 'Loading...',
    memoryUsage: 'Loading...',
    batteryLevel: 'Loading...',
  });

  useEffect(() => {
    window.electron.getSystemInfo().then((data) => {
      setSystemInfo({
        cpuLoad: `${data.cpuLoad}%`,
        memoryUsage: `${data.memoryUsage}%`,
        batteryLevel: data.batteryLevel === 'N/A' ? 'No Battery' : `${data.batteryLevel}%`,
      });
    });
  }, []);

  return (
    <div className="App">
      <h1>System Resource Monitor</h1>
      <h3>CPU Load: {systemInfo.cpuLoad}</h3>
      <h3>Memory Usage: {systemInfo.memoryUsage}</h3>
      <h3>Battery Level: {systemInfo.batteryLevel}</h3>
    </div>
  );
  */

    const getSystemInfo = () => {
        window.electron.getSystemInfo().then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    }
    

  return (
    <div>
        <button onClick={getSystemInfo}>Show data</button>
      <h1>System Resource Monitor</h1>
      <h3>CPU Load: 1</h3>
      <h3>Memory Usage:2</h3>
    </div>
  );
}



export default SystemInfo;