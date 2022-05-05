import {StateType} from './DefaultState';
import {PantryItem} from '../PantryItem';

export const addPantryItem = (item: PantryItem) => ({
  type: 'ADD_PANTRY_ITEM',
  item,
});

export const scannedBarcode = (barcode: string) => ({
  type: 'SCANNED_BARCODE',
  barcode,
});

export const editPantryItem = (barcode: string) => ({
  type: 'EDIT_PANTRY_ITEM',
  barcode,
});

export const shufflePantry = () => ({
  type: 'SHUFFLE_PANTRY_ITEMS',
});

export const ApplicationReducer = (state: StateType, action: any) => {
  switch (action.type) {
    case 'ADD_PANTRY_ITEM':
      let index = state.pantry.findIndex(o => o.barcode === action.barcode);
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
          Object.values(a)[state.shuffleIndex] >
          Object.values(b)[state.shuffleIndex]
            ? 1
            : -1,
        ),
        shuffleIndex: (state.shuffleIndex + 1) % 7,
        item: {},
      };
    default:
      return state;
  }
};
