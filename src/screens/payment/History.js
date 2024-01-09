import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';

import Backend from '../../db/Backend';
import { AppIcon } from '../../AppStyles';
import { showMessage } from 'react-native-flash-message';

import * as Animatable from 'react-native-animatable';

const History = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState(null);
  const [selectedPaymentFilter, setSelectedPaymentFilter] = useState(null);

  const [payments, setPayments] = useState([]);
  const [profile, setProfile] = useState([]);

  // Exemple de données d'historique de commandes
  const mockOrders = [
    {
      id: 1,
      moyenPaiement: 'VISA',
      utilisateur: 'John Doe',
      date: '2023-06-20',
      typeBorneElectrique: 'Type A',
      numeroCommande: 'CMD12345',
      montant: 50.99
    },
    {
      id: 2,
      moyenPaiement: 'Paypal',
      utilisateur: 'Jane Smith',
      date: '2023-06-19',
      typeBorneElectrique: 'Type B',
      numeroCommande: 'CMD23456',
      montant: 32.50
    },
    {
      id: 3,
      moyenPaiement: 'Stripe',
      utilisateur: 'Alice Johnson',
      date: '2023-06-18',
      typeBorneElectrique: 'Type A',
      numeroCommande: 'CMD34567',
      montant: 78.00
    },
    // Ajoutez d'autres exemples d'objets de commande ici
    {
      id: 4,
      moyenPaiement: 'Apple Pay',
      utilisateur: 'Robert Williams',
      date: '2023-06-17',
      typeBorneElectrique: 'Type C',
      numeroCommande: 'CMD45678',
      montant: 42.75
    },
    {
      id: 5,
      moyenPaiement: 'VISA',
      utilisateur: 'Emily Davis',
      date: '2023-06-16',
      typeBorneElectrique: 'Type B',
      numeroCommande: 'CMD56789',
      montant: 64.90
    },
    {
      id: 6,
      moyenPaiement: 'Stripe',
      utilisateur: 'Michael Johnson',
      date: '2023-06-15',
      typeBorneElectrique: 'Type A',
      numeroCommande: 'CMD67890',
      montant: 38.20
    },
    {
      id: 7,
      moyenPaiement: 'Apple Pay',
      utilisateur: 'Sophia Anderson',
      date: '2023-06-14',
      typeBorneElectrique: 'Type C',
      numeroCommande: 'CMD78901',
      montant: 52.40
    },
    {
      id: 8,
      moyenPaiement: 'Paypal',
      utilisateur: 'Oliver Wilson',
      date: '2023-06-13',
      typeBorneElectrique: 'Type B',
      numeroCommande: 'CMD89012',
      montant: 27.80
    },
    {
      id: 9,
      moyenPaiement: 'VISA',
      utilisateur: 'Ava Taylor',
      date: '2023-06-12',
      typeBorneElectrique: 'Type A',
      numeroCommande: 'CMD90123',
      montant: 61.75
    },
    {
      id: 10,
      moyenPaiement: 'Stripe',
      utilisateur: 'Noah Clark',
      date: '2023-06-11',
      typeBorneElectrique: 'Type C',
      numeroCommande: 'CMD01234',
      montant: 45.60
    },
  ];

  useEffect(() => {
    // Mettez à jour les commandes filtrées en fonction des filtres sélectionnés
    let filtered = orders;

    if (selectedTypeFilter) {
        filtered = filtered.filter(order => order.typeBorneElectrique === selectedTypeFilter);
    }

    if (selectedPaymentFilter) {
      filtered = filtered.filter(order => order.moyenPaiement === selectedPaymentFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.numeroCommande.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  }, [selectedTypeFilter, selectedPaymentFilter, searchQuery, orders]);


    const updateMockOrdersWithPayments = () => {
        // Créez une copie de mockOrders pour éviter de modifier l'état directement
        const updatedOrders = [...mockOrders];

        // Boucle sur tous les paiements
        payments.forEach(payment => {
        // Créez une nouvelle instance de commande avec les informations de paiement
        const newOrder = {
            id: payment.id,
            moyenPaiement: payment.provider,
            utilisateur: profile?.firstName,
            date: payment.date,
            typeBorneElectrique: 'Type A', // Vous pouvez définir le type de borne électrique souhaité ici
            numeroCommande: payment.id,
            montant: payment.amount
        };

        // Ajoutez la nouvelle commande à la liste
        updatedOrders.push(newOrder);
        });

        // Mettez à jour l'état des commandes avec la liste mise à jour
        setOrders(updatedOrders);
    };


    useEffect(() => {
        const fetchPayments = async () => {
            const {data, status} = await Backend.getPayments();
            if (status === 200)
                setPayments(data);
        }

        const getProfile = async () => {
            const response = await Backend.me();

            if (response.status === 200) {
                setProfile(response.data);
                showMessage({
                    message: `Balance récupéré avec succès`,
                    type: "success",
                    backgroundColor: "green"
                });
            } else {
                showMessage({
                    message: 'Impossible de récupérer la balance',
                    type: "error",
                    backgroundColor: "red"
                });
            }
        }

        getProfile();

        fetchPayments();
    }, []);

    useEffect(() => {
        // Ici, vous pouvez charger les données d'historique de commandes à partir d'une source externe
        // Par exemple, une API
        setOrders(mockOrders);

        // Mettez à jour mockOrders avec des informations de paiement si les paiements sont disponibles
        if (payments.length > 0) {
          updateMockOrdersWithPayments();
        }
      }, [payments]);


  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
    <Animatable.View animation="fadeInRight" duration={7000}>
      <Text style={[styles.orderInfo, { fontWeight: 'bold', fontSize: 16 }]}>Numéro de commande : {item.numeroCommande} </Text>
      <Text style={styles.orderInfo}>Moyen de paiement : <Text style={{ fontWeight: 'bold' }}>{item.moyenPaiement}</Text> </Text>
      <Text style={styles.orderInfo}>Utilisateur : {item.utilisateur} </Text>
      <Text style={styles.orderInfo}>Date : {item.date} </Text>
      <Text style={styles.orderInfo}>Type de borne électrique : <Text style={{ fontWeight: 'bold' }}>{item.typeBorneElectrique}</Text></Text>
      <Text style={[styles.orderInfo, { fontSize: 18 }]}>Montant : <Text style={{ fontWeight: 'bold' }}>{item.montant}€</Text> </Text>
      </Animatable.View>
    </View>
  );

  const clearFilters = () => {
    setSelectedTypeFilter(null);
    setSelectedPaymentFilter(null);
    setSearchQuery('');
  };

  const [showFilters, setShowFilters] = useState(false);


  return (
    <View style={styles.container}>

        <Text style={styles.pageTitle}>Mon Historique de paiements</Text>
        {/* Section utilisateur */}
        <View style={styles.userSection}>
          <View style={styles.userIcon} >
              <Animatable.Image animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.userIconImage} source={AppIcon.images.profile}></Animatable.Image>
          </View>
        <View style={styles.userInfo}>
            <Text style={styles.userName}>{profile?.firstName}</Text>
            <Text style={styles.userId}>User Id: {profile?.id}</Text>
        </View>
        </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher une commande..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />


        <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.toggleFiltersButton} onPress={() => setShowFilters(!showFilters)}>
            <Text style={styles.toggleFiltersButtonText}>{showFilters ? 'Cacher les filtres' : 'Afficher les filtres'}</Text>
        </TouchableOpacity>
        <View style={styles.filtersSection}>
        {showFilters && (
            <>
            {/* Vos composants de filtres et bouton "Effacer les filtres" ici */}
                <View style={styles.filterContainer}>
                <View style={styles.filterButtonContainer}>
                    <TouchableOpacity
                        style={[styles.filterButton, selectedTypeFilter === 'Type A' && styles.selectedFilterButton]}
                        onPress={() => setSelectedTypeFilter('Type A')}
                        >
                        <Text style={[styles.filterButtonText, selectedTypeFilter === 'Type A' && styles.selectedFilterButtonText]}>
                            A
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={[styles.filterButton, selectedTypeFilter === 'Type B' && styles.selectedFilterButton]}
                        onPress={() => setSelectedTypeFilter('Type B')}
                        >
                        <Text style={[styles.filterButtonText, selectedTypeFilter === 'Type B' && styles.selectedFilterButtonText]}>
                            B
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={[styles.filterButton, selectedTypeFilter === 'Type C' && styles.selectedFilterButton]}
                        onPress={() => setSelectedTypeFilter('Type C')}
                        >
                        <Text style={[styles.filterButtonText, selectedTypeFilter === 'Type C' && styles.selectedFilterButtonText]}>
                            C
                        </Text>
                    </TouchableOpacity>
                </View>
                </View>

                <View style={styles.filterContainer}>
                <View style={styles.filterButtonContainer}>
                    <TouchableOpacity
                    style={[styles.filterButton, selectedPaymentFilter === 'VISA' && styles.selectedFilterButton]}
                    onPress={() => setSelectedPaymentFilter('VISA')}
                    >
                    <Text style={[styles.filterButtonText, selectedPaymentFilter === 'VISA' && styles.selectedFilterButtonText]}>
                        VISA
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.filterButton, selectedPaymentFilter === 'Paypal' && styles.selectedFilterButton]}
                    onPress={() => setSelectedPaymentFilter('Paypal')}
                    >
                    <Text style={[styles.filterButtonText, selectedPaymentFilter === 'Paypal' && styles.selectedFilterButtonText]}>
                        Paypal
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.filterButton, selectedPaymentFilter === 'Stripe' && styles.selectedFilterButton]}
                    onPress={() => setSelectedPaymentFilter('Stripe')}
                    >
                    <Text style={[styles.filterButtonText, selectedPaymentFilter === 'Stripe' && styles.selectedFilterButtonText]}>
                        Stripe
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.filterButton, selectedPaymentFilter === 'Apple Pay' && styles.selectedFilterButton]}
                    onPress={() => setSelectedPaymentFilter('Apple Pay')}
                    >
                    <Text style={[styles.filterButtonText, selectedPaymentFilter === 'Apple Pay' && styles.selectedFilterButtonText]}>
                        Apple Pay
                    </Text>
                    </TouchableOpacity>
                </View>
                </View>

                <View style={styles.filterButtonContainer}>
                <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
                    <Text style={styles.clearFiltersButtonText}>Effacer les filtres</Text>
                </TouchableOpacity>
                </View>
            </>
        )}
            </View>
        </View>


      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.orderList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  pageTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#2F313E',
    marginBottom: 16,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userIcon: {
    height: 55,
    width: 55,
    borderRadius: 30,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userIconImage: {
    width: 40, // Adjust the width as needed
    height: 40, // Adjust the height as needed
    resizeMode: 'contain', // Adjust the resizeMode as needed
  },
  userInfo: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 12,
  },
  userName: {
    color: 'black',
    fontSize: 16,
  },
  userId: {
    color: 'black',
    fontSize: 12,
    marginTop: 2,
  },
  searchInput: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  filterContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#DDDDDD',
    marginHorizontal: 4,
    borderRadius: 8,
  },
  selectedFilterButton: {
    backgroundColor: '#7ED321', // Couleur verte pour le filtre sélectionné
  },
  selectedFilterButtonText: {
    color: '#FFFFFF', // Couleur du texte pour le filtre sélectionné
  },
  filterButtonText: {
    color: '#333333',
  },
  orderList: {
    flexGrow: 1,
  },
//   orderItem: {
//     backgroundColor: '#F5F5F5',
//     marginBottom: 16,
//     padding: 16,
//     borderRadius: 8,
//     shadowColor: '#7ED321', // Couleur de l'ombre
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.8, // Opacité de l'ombre
//     shadowRadius: 4, // Rayon de l'ombre
//     elevation: 5, // Effet d'élévation pour Android
//   },
    orderItem: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  orderInfo: {
    marginBottom: 8,
    flexDirection: 'row', // Aligner le texte avec l'icône horizontalement
    alignItems: 'center', // Aligner le texte avec l'icône verticalement
  },
  clearFiltersButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 6, // Réduire cette valeur pour diminuer la hauteur du bouton
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  clearFiltersButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  toggleFiltersButton: {
    backgroundColor: '#DDDDDD',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  toggleFiltersButtonText: {
    color: '#333333',
  },
  filterSection: {
    alignItems: 'center',
  },
  filterGroup: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  filterButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
});

export default History;
