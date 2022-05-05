import {PantryItem} from '../PantryItem';
const fs = require('react-native-fs');
const path: string = fs.DocumentDirectoryPath + '/items.json';

export function writePantryItems(products: PantryItem[]): void {
  fs.writeFile(path, JSON.stringify(products), 'utf8');
}

export async function loadPantryItems(): Promise<PantryItem[]> {
  const fileData: string = await fs.readFile(path, 'utf8');
  return Promise.resolve(JSON.parse(fileData).map((u: any) => u as PantryItem));
}
