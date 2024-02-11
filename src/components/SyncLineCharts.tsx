import React from 'react';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";
import { ExperimentData } from '../Api';


type SyncLineChartsProps = {
    experimentData: ExperimentData[];
    inputAttributeNames: String[];
    outputAttributeNames: String[];
};

function SyncLineCharts({experimentData, inputAttributeNames, outputAttributeNames}: SyncLineChartsProps) {
    const dataKeys = [...inputAttributeNames, ...outputAttributeNames]

  return (
    <div className='syncLinesGrid'>
      {dataKeys.map(k => (
        <LineChart
        key={k as string}
        width={450}
        height={200}
        data={experimentData}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="experiment_name" />
        <YAxis />
        <Tooltip />
        <Legend/>
        <Line 
            type="monotone" 
            dataKey={k as keyof ExperimentData} 
            stroke={outputAttributeNames.includes(k) ? "#f39c12" : "#3498db"}
            fill={outputAttributeNames.includes(k) ? "#f39c12" : "#3498db"}/>
      </LineChart>
      ))}
    </div>
  );
}

export default SyncLineCharts;
