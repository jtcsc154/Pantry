import {StateType} from './DefaultState';
import {PantryItem} from '../PantryItem';

const nextKey = (currentKey: keyof PantryItem): keyof PantryItem => {
  switch (currentKey) {
    case 'name':
      return 'quantity';
    case 'quantity':
      return 'lowStock';
    case 'lowStock':
      return 'expirationDate';
    case 'expirationDate':
      return 'name';
    default:
      return currentKey;
  }
};

export const addPantryItem = (item: PantryItem) => ({
  type: 'ADD_PANTRY_ITEM',
  item,
});

export const scannedBarcode = (barcode: string) => ({
  type: 'SCANNED_BARCODE',
  barcode,
});

export const editPantryItem = (barcode: number) => ({
  type: 'EDIT_PANTRY_ITEM',
  barcode,
});

export const shufflePantry = () => ({
  type: 'SHUFFLE_PANTRY_ITEMS',
});

export const clearPantryItem = () => ({
  type: 'CLEAR_PANTRY_ITEM',
});

export const deletePantryItem = (item: PantryItem) => ({
  type: 'DELETE_PANTRY_ITEM',
  item,
});

export const ApplicationReducer = (state: StateType, action: any) => {
  switch (action.type) {
    case 'ADD_PANTRY_ITEM':
      let index = state.pantry.findIndex(
        o => o.barcode === action.item.barcode,
      );
      if (action.item.barcode === 0) {
        index = -1;
      }

      if (index === -1) {
        return {
          ...state,
          pantry: state.pantry.concat(action.item),
          item: {},
        };
      } else {
        state.pantry[index] = action.item;
        return {
          ...state,
          pantry: state.pantry,
          item: {},
        };
      }
    case 'SCANNED_BARCODE':
      return {
        ...state,
        item: {barcode: action.barcode},
      };
    case 'EDIT_PANTRY_ITEM':
      return {
        ...state,
        item: state.pantry.find(o => o.barcode === action.barcode),
      };
    case 'SHUFFLE_PANTRY_ITEMS':
      return {
        ...state,
        pantry: state.pantry.sort((a, b) =>
          a[state.shuffleKey] > b[state.shuffleKey] ? 1 : -1,
        ),
        shuffleKey: nextKey(state.shuffleKey),
        item: {},
      };
    case 'DELETE_PANTRY_ITEM':
      return {
        ...state,
        item: {},
        pantry: state.pantry.filter(function (item: PantryItem) {
          return item.barcode !== action.item.barcode;
        }),
      };
    case 'CLEAR_PANTRY_ITEM':
      return {
        ...state,
        item: {},
      };
    default:
      return state;
  }
};
