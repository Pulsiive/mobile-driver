import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { AppStyles, useTheme } from '../../AppStyles';

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
  const { isDarkMode, toggleTheme, AppColor } = useTheme();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkForErrors = (input) => {
    if (input == '') return 'Vide';
    if (input == 'erreur') return 'Oui en effet erreur';
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: AppColor.background
    }
  });

  return (
    <ScrollView style={styles.container}>
      <TextTitle title="Ma liste de composants" />
      <TextError title="Un exemple d'erreur" />
      <ButtonCommon
        title={isDarkMode ? 'Clair' : 'Sombre'}
        style={{ marginVertical: 30 }}
        onPress={() => {
          toggleTheme();
        }}
        loading={loading}
      />
      {/* <ButtonCommon title="Modal 1" onPress={() => setModalVisible1(true)} /> */}
      {/* <ModalSwipeUp
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
      </ModalSwipeUp> */}
      {/* <InputFieldMultiple
        labels={['Nom', 'E-mail', 'Test']}
        errorChecks={[checkForErrors, checkForErrors, checkForErrors]}
        setValues={[setName, setEmail, setTest]}
        secures={[false, false, true]}
      /> */}
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
      <ButtonCommon title="Loading" onPress={() => setLoading(!loading)} />
      <ButtonCommon title="Loading" loading={loading} />
      <ButtonConditional
        title="Condition 1"
        // isEnabled={true}
        // style={{ backgroundColor: AppColor.separator }}
        // onPress={console.log('ok')}
      />
      <ButtonConditional
        title="Condition 2"
        isEnabled={true}
        style={{ backgroundColor: AppColor.error }}
      />
      <ButtonConditional
        title="Condition 2"
        isEnabled={true}
        style={{ backgroundColor: AppColor.secured }}
        loading={loading}
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

export default Components;
