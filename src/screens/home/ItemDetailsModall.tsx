import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {Children} from 'react';
import Modal from 'react-native-modal';

import CustomIcon from '../../components/CustomIcon';
import MainStyles from '../../constant/MainStyles';

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  title?: string;
  children?: any;
  onPress?: () => void;
};

export default function ModalLayout({
  visible,
  setVisible,
  title,
  children,
  onPress,
}: Props) {
  return (
    <Modal
      isVisible={visible}
      accessible={false}
      animationIn={'fadeInUpBig'}
      animationOut={'fadeOutDownBig'}
      animationInTiming={500}
      animationOutTiming={500}>
      <View
        style={{
          backgroundColor: 'rgba(229, 228, 226, 0.8)',
          paddingVertical: 20,
          borderRadius: 10,
          maxHeight: 800,
        }}>
        <TouchableOpacity onPress={onPress}>
          <CustomIcon
            type="AntDesign"
            icon="close"
            color="red"
            size={40}
            style={{alignSelf: 'flex-end', right: 15, top: -5}}
          />
        </TouchableOpacity>
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              textAlign: 'center',
              color: MainStyles.COLORS.DARK_BLUE,
            }}>
            Item Details
          </Text>
        </View>
        <View>
          <ScrollView style={{marginTop: 30, marginBottom: 60}}>
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
