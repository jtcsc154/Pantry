import React, {useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import Style from './AddItemStyle';
import {useStateValue} from '../State/StateContext';
import {PantryItem} from '../PantryItem';
import {addPantryItem, clearPantryItem} from '../State/Reducer';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const colors = [
  '#36151E',
  '#593F62',
  '#247BA0',
  '#525B76',
  '#8499B1',
  '#62B6CB',
  '#59A96A',
  '#56494E',
  '#272D2D',
  '#DB324D',
  '#7F0799',
  '#1A5E63',
];

function random() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function generateBarcode() {
  return Math.floor(100000000000000 + Math.random() * 9000000000000000);
}

const AddItemComponent: React.FC<Props> = (props: Props) => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();

  // @ts-ignore
  const [barCode, setBarcode] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [exprDate, setExprDate] = useState('');
  const [stock, setStock] = useState('');

  const [color, setColor] = useState(random());
  const mountedRef = useRef(true);

  useEffect(() => {
    const fetchName = async (barcode: string) => {
      const name = await fetch('https://www.brocade.io/api/items/' + barcode)
        .then(r => r.json())
        .then(r => {
          return r.name;
        });
      setItemName(name);
    };

    const fetchBarcode = async (name: string) => {
      const barcode = await fetch(
        'https://www.brocade.io/api/items?' +
          new URLSearchParams({query: name}),
      )
        .then(r => r.json())
        .then(r => {
          return r[0].name;
        });
      setBarcode(barcode);
    };

    if (
      state.item !== undefined &&
      state.item.barcode !== undefined &&
      state.item.name === undefined
    ) {
      fetchName(state.item.barcode);
      setBarcode(state.item.barcode);
    }

    if (state.item !== undefined && state.item.name !== undefined) {
      setBarcode((state.item.barcode ?? generateBarcode()).toString());
      setItemName(state.item.name ?? '');
      if (state.item.barcode === 0 || state.item.barcode === undefined) {
        fetchBarcode(state.item.name);
      }

      setQuantity((state.item.quantity ?? '').toString());
      setPrice(state.item.price ?? '');
      setExprDate(state.item.expirationDate ?? '');
      setStock((state.item.lowStock ?? '').toString());
      setColor(state.item.color ?? '');
    }

    return () => {
      mountedRef.current = false;
    };
  }, [state]);

  const pantryItemFactory = (
    b: string,
    n: string,
    q: string,
    p: string,
    e: string,
    l: string,
    c: string,
  ) =>
    ({
      barcode: Number.parseInt(b, 10),
      name: n,
      quantity: Number.parseInt(q, 10),
      price: p,
      expirationDate: e,
      lowStock: Number.parseInt(l, 10),
      color: c,
    } as PantryItem);

  const handleFormAdd = () => {
    if (
      itemName === '' ||
      quantity === '' ||
      price === '' ||
      exprDate === '' ||
      stock === ''
    ) {
      return;
    }
    dispatch(
      addPantryItem(
        pantryItemFactory(
          barCode,
          itemName,
          quantity,
          price,
          exprDate,
          stock,
          color,
        ),
      ),
    );

    setBarcode('');
    setItemName('');
    setQuantity('');
    setPrice('');
    setExprDate('');
    setStock('');
    props.navigation.navigate('Inventory');
  };

  const handleFormClear = () => {
    dispatch(clearPantryItem());
    setBarcode(generateBarcode().toString());
    setItemName('');
    setQuantity('');
    setPrice('');
    setExprDate('');
    setStock('');
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 25,
          padding: 64,
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <FloatingLabelInput
          label="Item Name"
          value={itemName}
          onChangeText={setItemName}
          containerStyles={Style.space}
        />
        <FloatingLabelInput
          label="Quantity"
          value={quantity}
          keyboardType="numeric"
          onChangeText={setQuantity}
          containerStyles={Style.space}
        />
        <FloatingLabelInput
          label="Price"
          value={price}
          maskType="currency"
          mask="9.99"
          currencyDivider="."
          keyboardType="numeric"
          onChangeText={setPrice}
          containerStyles={Style.space}
        />
        <FloatingLabelInput
          label="Expiration Date"
          value={exprDate}
          maskType="date"
          keyboardType="number-pad"
          mask="99/99/9999"
          onChangeText={setExprDate}
          containerStyles={Style.space}
        />
        <FloatingLabelInput
          label="Low Stock"
          value={stock}
          keyboardType="numeric"
          onChangeText={setStock}
          containerStyles={Style.space}
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={Style.addButton} onPress={handleFormAdd}>
            <Text style={Style.text}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Style.clearButton} onPress={handleFormClear}>
            <Text style={Style.text}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddItemComponent;
