import React, { useEffect, useRef, useState } from 'react';
import {View, StyleSheet, Text, Animated, Button} from 'react-native';
import { addDays, getDate, getMonth, startOfWeek, format, isSameDay, addMonths } from 'date-fns';
import {TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import { fr } from 'date-fns/locale'
import Backend from '../../db/Backend';

const DateChoicer = ({date, onChange, setModalVisible, setSlot, stationId}) => {
    const [week, setWeek] = useState([]);
    const [slots, setSlots] = useState([]);

    var formattedDate = format(date, 'Pp').split(',')[0];

        useEffect(() => {
            const fetchSlots = async () => {
                const {data, status} = await Backend.getSlots(stationId);
                if (status === 200)
                    setSlots(data);
            }
            fetchSlots();
            const weekDays = getWeekDays(date);

            setWeek(weekDays);
    },[date]);
    return (
            <View style={styles.container}>
                {week.map(weekDay => {
                    const textStyles = [styles.label];
                    const touchable = [styles.touchable];
                    const display = [styles.display];
                    const schedule = [styles.schedule];
                    const sameDay = isSameDay(weekDay.date, date);
                    if (sameDay) {
                        touchable.push(styles.selectedTouchable);
                        display.push(styles.selectedDisplay);
                        textStyles.push(styles.selectedLabel);
                        schedule.push(styles.selectedschedule);

                    }
                    return (
                        <View style={styles.weekDayItem} key={weekDay.formatted}>
                            <TouchableHighlight onPress={() => onChange(weekDay.date)} style={[touchable]}>
                                <Text style={styles.label}>{weekDay.formatted + ' ' + weekDay.day + ' ' + weekDay.month}</Text>
                            </TouchableHighlight>
                                <View style={display}/>
                                <View style={schedule}>
                                    <View style={{left: 10, display:'flex', flexDirection:'row', justifyContent:'flex-start' , backgroundColor:'red', width: 80+'%', height: 10+'%', position: 'absolute', top: 50}}>
                                        {slots.map(slot => {
                                            const opensAtDate = new Date(slot.opensAt);
                                            const closesAtDate = new Date(slot.closesAt);
                                            const opensAt = opensAtDate.toLocaleTimeString('en',
                                                { timeStyle: 'short', hour12: false, timeZone: 'UTC' });
                                            const closesAt = closesAtDate.toLocaleTimeString('en',
                                                { timeStyle: 'short', hour12: false, timeZone: 'UTC' });
                                            if (isSameDay(weekDay.date, opensAtDate) && !slot.isBooked) {
                                                return (
                                                    <View style={[styles.itemContainer]} key={slot.id}>
                                                        {/*<Button style={{color:'black', textAlign:'center', marginTop: 5}}/>{slot.opensAt}*/}
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setSlot(slot);
                                                                setModalVisible();
                                                            }}
                                                        >
                                                            <Text style={{
                                                                fontSize: 11,
                                                                padding: 4,
                                                                marginLeft: 1
                                                            }}>{`${opensAt} - ${closesAt}`}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            }
                                        })}
                                    </View >
                                </View>
                        </View>
                    )
                })}
            </View>
     );
};

 const styles = StyleSheet.create({

     container: {
        // justifyContent: 'space-around',
        // flex:1,
        // position: 'absolute',
        marginTop: 180,
     },
         itemContainer: {
        borderColor: '#7FCB2B',
        borderWidth: 1,
        backgroundColor:'white',
        marginRight: 2,
             textAlign:"center",
        // marginTop: 20,
        width:70+'%',
        height:30,
        borderRadius: 5,
         justifyContent: 'center',
         alignItems: 'flex-start',
         overflow:'hidden',
    },
    schedule: {
        opacity:0,
        position: 'absolute', width:200,
    },
        selectedschedule: {
        opacity:1,
        position: 'absolute', width:150,
        top:-10,
    },
     touchable: {
         borderRadius: 10,
         borderWidth: 1,
         borderColor:'white',
         backgroundColor: '#ffffff1a',
         paddingTop: 9,
         height: 50,
        //  backgroundColor:'red',
         width:360,
     },
     display: {
        opacity: 0,
     },
     selectedDisplay: {
        backgroundColor: 'white',
        width:84+'%',
        height:1,
        position: 'absolute',
        top: 30,
        opacity: 1,
     },
     selectedTouchable: {
         backgroundColor: '#7FCB2B',
         height: 110,
     },
     label: {
         fontSize:14,
         textAlign: 'left',
         marginLeft: 20,
         color:'white',
        textTransform: 'capitalize',
     },
     selectedLabel: {
        fontWeight: '600',
     },
     weekDayItem: {
        //  alignItems: 'center',
        left: 4+'%',
         marginTop: 20,
     },
 });

 export const getWeekDays = (date) => {
     const start = startOfWeek(date, {weekStartsOn: 1});
     const final = [];

     for (let i = 0; i < 7; i++) {
         const date = addDays(start, i);
         final.push({
             formatted: format(date, 'EEEE', { locale: fr }),
             month: format(date, 'MMMM', { locale: fr }),
             date,
             day: getDate(date),
         });
     }
     return final;
 }


export default DateChoicer;
