import React, { useState, useEffect } from 'react';
import Select, { OnChangeValue } from 'react-select';
import { ExperimentAtributes, fetchExperimentInputs, fetchExperimentOutputs, SelectOptions } from '../Api';
import CustomRadarChart from './CustomRadarChart';


type OneExperimentRadarProps = {
    experimentNames: String[];
    inputAttributeNames: String[];
    outputAttributeNames: String[];
}

function OneExperimentRadar({experimentNames, inputAttributeNames, outputAttributeNames}: OneExperimentRadarProps) {
    const experimentNamesOptions: SelectOptions[] = experimentNames.map(name => ({ label: name, value: name }));

    const [selectedExperiment, setSelectedExperiment] = useState<OnChangeValue<SelectOptions, false>>(null);
    const [selectedExperimentInputs, setSelectedExperimentInputs] = useState<ExperimentAtributes[]>([]);
    const [selectedExperimentOutputs, setSelectedExperimentOutputs] = useState<ExperimentAtributes[]>([]);

    const handleInputOptionsChange = (selectedOptions: OnChangeValue<SelectOptions, false>) => {
        setSelectedExperiment(selectedOptions as SelectOptions);
    };

    useEffect(() => {
        const fetchData = async () => {
            setSelectedExperimentInputs(await fetchExperimentInputs(selectedExperiment!.value))
            setSelectedExperimentOutputs(await fetchExperimentOutputs(selectedExperiment!.value))
        };
    
        selectedExperiment && fetchData();
      }, [selectedExperiment]);

    return (
      <div className="container">
        <div>
            <Select
                options={experimentNamesOptions}
                value={selectedExperiment}
                onChange={handleInputOptionsChange}
                placeholder="Select Experiment"
                className="selectWrapper"
            />
            <div className='radarCharts'>
                <CustomRadarChart experimentData={selectedExperimentInputs} attributeNames={inputAttributeNames}/>
                <CustomRadarChart experimentData={selectedExperimentOutputs} attributeNames={outputAttributeNames}/>
            </div>
            <div>
              
            </div>
        </div>
      </div>
    );
  }

export default OneExperimentRadar;
