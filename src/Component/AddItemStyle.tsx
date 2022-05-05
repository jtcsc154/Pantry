import {StyleSheet} from 'react-native';
import NamedStyles = StyleSheet.NamedStyles;

const Style: NamedStyles<any> = StyleSheet.create({
  space: {
    padding: 20,
    borderWidth: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 60,
    borderColor: '#024a54',
    marginBottom: 10,
  },

  addButton: {
    padding: 8,
    margin: 8,
    backgroundColor: '#23A3E9C3',
    borderRadius: 5,
  },
  clearButton: {
    padding: 8,
    margin: 8,
    backgroundColor: '#f33737',
    borderRadius: 5,
  },
});

export default Style;
