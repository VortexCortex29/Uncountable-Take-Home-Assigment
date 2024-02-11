import axios from 'axios';
const apiUrl = 'http://127.0.0.1:3001/api/';

export type ExperimentData = {
  Antioxidant: number;
  "Carbon Black High Grade": number;
  "Carbon Black Low Grade": number;
  "Co-Agent 1": number;
  "Co-Agent 2": number;
  "Co-Agent 3": number;
  "Coloring Pigment": number;
  "Compression Set": number;
  "Cure Time": number;
  "Curing Agent 1": number;
  "Curing Agent 2": number;
  Elongation: number;
  "Oven Temperature": number;
  "Plasticizer 1": number;
  "Plasticizer 2": number;
  "Plasticizer 3": number;
  "Polymer 1": number;
  "Polymer 2": number;
  "Polymer 3": number;
  "Polymer 4": number;
  "Silica Filler 1": number;
  "Silica Filler 2": number;
  "Tensile Strength": number;
  Viscosity: number;
  experiment_name: string;
};

export type ExperimentAtributes = {
    attName: string;
    attValue: number;
}

export type SelectOptions = {
    label: String;
    value: String;
};

const fetchData = async <T extends any>(endpoint: String): Promise<T> => {
  try {
    const response = await fetch(apiUrl + endpoint);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchInputAttributeNames = () => fetchData<String[]>('inputAttributeNames');
export const fetchOutputAttributeNames = () => fetchData<String[]>('outputAttributeNames');
export const fetchAllExperiments = () => fetchData<ExperimentData[]>('allExperiments');
export const fetchAllExperimentNames = () => fetchData<String[]>('experimentNames');
export const fetchExperimentInputs = (experimentName: String) => fetchData<ExperimentAtributes[]>('experiment/inputs/' + experimentName);
export const fetchExperimentOutputs = (experimentName: String) => fetchData<ExperimentAtributes[]>('experiment/outputs/' + experimentName);
