import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { AppStyles, useTheme } from '../AppStyles';
import TextTitle from './TextTitle';
import TextSubTitle from './TextSubTitle';

{
  /*
  <ModalSwipeUp
    title(optional)="Title" // title in the header
    visible(required)={modalVisible} // booleen to display or not the modal
    onClose(required)={() => onPress()} // function called when the modal is closed
    closeButton(optional)={true} // to display or not the close button
  >
    insert content here
  </ModalSwipeUp>
  */
}

const ModalSwipeUp = ({
  title,
  visible,
  onClose,
  children,
  closeButton,
  bottom,
  bottomChildren,
  style
}) => {
  const { AppColor } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppStyles.color.overlay,
      justifyContent: 'flex-end'
    },
    modalContainer: {
      maxHeight: '80%',
      minHeight: '30%',
      backgroundColor: AppColor.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20
    },
    contentContainer: {
      paddingHorizontal: 20,
      paddingTop: 10
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: AppColor.bottomColor,
      borderBottomColor: AppColor.separator,
      borderBottomWidth: 1,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20
    },
    closeButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 30,
      height: 30,
      borderRadius: 100,
      backgroundColor: AppColor.background
    },
    bottomContainer: {
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: AppColor.separator,
      backgroundColor: AppColor.background
    }
  });

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.container}>
        <View
          style={{
            ...styles.modalContainer,
            ...(style || {})
          }}
        >
          {(title || closeButton) && (
            <View style={styles.header}>
              {title ? <TextSubTitle title={title} style={{ marginLeft: 10 }} /> : <View></View>}
              {closeButton && (
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Icon name="cross" size={20} color={AppColor.subText} />
                </TouchableOpacity>
              )}
            </View>
          )}
          <ScrollView>
            <View style={styles.contentContainer}>{children}</View>
          </ScrollView>
        </View>
        {bottom && <View style={styles.bottomContainer}>{bottomChildren}</View>}
      </View>
    </Modal>
  );
};

export default ModalSwipeUp;
