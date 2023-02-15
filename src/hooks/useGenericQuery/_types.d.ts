import type { RecordWithOptionalKey } from '@/types';
import type { ECondition, EConditionOperator, EConjunction, EInputType, EValueType } from './constants';

//#region data type
export type TConjunction = `${EConjunction}`;

export type TCondition = `${ECondition}`;

export type TConditionOperator = `${EConditionOperator}`;

export type TValueType = `${EValueType}`;

export type TInputType = `${EInputType}`;

export type TFilterItemOption = {
  value: string | number;
  label: string;
  [x: string]: any;
};

export type TFilterItemConfig = {
  id: string;
  index: number;
  field: string;
  name: string;
  valueType: TValueType;
  inputType: TInputType;
  condition: RecordWithOptionalKey<ECondition, TConditionOperator>;
  optionsSource?: string;
  options?: TFilterItemOption[];
};

export type TFilterItem = {
  conjunction: TConjunction;
  field: string;
  name: string;
  condition: TCondition;
  operator: TConditionOperator;
  valueType: TValueType;
  inputType: TInputType;
  values: string[] | number[];
  valuesData?: TFilterItemOption[];
};
//#endregion

//#region Type of function arguments
export type TCreateFilterConfigsArgs = Omit<TFilterItemConfig, 'id' | 'index'>;
//#endregion
