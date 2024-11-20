import React, { useState } from 'react';
import { Button } from './ui/button';

function SystemInfo() {
  const [systemInfo, setSystemInfo] = useState({
    cpuLoad: '...',
    memoryUsage: '...',
    batteryLevel: '...',
  });

  const getSystemInfo = () => {
    window.electron.getSystemInfo()
      .then((result) => {
        console.log(result);
        

        setSystemInfo({
          cpuLoad: `${result.cpu.currentLoad} %`, 
          memoryUsage: `${result.memory.memoryUsage} %`,
          batteryLevel: result.battery.percent !== null
            ? `${result.battery.percent} %`
            : 'N/A', 
        });
      })
      .catch((err) => {
        console.log(err);
        setSystemInfo({
          cpuLoad: 'Error',
          memoryUsage: 'Error',
          batteryLevel: 'Error',
        });
      });
  };

  return (
    <div>
      <h1>System Resource Monitor</h1>
      <Button onClick={getSystemInfo}>Show System Info</Button>
      <h3>CPU Load: {systemInfo.cpuLoad}</h3>
      <h3>Memory Usage: {systemInfo.memoryUsage}</h3>
      <h3>Battery Level: {systemInfo.batteryLevel}</h3>
    </div>
  );
}

export default SystemInfo;
