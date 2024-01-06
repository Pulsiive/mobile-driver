import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const PromoCodesPage = () => {
    // Étape 1: Déclaration des états
  const [promoCodes, setPromoCodes] = useState([
    { code: 'CODE1', discount: 0.2, expiration_date: new Date('2023-12-31') },
    { code: 'CODE2', discount: 0.1, expiration_date: new Date('2023-10-31') },
    { code: 'CODE3', discount: 0.3, expiration_date: new Date('2024-01-31') },
    { code: 'ELECTRICBIRTHDAY', discount: 0.2, expiration_date: new Date('2024-04-30') },
    { code: 'ELECTRIC777', discount: 0.1, expiration_date: new Date('2024-02-25') },
    { code: 'ELECTRIC111', discount: 0.3, expiration_date: new Date('2024-03-18') },
    { code: 'ELECTRIC333', discount: 0.2, expiration_date: new Date('2024-04-21') },
    { code: 'PULSIIVEPROMO1', discount: 0.1, expiration_date: new Date('2024-10-31') },
    { code: 'PULSIIVEPROMO2', discount: 0.3, expiration_date: new Date('2024-11-30') },
    { code: 'PULSIIVEPROMO3', discount: 0.2, expiration_date: new Date('2024-12-31') },
    { code: 'PULSIIVEPROMO7', discount: 0.1, expiration_date: new Date('2024-09-30') },
    { code: 'ELECNEWYEAR1', discount: 0.3, expiration_date: new Date('2023-01-15') },
    { code: 'ELECNEWYEAR123', discount: 0.3, expiration_date: new Date('2023-01-30') },
    { code: 'ELECNEWYEAR1234', discount: 0.3, expiration_date: new Date('2023-03-20') },
    { code: 'ELECNEWYEAR99', discount: 0.3, expiration_date: new Date('2023-04-20') },
    { code: 'ELECNEWYEAR97', discount: 0.3, expiration_date: new Date('2023-05-31') },
  ]);

  const [filteredPromoCodes, setFilteredPromoCodes] = useState(promoCodes);
  const [searchText, setSearchText] = useState('');
  const [selectedPromoCode, setSelectedPromoCode] = useState(null);

  const handleSearch = (text) => {
    setSearchText(text);

    const filteredCodes = promoCodes.filter((promoCode) =>
      promoCode.code.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPromoCodes(filteredCodes);
  };

  const handlePromoCodePress = (code) => {
    setSelectedPromoCode(code);
  };

  const renderPromoCode = ({ item }) => {
    const isActive = item.code === selectedPromoCode;
    const isExpired = item.expiration_date < new Date();

    const promoCodeContainerStyle = isActive
      ? [styles.activePromoCodeContainer, isExpired ? styles.expiredPromoCodeContainer : null]
      : styles.promoCodeContainer;

    const promoCodeTextStyle = isActive
      ? [styles.activePromoCodeText, isExpired ? styles.expiredPromoCodeText : null]
      : styles.promoCodeText;

    const promoCodeIcon = isExpired ? '❌' : '✅';

    return (
      <TouchableOpacity style={promoCodeContainerStyle} onPress={() => handlePromoCodePress(item.code)}>
        <Text style={promoCodeTextStyle}>{promoCodeIcon} {item.code}</Text>
        <Text style={promoCodeTextStyle}>{item.discount * 100}% off</Text>
        <Text style={promoCodeTextStyle}>Expires on: {item.expiration_date.toDateString()}</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListText}>No promo codes found.</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
    {/* espace vide pour laisser de la place pour le bouton de retour */}
      <View style={styles.emptySpace}></View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search promo codes..."
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredPromoCodes}
        renderItem={renderPromoCode}
        keyExtractor={(item) => item.code}
        ListEmptyComponent={renderEmptyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F8F8',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  // style pour l'espace vide
  emptySpace: {
    height: 50, // Réglez la hauteur en fonction de l'espace souhaité
  },
  promoCodeContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000', // Étape 1: Ajout de l'ombre
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activePromoCodeContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#65D682', // Modifier la couleur de bordure en vert (#65D682)
  },
  expiredPromoCodeContainer: {
    borderWidth: 1,
    borderColor: '#FF4444',
  },
  promoCodeText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333333', // Étape 2: Utilisation de couleurs plus sombres pour le texte
  },
  activePromoCodeText: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#65D682',
  },
  expiredPromoCodeText: {
    color: '#FF4444',
    textDecorationLine: 'line-through',  // pour barer le texte en rouge
  },
  emptyListContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListText: {
    fontSize: 16,
    color: '#808080',
  },
});

export default PromoCodesPage;
