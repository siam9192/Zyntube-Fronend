import React, { PureComponent } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = Array.from({ length: 30 }).map((_, index) => ({
  name: `Feb ${index + 1}`,
  uv: Math.ceil(Math.random() * 100000),
  pv: 2400,
  amt: 2400,
}));

export default class SynchronizedAreaChart extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/synchronized-area-chart-9jj95d';

  render() {
    return (
      <div style={{ width: '100%' }}>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            width={500}
            height={200}
            data={data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#5755fe" fill="rgb(255, 11, 85)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
