import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import Style from './PantryInventoryStyle';
import {useStateValue} from '../State/StateContext';
import {editPantryItem, shufflePantry} from '../State/Reducer';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const PantryInventoryComponent: React.FC<Props> = (props: Props) => {
  // @ts-ignore
  const [{pantry}, dispatch] = useStateValue();

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <SafeAreaView>
          <TouchableOpacity
            style={{right: 20}}
            onPress={() => dispatch(shufflePantry())}>
            <MaterialCommunityIcons
              name="shuffle-variant"
              color="black"
              size={26}
            />
          </TouchableOpacity>
        </SafeAreaView>
      ),
    });
  }, [dispatch, props]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <FlatGrid
          itemDimension={130}
          data={pantry}
          style={Style.gridView}
          spacing={10}
          renderItem={({item}) => (
            <TouchableHighlight
              onPress={() => {
                dispatch(editPantryItem(item.barcode));
                props.navigation.navigate('Add');
              }}
              onLongPress={() => {
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
              }}
              underlayColor="white">
              <View
                style={[
                  Style.itemContainer,
                  {backgroundColor: item.color},
                  item.quantity <= item.lowStock ? Style.lowStockBoarder : [],
                ]}>
                <Text style={Style.itemName}>{item.name}</Text>
                <Text style={Style.itemQuantity}>{item.quantity}</Text>
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
