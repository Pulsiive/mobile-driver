import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { AppStyles } from '../../AppStyles';

import {
  ButtonCommon,
  ButtonTouchable,
  InputField,
  InputFieldMultiple,
  ButtonText,
  ButtonConditional,
  TextTitle,
  TextError,
  ModalSwipeUp
} from '../../components';

function Components({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const checkForErrors = (input) => {
    if (input == '') return 'Vide';
    if (input == 'erreur') return 'Oui en effet erreur';
  };

  return (
    <ScrollView style={styles.container}>
      <TextTitle title="Ma liste de composants" />
      <TextError title="Un exemple d'erreur" />
      <ButtonCommon title="Modal" onPress={() => setModalVisible(true)} />

      <ModalSwipeUp
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        closeButton={true}
      >
        <TextTitle title="Exemple de modal" style={{ marginLeft: 0 }} />
        <ButtonCommon title="Annuler" onPress={() => setModalVisible(false)} />
      </ModalSwipeUp>
      <InputFieldMultiple
        labels={['Nom', 'E-mail']}
        errorChecks={[checkForErrors, checkForErrors]}
        setValues={[setName, setEmail]}
        subText="Assurez vous que les informations soient similaires à celles figurantes sur votre carte d'identité"
      />
      <InputField
        label="Nom"
        errorCheck={checkForErrors}
        subText="Veuillez entrer votre nom"
        setValue={setName}
      />
      <InputField
        label="E-mail"
        errorCheck={checkForErrors}
        subText="Veuillez entrer votre adresse mail"
        setValue={setEmail}
      />
      <ButtonCommon title="M'inscrire" />
      <ButtonConditional
        title="Condition 1"
        // isEnabled={true}
        // style={{ backgroundColor: AppStyles.color.lightgrey }}
        // onPress={console.log('ok')}
      />
      <ButtonConditional
        title="Condition 2"
        isEnabled={true}
        style={{ backgroundColor: AppStyles.color.error }}
      />
      <ButtonTouchable title="Test" subtext="Je test le subtext" icon="awareness-ribbon" />
      <ButtonTouchable title="Test" icon="awareness-ribbon" />
      <ButtonTouchable
        title="Touchable"
        subtext="Je test le subtext avec un text long pour voir si ça rend bien Je test le subtext avec un text long pour voir si ça rend bien"
        // icon="back-in-time"
      />
      <ButtonText title="Modifier" style={{ margin: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.lightmode
  }
});

export default Components;
