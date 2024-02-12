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

  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
      setExperimentData(await fetchAllExperiments());
      setInputAttributeNames(await fetchInputAttributeNames());
      setOutputAttributeNames(await fetchOutputAttributeNames());
      setExperimentNames(await fetchAllExperimentNames());
      } catch (error) {
        setError("Fetching data failed. Make sure the server is running.")
      }
    };

    fetchData();
  }, []);


  return (
    <div className='viewSpacing'>
      {error ? (
        <div className='error'>{error}</div>
      ) : (
        <>
          <AllExperimentsBarChart
            experimentData={experimentData}
            inputAttributeNames={inputAttributeNames}
            outputAttributeNames={outputAttributeNames}
          />
          <div className='viewSpacing'>
            <SyncLineCharts
              experimentData={experimentData}
              inputAttributeNames={inputAttributeNames}
              outputAttributeNames={outputAttributeNames}
            />
          </div>
          <div className='viewSpacing'>
            <OneExperimentRadar
              experimentNames={experimentNames}
              inputAttributeNames={inputAttributeNames}
              outputAttributeNames={outputAttributeNames}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
