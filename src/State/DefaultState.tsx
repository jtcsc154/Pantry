import {PantryItem} from '../PantryItem';
import {examplePantryItems} from '../Storage/SampleItems';

export interface StateType {
  pantry: PantryItem[];
  item: {};
  shuffleIndex: number;
}

export const ApplicationState = {
  pantry: examplePantryItems,
  item: {},
  shuffleIndex: 0,
};
