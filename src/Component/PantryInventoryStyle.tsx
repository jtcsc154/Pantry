import {StyleSheet} from 'react-native';
import NamedStyles = StyleSheet.NamedStyles;

const Style: NamedStyles<any> = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
    margin: 20,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 100,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemQuantity: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  navBar: {
    width: 400,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  button: {
    borderRadius: 10,
  },
  lowStockBoarder: {
    borderStyle: 'solid',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
  },
});

export default Style;