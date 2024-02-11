import React, { useEffect, useState } from 'react';
import CustomBarChart from './CustomBarChart';
import Select, { OnChangeValue } from 'react-select';
import { ExperimentData, SelectOptions } from '../Api';

type AllExperimentsBarChartProps = {
  experimentData: ExperimentData[];
  inputAttributeNames: String[];
  outputAttributeNames: String[];
};

function AllExperimentsBarChart({experimentData, inputAttributeNames: inputColumns, outputAttributeNames: outputColumns}: AllExperimentsBarChartProps) {
    
  const inputAttributeOptions: SelectOptions[] = inputColumns.map(column => ({ label: column, value: column }));
  const outputAttributeOptions: SelectOptions[] = outputColumns.map(column => ({ label: column, value: column }));

  const [selectedInputBarOptions, setSelectedInputBarOptions] = useState<OnChangeValue<SelectOptions, true>>([]);
  const [selectedOutputBarOptions, setSelectedOutputBarOptions] = useState<OnChangeValue<SelectOptions, true>>([]);
  const [selectedSortByOptions, setSelectedSortByOptions] = useState<SelectOptions[]>([]);
  const [selectedSortBy, setSelectedSortBy] = useState<OnChangeValue<SelectOptions, false>>(null);

  useEffect(() => {
    setSelectedSortByOptions([...selectedInputBarOptions, ...selectedOutputBarOptions])
  }, [selectedInputBarOptions, selectedOutputBarOptions]);

  const handleInputOptionsChange = (selectedOptions: OnChangeValue<SelectOptions, true>) => {
    setSelectedInputBarOptions(selectedOptions as SelectOptions[]);
  };

  const handleOutputOptionsChange = (selectedOptions: OnChangeValue<SelectOptions, true>) => {
    setSelectedOutputBarOptions(selectedOptions as SelectOptions[]);
  };

  const handleSortByChange = (selectedOption: OnChangeValue<SelectOptions, false>) => {
    setSelectedSortBy(selectedOption);
  };

  return (
    <div className="container">
      <div className="selectWrapper">
        <Select
          options={inputAttributeOptions}
          isMulti
          value={selectedInputBarOptions}
          onChange={handleInputOptionsChange}
          placeholder="Select Input Features"
        />
      </div>
      <div className="selectWrapper">
        <Select
          options={outputAttributeOptions}
          isMulti
          value={selectedOutputBarOptions}
          onChange={handleOutputOptionsChange}
          placeholder="Select Output Features"
        />
      </div>
      <div className="selectWrapper">
        {selectedInputBarOptions && selectedOutputBarOptions && (
          <Select
            options={selectedSortByOptions}
            value={selectedSortBy}
            onChange={handleSortByChange}
            placeholder="Sort By"
          />
        )}
      </div>
      <CustomBarChart
        experimentData={experimentData}
        inputColumns={selectedInputBarOptions.map((option: SelectOptions) => option.label)}
        outputColumns={selectedOutputBarOptions.map((option: SelectOptions) => option.label)}
        sortBy={selectedSortBy ? selectedSortBy.label as string : ''}
      />
    </div>
  );
};

export default AllExperimentsBarChart;
