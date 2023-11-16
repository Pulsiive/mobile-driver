import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppStyles, useTheme } from '../../AppStyles';
import { ScrollView } from 'react-native-gesture-handler';
import Backend from '../../db/Backend';
import Icon from 'react-native-vector-icons/Entypo';
import {
  Badge,
  ButtonCommon,
  FilterTab,
  FloatingNormalCard,
  Separator,
  TextContent,
  TextSubTitle,
  TextTitle
} from '../../components';
import { format, parseISO, compareDesc, isPast, isFuture } from 'date-fns';
import { fr } from 'date-fns/locale';

const ReservationCard = ({ reservations }) => {
  const { AppColor } = useTheme();

  function getBadgeProperties(reservation) {
    if (isPast(parseISO(reservation.opensAt))) {
      return {
        title: 'Passée',
        icon: 'check',
        color: AppColor.bottomColor
      };
    } else if (!reservation.isBooked) {
      return {
        title: 'En attente',
        icon: 'hour-glass',
        color: AppColor.rate
      };
    } else {
      return {
        title: 'À venir',
        icon: 'time-slot',
        color: AppColor.pulsive
      };
    }
  }

  const badgeProps = getBadgeProperties(reservations);

  return (
    <FloatingNormalCard
      key={reservations.id}
      style={{ paddingHorizontal: 20, paddingBottom: 20, paddingTop: 15 }}
    >
      <View style={{ height: 80 }}>
        <TextSubTitle
          title={'Borne de ' + reservations.owner}
          style={{ marginBottom: 16, fontSize: AppStyles.fontSize.contentTitle }}
        />
        <Badge
          title={badgeProps.title}
          icon={badgeProps.icon}
          style={{ backgroundColor: badgeProps.color }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="calendar" size={15} color={AppColor.title} />
          <Text style={{ color: AppColor.title, marginLeft: 5 }}>{reservations.dateTemp}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="clock" size={15} color={AppColor.title} />
          <Text style={{ color: AppColor.title, marginLeft: 4 }}>{reservations.slotTime}</Text>
        </View>
      </View>
    </FloatingNormalCard>
  );
};
function Planning({ navigation }) {
  const { AppColor } = useTheme();

  const [reservationsFetch, setReservationsFetch] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [filter, setFilter] = useState(0);

  function formatReservationDate(dateString) {
    const date = parseISO(dateString);
    return format(date, 'EEEE dd MMMM yyyy', { locale: fr });
  }

  function formatReservationTime(startString, endString) {
    const startTime = parseISO(startString);
    const endTime = parseISO(endString);
    return `${format(startTime, 'HH:mm', { locale: fr })} - ${format(endTime, 'HH:mm', {
      locale: fr
    })}`;
  }

  useEffect(() => {
    async function fetchReservations() {
      try {
        const res = await Backend.getReservations();
        // console.log(JSON.stringify(res.data, null, '\t'));
        if (res.status === 200) {
          const sortedReservations = res.data.sort((a, b) =>
            compareDesc(parseISO(a.opensAt), parseISO(b.opensAt))
          );
          let slotParsed = await Promise.all(
            sortedReservations.map(async (slot) => {
              const owner = await Backend.getUserFromId(slot.driverId);
              return {
                ...slot,
                dateTemp: formatReservationDate(slot.opensAt),
                slotTime: formatReservationTime(slot.opensAt, slot.closesAt),
                owner: owner.data.firstName
              };
            })
          );
          console.log(JSON.stringify(slotParsed, null, '\t'));
          setReservationsFetch(slotParsed);
        } else {
          throw new Error(`Erreur lors de la récupération des réservations : ${res.status}`);
        }
      } catch (e) {
        console.error(e);
        alert('Une erreur est survenue lors de la récupération des réservations.');
      }
    }
    fetchReservations();
  }, []);

  useEffect(() => {
    let filteredReservations = [];

    switch (filter) {
      case 1:
        filteredReservations = reservationsFetch.filter((reservation) => !reservation.isBooked);
        break;
      case 2:
        filteredReservations = reservationsFetch.filter(
          (reservation) => isFuture(parseISO(reservation.opensAt)) && reservation.isBooked
        );
        break;
      case 3:
        filteredReservations = reservationsFetch.filter((reservation) =>
          isPast(parseISO(reservation.opensAt))
        );
        break;
      default:
        filteredReservations = [...reservationsFetch];
    }

    setReservations(filteredReservations);
  }, [filter, reservationsFetch]);

  const styles = StyleSheet.create({
    container: { backgroundColor: AppColor.background, paddingTop: 30 },
    planning: {
      paddingBottom: 30,
      borderBottomColor: AppColor.separator,
      borderBottomWidth: 1
    }
  });

  return (
    <View style={[AppStyles.container, styles.container]}>
      <TextTitle title="Vos réservations" style={{ marginBottom: 0 }} />
      {reservations ? (
        <>
          <View style={styles.planning}>
            <FilterTab
              options={[
                { title: 'Toutes', value: 0 },
                { title: 'En attente', value: 1 },
                { title: 'À venir', value: 2 },
                { title: 'Passées', value: 3 }
              ]}
              initValue={filter}
              onPress={(value) => setFilter(value)}
              style={{ marginBottom: 0, marginHorizontal: 0, marginTop: 30 }}
            />
          </View>
          {reservations.length == 0 ? (
            <View style={{ marginHorizontal: 20, marginTop: 0 }}>
              <TextSubTitle title="Rien à voir... pour l'instant !" style={{ marginTop: 30 }} />
              <TextContent
                title="Il n'est jamais trop tard pour remplir votre planning de réservations"
                style={{ marginTop: 10 }}
              />
            </View>
          ) : (
            <ScrollView>
              {reservations.map((plan) => (
                <ReservationCard reservations={plan} />
              ))}
            </ScrollView>
          )}
        </>
      ) : (
        <View style={{ marginHorizontal: 20, marginTop: 0 }}>
          <Separator />
          <TextSubTitle title="Pas de réservations... pour l'instant !" style={{ marginTop: 30 }} />
          <TextContent
            title="Il est temps de vous préparer pour votre premier voyage à bord de Pulsive"
            style={{ marginTop: 10 }}
          />
          <ButtonCommon
            title="Lancer une recherche"
            style={{ width: '60%', alignSelf: 'flex-start', marginLeft: 0, marginTop: 20 }}
            onPress={() => navigation.navigate('Map')}
          />
        </View>
      )}
    </View>
  );
}

export default Planning;
