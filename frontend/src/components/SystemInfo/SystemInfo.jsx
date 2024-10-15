import React, { useEffect, useState } from 'react';

const SystemInfo = () => {
  const [systemInfo, setSystemInfo] = useState(null);

  useEffect(() => {
    // Fetch system information from the main process using Electron's IPC
    window.electronAPI.getSystemInfo().then((info) => {
      setSystemInfo(info);
    });
  }, []);

  if (!systemInfo) {
    return <div>Loading system information...</div>;
  }

  return (
    <div>
      <h1>System Information</h1>
      <ul>
        <li>Platform: {systemInfo.platform}</li>
        <li>CPU Cores: {systemInfo.cpuCores}</li>
        <li>Total Memory: {systemInfo.totalMemory}</li>
        <li>Free Memory: {systemInfo.freeMemory}</li>
        <li>
          Network Interfaces:
          <ul>
            {Object.entries(systemInfo.networkInterfaces).map(([name, interfaces]) =>
              interfaces.map((iface, index) => (
                <li key={index}>
                  {name} - {iface.address} ({iface.family})
                </li>
              ))
            )}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default SystemInfo;
