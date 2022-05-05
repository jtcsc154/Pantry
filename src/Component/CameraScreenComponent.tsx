import React from 'react';
import {View} from 'react-native';
import {CameraScreen} from 'react-native-camera-kit';
import {useStateValue} from '../State/StateContext';
import {scannedBarcode} from '../State/Reducer';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const CameraScreenComponent: React.FC<Props> = (props: Props) => {
  // @ts-ignore
  const [, dispatch] = useStateValue();

  const onReadCode = (event: any) => {
    dispatch(scannedBarcode(event.nativeEvent.codeStringValue));
    props.navigation.navigate('Add');
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {/* @ts-ignore */}
      <CameraScreen
        scanBarcode
        showFrame
        frameColor="white"
        onReadCode={onReadCode}
        hideControls
      />
    </View>
  );
};

export default CameraScreenComponent;
