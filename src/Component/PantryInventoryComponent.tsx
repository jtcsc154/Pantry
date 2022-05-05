import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Linking, NativeTouchEvent,
} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import {FlatGrid} from 'react-native-super-grid';
import Style from './PantryInventoryStyle';
import {PantryItem} from '../PantryItem';
import {useStateValue} from '../State/StateContext';
import {deletePantryItem, editPantryItem, shufflePantry} from '../State/Reducer';
import {SafeAreaView} from 'react-native-safe-area-context';

//@ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const PantryInventoryComponent: React.FC<Props> = (props: Props) => {
  // @ts-ignore
  const [{pantry, shuffleKey}, dispatch] = useStateValue();
  const [button, setButton] = useState('sort-alphabetical-ascending');

  const onLongPress = (item: PantryItem) => {
    const url =
      'https://www.harristeeter.com/search?' +
      new URLSearchParams({
        query: item.name,
        searchType: 'default_search',
      });

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  const onShortPress = (item: PantryItem) => {
    dispatch(editPantryItem(item.barcode));
    props.navigation.navigate('Add');
  };

  const onDelete = (event: any, item: PantryItem) => {
    dispatch(deletePantryItem(item));
  };

  React.useLayoutEffect(() => {
    const shuffleMode = {
      name: 'sort-alphabetical-ascending',
      quantity: 'sort-numeric-ascending',
      lowStock: 'sort-numeric-descending-variant',
      expirationDate: 'sort-calendar-ascending',
    };

    // @ts-ignore
    props.navigation.setOptions({
      headerRight: () => (
        <SafeAreaView>
          <TouchableOpacity
            style={{right: 20}}
            onPress={() => {
              dispatch(shufflePantry());
              setButton(shuffleMode[shuffleKey]);
            }}>
            <MaterialCommunityIcons name={button} color="black" size={26} />
          </TouchableOpacity>
        </SafeAreaView>
      ),
    });
  }, [dispatch, shuffleKey, props, button]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <FlatGrid
          itemDimension={130}
          data={pantry}
          style={Style.gridView}
          spacing={10}
          renderItem={({item}: {item: PantryItem}) => (
            <TouchableHighlight
              onPress={() => onShortPress(item)}
              onLongPress={() => onLongPress(item)}
              underlayColor="white">
              <View
                style={[Style.itemContainer, {backgroundColor: item.color}]}>
                {item.quantity <= item.lowStock && (
                  <EvilIcons
                    style={Style.lowQuantity}
                    name="exclamation"
                    color="white"
                    size={22}
                  />
                )}
                <Text style={Style.itemName}>{item.name}</Text>
                <Text style={Style.itemQuantity}>{item.quantity}</Text>
                <TouchableOpacity style={Style.trashCan} onPress={event => onDelete(event, item)}>
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    color="white"
                    size={22}
                  />
                </TouchableOpacity>
              </View>
            </TouchableHighlight>
          )}
        />
        <View style={Style.navBar} />
      </View>
    </View>
  );
};

export default PantryInventoryComponent;
