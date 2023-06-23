import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { AppStyles } from '../AppStyles';

{
  /*
  <ModalSwipeUp
    visible(required)={modalVisible} // booleen to display or not the modal
    onClose(required)={() => onPress()} // function called when the modal is closed
    closeButton(optional)={true} // to display or not the close button
  >
    insert content here
  </ModalSwipeUp>
  */
}

const ModalSwipeUp = ({ visible, onClose, children, closeButton }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          {closeButton && (
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name="cross" size={20} color="black" />
            </TouchableOpacity>
          )}
          <View style={styles.contentContainer}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.overlay,
    justifyContent: 'flex-end'
  },
  modalContainer: {
    backgroundColor: AppStyles.color.lightmode,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 36
  },
  closeButton: {
    top: 10,
    left: 10,
    padding: 10,
    paddingBottom: 0
  }
});

export default ModalSwipeUp;
