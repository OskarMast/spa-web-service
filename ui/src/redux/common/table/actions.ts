import { createAction } from 'typesafe-actions';
import {
  TableActions,
  Pagination,
  DataType,
} from './types';

export const loadData = (prefix: string) => createAction(`${prefix}/${TableActions.LOAD_DATA}`, resolve => {
  return (pagination: Pagination) => resolve({ pagination })
});

export const loadDataSuccess = (prefix: string) => createAction(`${prefix}/${TableActions.LOAD_DATA_SUCCESS}`, resolve => {
  return (data: DataType, pagination: Pagination) => resolve({ data, pagination })
});

export const loadDataFailure = (prefix: string) => createAction(`${prefix}/${TableActions.LOAD_DATA_FAILURE}`, resolve => {
  return (error: string) => resolve({ error })
});

export const searchData = (prefix: string) => createAction(`${prefix}/${TableActions.SEARCH_DATA}`, resolve => {
  return (value: string) => resolve({ value })
});

export const removeData = (prefix: string) => createAction(`${prefix}/${TableActions.REMOVE_DATA}`, resolve => {
  return (_id: string) => resolve({ _id })
});

export const addData = (prefix: string) => createAction(`${prefix}/${TableActions.ADD_DATA}`, resolve => {
  return (name: string, author: string, cost: number, genre: string) => resolve({ name, author, cost, genre })
});

export const editData = (prefix: string) => createAction(`${prefix}/${TableActions.EDIT_DATA}`, resolve => {
  return (_id: string, name: string, author: string, cost: number, genre: string) => resolve({ _id, name, author, cost, genre })
});

export const sortData = (prefix: string) => createAction(`${prefix}/${TableActions.SORT_DATA}`, resolve => {    
  return (field: string, order: string, genre: string, minValue: number, maxValue: number, pagination: Pagination) => 
  
  resolve({field, order, genre, minValue, maxValue, pagination })
});

/*
export const sortData = (prefix: string) => createAction(`${prefix}/${TableActions.SORT_DATA}`, resolve => {    // name, author
  return (field: string, order: string, pagination: Pagination) => resolve({field, order, pagination })
});

export const sortData2 = (prefix: string) => createAction(`${prefix}/${TableActions.GENRE_SORT}`, resolve => {   // genre filter
  return (genre: string, pagination: Pagination) => resolve({genre, pagination })
});

export const sortBookByCost = (prefix: string) => createAction(`${prefix}/${TableActions.COST_SORT}`, resolve => {    // cost
  return (minValue: number, maxValue: number, pagination: Pagination) => resolve({minValue, maxValue, pagination })
});
*/







