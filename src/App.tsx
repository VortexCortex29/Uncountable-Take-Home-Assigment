import './App.css';
import React, { useEffect, useState } from 'react';
import { ExperimentData, fetchInputAttributeNames, fetchOutputAttributeNames, fetchAllExperiments, fetchAllExperimentNames } from './Api';
import AllExperimentsBarChart from './components/AllExperimentsBarChart';
import OneExperimentRadar from './components/OneExperimentRadar';
import SyncLineCharts from './components/SyncLineCharts';

const App = () => {
  const [experimentData, setExperimentData] = useState<ExperimentData[]>([]);
  const [inputAttributeNames, setInputAttributeNames] = useState<String[]>([]);
  const [outputAttributeNames, setOutputAttributeNames] = useState<String[]>([]);
  const [experimentNames, setExperimentNames] = useState<String[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setExperimentData(await fetchAllExperiments());
      setInputAttributeNames(await fetchInputAttributeNames());
      setOutputAttributeNames(await fetchOutputAttributeNames());
      setExperimentNames(await fetchAllExperimentNames());
    };

    fetchData();
  }, []);

  return (
    <div style={{padding: "50px"}}>
      <AllExperimentsBarChart experimentData={experimentData} inputAttributeNames={inputAttributeNames} outputAttributeNames={outputAttributeNames}/>
      <div style={{marginTop: "50px"}}>
        <SyncLineCharts experimentData={experimentData} inputAttributeNames={inputAttributeNames} outputAttributeNames={outputAttributeNames}/>
      </div>
      <div style={{marginTop: "50px"}}>
        <OneExperimentRadar experimentNames={experimentNames} inputAttributeNames={inputAttributeNames} outputAttributeNames={outputAttributeNames}/>
      </div>
    </div>
  );
};

export default App;
