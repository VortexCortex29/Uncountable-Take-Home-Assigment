import React, { useState, useEffect } from 'react';
import { ExperimentAtributes, SelectOptions } from '../Api';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';
import Select, { OnChangeValue } from 'react-select';

type CustomRadarChartProps = {
    experimentData: ExperimentAtributes[];
    attributeNames: String[];
};

function CustomRadarChart({experimentData, attributeNames}: CustomRadarChartProps) {
    console.log(experimentData)
    const inputColumnsOptions: SelectOptions[] = attributeNames.map(column => ({ label: column, value: column }));
    
    const [filteredExperimentData, setFilteredExperimentData] = useState(experimentData)
    const [selectedAttributes, setSelectedAttributes] = useState<OnChangeValue<SelectOptions, true>>([]);
    
    const handleSelectedAttributesChange = (selectedOptions: OnChangeValue<SelectOptions, true>) => {
        setSelectedAttributes(selectedOptions as SelectOptions[]);
    };

    useEffect(() => {
        experimentData && setFilteredExperimentData(experimentData.filter((experiment: any) => !selectedAttributes.map(att => att.value).includes(experiment.attName )))
    }, [selectedAttributes, experimentData]);


    useEffect(() => {
        setFilteredExperimentData(experimentData)
        setSelectedAttributes([])
    }, [experimentData]);

    return (
        <div>
        <Select
          options={inputColumnsOptions}
          isMulti
          value={selectedAttributes}
          onChange={handleSelectedAttributesChange}
          placeholder="Select Features to Remove"
          className='selectWrapper'
        />
        <RadarChart
            width={700}
            height={700}
            data={filteredExperimentData}
            >
                <PolarGrid />
                <PolarAngleAxis dataKey="attName" />
                <PolarRadiusAxis />
                <Tooltip />
                <Radar
                    dataKey="attValue"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                />
        </RadarChart>
        </div>
    )
}

export default CustomRadarChart;
