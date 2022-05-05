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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginTop: 10,
    elevation: 3,
    backgroundColor: '#47A025',
  },
  clearButton: {
    padding: 8,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginTop: 10,
    elevation: 3,
    backgroundColor: '#CC2936',
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default Style;
