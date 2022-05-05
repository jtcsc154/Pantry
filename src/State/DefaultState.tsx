import {PantryItem} from '../PantryItem';
import {examplePantryItems} from '../Storage/SampleItems';

export interface StateType {
  pantry: PantryItem[];
  item: {};
  shuffleKey: keyof PantryItem;
}

export const ApplicationState = {
  pantry: examplePantryItems,
  item: {},
  shuffleKey: 'name',
};
