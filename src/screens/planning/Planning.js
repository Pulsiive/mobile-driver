import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppStyles } from '../../AppStyles';

function Planning() {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Planning</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 50
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20
  },
  text: {
    fontWeight: 'bold',
    color: AppStyles.color.title,
    fontSize: 20,
    marginBottom: 15
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30
  },
  loginText: {
    color: AppStyles.color.white
  },
  placeholder: {
    color: 'red'
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  shareButton: {
    width: 200,
    backgroundColor: AppStyles.color.facebook,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
    position: 'absolute',
    bottom: 20
  },
  shareText: {
    color: AppStyles.color.white
  }
});

export default Planning;
