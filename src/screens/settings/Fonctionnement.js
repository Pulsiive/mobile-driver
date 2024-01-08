import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Video from 'react-native-video';


const Fonctionnement = ({ navigation }) => {
    const my_video = require('./../../../assets/icons/tuto1.mp4');
    const my_video2 = require('./../../../assets/icons/tuto2.mp4');
    const my_video3 = require('./../../../assets/icons/tuto4.mp4');
  
    // FAQ items with expandable answers
    const [faqItems, setFaqItems] = useState([
      {
        question: 'Quand le montant de ma réservation est-il débité ?',
        answer: 'Votre compte est débité dès que votre réservation est confirmée, mais le proprio ne reçoit l\'argent que 24heures après votre arrivée. Vous avez ainsi le temps de confirmer que la location s\'est bien passée.',
        expanded: false,
      },
      {
        question: 'Dois-je rencontrer le proprio de la borne en personne ?',
        answer: 'En optant pour un chargement autonome, vous minimisez vos contacts avec l\'Owner. Et pour vos échanges, vous pouvez utiliser à tout moment le système de messagerie de l\'application.',
        expanded: false,
      },
      {
        question: 'Que se passe-t-il si je dois annuler en raison d\'un problème avec la borne?',
        answer: 'En cas de problème, vous pouvez généralement trouver une solution en envoyant un message au propriétaire. S\'il ne peut pas vous aider, contactez Pulsiive dans les 24 heures après avoir constaté le problème.',
        expanded: false,
      },
      {
        question: 'Besoin de plus d\'informations?',
        answer: 'Rendez-vous dans notre Centre d\'aide pour obtenir des réponses supplémentaires à vos questions',
        expanded: false,
      },
      // Add more FAQ items as needed
    ]);
  
    const toggleAnswer = (index) => {
      const updatedItems = [...faqItems];
      updatedItems[index].expanded = !updatedItems[index].expanded;
      setFaqItems(updatedItems);
    };
  
    const [expandedItems, setExpandedItems] = useState(Array(faqItems.length).fill(false));

    return (
      <ScrollView style={styles.container}>
        {/* Navigation Section */}
        <View style={styles.navBar}>
          {/* Empty navigation bar */}
        </View>
  
        {/* Title */}
        <Text style={styles.title}>
          Vous n'êtes plus qu'à quelques étapes de votre prochaine location
        </Text>
  
        {/* Video Section */}
        <View style={styles.videoCard}>
            <Video
            source={my_video} // Première vidéo
            style={styles.video}
            resizeMode="contain"
            repeat={true}
            autoplay={true}
            />
        </View>

        {/* Explication de la vidéo 1 */}
        <View style={styles.explanation}>
            <Text style={styles.stepTitle}>1.Découvrez</Text>
            <Text style={styles.stepText}>
            Commencez par découvrir les bornes disponibles autour de chez vous. Utilisez des filtres pour affiner vos recherches (par exemple, type de bornes, notation, privée ou public, distance).
            Vous pouvez aussi enregistrer vos bornes préférées dans vos favoris. 
            </Text>
        </View>

        <View style={{ height: 70 }}></View>

        {/* Video 2 */}
        <View style={styles.videoCard}>
            <Video
            source={my_video2} // Deuxième vidéo
            style={styles.video}
            resizeMode="contain"
            repeat={true}
            autoplay={true}
            />
        </View>

        {/* Explication de la vidéo 2 */}
        <View style={styles.explanation}>
            <Text style={styles.stepTitle}>2.Réservez</Text>
            <Text style={styles.stepText}>
            Dès que vous trouvez la borne qui vous convient, apprenez-en davantage sur le propriétaire, lisez les commentaires d'anciens utilisateurs, vérifiez les disponibilités et les 
            créneaux disponibles, puis réservez en quelques clics
            </Text>
        </View>

        <View style={{ height: 70 }}></View>

        {/* Video 3 */}
        <View style={styles.videoCard}>
            <Video
            source={my_video3} // Troisième vidéo
            style={styles.video}
            resizeMode="contain"
            repeat={true}
            autoplay={true}
            />
        </View>

        {/* Explication de la vidéo 3 */}
        <View style={styles.explanation}>
            <Text style={styles.stepTitle}>3.Partez</Text>
            <Text style={styles.stepText}>
            Vous avez terminé! Échanger avec votre le propriétaire dans l'application pour obtenir des précisions, des réponses à vos questions ou des conseils. Vous pouvez aussi contacter 
            Pulsiive à tout moment pour obtenir plus d'aide.
            </Text>
        </View>

        <View style={{ height: 60 }}></View>


        {/* FAQ Section */}
        <View style={styles.faq}>
            <Text style={styles.faqTitle}>Vous avez encore des questions ?</Text>

            {faqItems.map((item, index) => (
                <View key={index} style={styles.faqQuestionContainer}>
                    <TouchableOpacity
                    style={styles.faqQuestion}
                    onPress={() => {
                        const updatedExpandedItems = [...expandedItems];
                        updatedExpandedItems[index] = !expandedItems[index];
                        setExpandedItems(updatedExpandedItems);
                    }}
                    >
                    <Text style={styles.faqQuestionText}>{item.question}</Text>
                    <Image
                        source={expandedItems[index] ? require('../../../assets/icons/arrow-up.png') : require('../../../assets/icons/down-arrow.png')}
                        style={styles.faqIcon}
                    />
                    </TouchableOpacity>
                    {expandedItems[index] && (
                    <Text style={styles.faqAnswer}>{item.answer}</Text>
                    )}

                    {/* Question separator line */}
                    {index !== faqItems.length - 1 && <View style={styles.faqQuestionSeparator}></View>}
                </View>
                ))}
            </View>

        <View style={{ height: 200 }}></View>
      </ScrollView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  navBar: {
    height: 50, // Adjust as needed
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 80,
    color: 'black',
  },
//   videoCard: {
//     width: '100%',
//     aspectRatio: 16 / 9,
//     marginBottom: 20,
//   },
  videoCard: {
    alignSelf: 'center',  
    width: '100%',             
    aspectRatio: 1.05,      
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,       // Adjust shadow opacity as needed
    shadowRadius: 2,
    elevation: 4,            // For Android shadow
    backgroundColor: 'white', // Background color of the card
    marginBottom: 40,         // Adjust as needed
  },
  video: {
    flex: 1,
    
  },
  explanation: {
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  stepText: {
    fontSize: 20,
    color: 'black',
  },
  faq: {
    marginTop: 20,
  },
  faqTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 50,
    color: 'black',
    fontWeight: 'bold',
  },
  faqQuestionSeparator: {
    borderBottomColor: '#ccc', // Grey color for the separator line
    borderBottomWidth: 1, // Border width for the separator
    marginTop: 40, // Add space between questions and the separator
  },
  faqQuestionContainer: {
    marginBottom: 10,
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 30,
  },
  faqIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  faqAnswer: {
    fontSize: 18,
    color: 'black',
    marginTop: 20,
  },
});

export default Fonctionnement;
