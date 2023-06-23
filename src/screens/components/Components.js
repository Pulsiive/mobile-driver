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
  const [test, setTest] = useState('');
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const checkForErrors = (input) => {
    if (input == '') return 'Vide';
    if (input == 'erreur') return 'Oui en effet erreur';
  };

  return (
    <ScrollView style={styles.container}>
      <TextTitle title="Ma liste de composants" />
      <TextError title="Un exemple d'erreur" />
      <ButtonCommon title="Modal 1" onPress={() => setModalVisible1(true)} />
      <ModalSwipeUp
        visible={modalVisible1}
        onClose={() => setModalVisible1(false)}
        closeButton={true}
      >
        <TextTitle title="Exemple de modal avec croix" style={{ marginLeft: 0 }} />
        <ButtonCommon title="Annuler" onPress={() => setModalVisible1(false)} />
      </ModalSwipeUp>

      <ButtonCommon title="Modal 2" onPress={() => setModalVisible2(true)} />
      <ModalSwipeUp
        visible={modalVisible2}
        onClose={() => setModalVisible2(false)}
        closeButton={false}
      >
        <TextTitle title="Exemple de modal sans croix" style={{ marginLeft: 0 }} />
        <ButtonCommon title="Annuler" onPress={() => setModalVisible2(false)} />
      </ModalSwipeUp>
      <InputFieldMultiple
        labels={['Nom', 'E-mail', 'Test']}
        errorChecks={[checkForErrors, checkForErrors, checkForErrors]}
        setValues={[setName, setEmail, setTest]}
        secures={[false, false, true]}
      />
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
        secure={true}
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
      <ButtonTouchable
        title="Test avec subtext"
        subtext="Je test le subtext"
        icon="awareness-ribbon"
      />
      <ButtonTouchable title="Test 1" icon="awareness-ribbon" />
      <ButtonTouchable title="Test 2" icon="awareness-ribbon" />
      <ButtonTouchable title="Test 3" icon="awareness-ribbon" />
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
