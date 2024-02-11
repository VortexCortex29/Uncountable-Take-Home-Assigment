import React from 'react';

import {
  BarChart,
  Bar,
  Cell,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import { ExperimentData } from '../Api';


type CustomBarChartProps = {
    experimentData: ExperimentData[];
    inputColumns: any[];
    outputColumns: any[];
    sortBy: string;
};

function CustomBarChart({experimentData, inputColumns, outputColumns, sortBy}: CustomBarChartProps) {
  const sortedData = sortBy ? [...experimentData].sort((a, b) => (a[sortBy as keyof ExperimentData] as number) - (b[sortBy as keyof ExperimentData] as number)) : experimentData;
  return (
    <div className="container">
      <BarChart
        width={1800}
        height={600}
        data={sortedData}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="experiment_name" height={80} />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke="#000" />
        <Brush dataKey={sortBy ? sortBy : "experiment_name"} height={30} stroke="#8884d8" />
        {inputColumns && inputColumns.map((label: string) => (
            <Bar dataKey={label} fill={"#3498db"} key={label}/>
        ))}
        {outputColumns && outputColumns.map((label: string) => (
            <Bar dataKey={label} fill={"#f39c12"} key={label}/>
        ))}
      </BarChart>
      </div>
  );
}

export default CustomBarChart;
