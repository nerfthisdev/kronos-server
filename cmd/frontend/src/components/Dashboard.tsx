import  { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MonitorServiceClient } from '../proto/MonitorServiceClientPb';
import * as pb from '../proto/monitor_pb';

const client = new MonitorServiceClient('http://localhost:8080');

interface DataPoint {
  time: string;
  cpu: number;
  memory: number;
  disk: number;
}


const Dashboard = () => {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const request = new pb.StatsRequest();
    const stream = client.streamStats(request);

    stream.on('data', (response: pb.StatsResponse) => {
      const cpuUsage = response.getCpuUsageTotal()?.getTotalUsage() ?? 0;
      const memoryUsage = response.getMemoryUsage()?.getUsed() ?? 0;
      const diskUsage = response.getDiskUsage()?.getUsed() ?? 0;

      const newPoint: DataPoint = {
        time: new Date().toLocaleTimeString(),
        cpu: cpuUsage,
        memory: memoryUsage,
        disk: diskUsage,
      };

      setData(prevData => [...prevData.slice(-19), newPoint]); // последние 20 точек
    });

    stream.on('error', (err: Error) => {
      console.error('Stream error:', err);
    });

    stream.on('end', () => {
      console.log('Stream ended');
    });

    return () => {
      stream.cancel();
    };
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU Usage (%)" />
        <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="Memory Used (MB)" />
        <Line type="monotone" dataKey="disk" stroke="#ffc658" name="Disk Used (MB)" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Dashboard
