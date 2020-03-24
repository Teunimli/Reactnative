import React, {useEffect, useState} from 'react';
import {
    FlatList,
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ActivityIndicator,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { addCustomers, deleteCustomer } from "../actions";

import ListItem from "./ListItem";

export default function Home(props) {
    const dispatch = useDispatch();
    const { navigation } = props;

    //1 - DECLARE VARIABLES
    const [isFetching, setIsFetching] = useState(false);

    //Access Redux Store State
    const dataReducer = useSelector((state) => state.dataReducer);
    const { customers } = dataReducer;

    //==================================================================================================

    //2 - MAIN CODE BEGINS HERE
    useEffect(() => getData(), []);

    //==================================================================================================

    //3 - GET FLATLIST DATA
    const getData = () => {
        setIsFetching(true);

        //OPTION 1 - LOCAL DATA
        AsyncStorage.getItem('customers', (err, customers) => {
            if (err) alert(err.message);
            else if (customers !== null) dispatch(addCustomers(JSON.parse(customers)));

            setIsFetching(false)
        });
    };

    //==================================================================================================

    //4 - RENDER FLATLIST ITEM
    const renderItem = ({item, index}) => {
        return (
            <ListItem item={item} index={index} navigation={navigation} onDelete={onDelete} onEdit={onEdit}/>
        )
    };

    //==================================================================================================

    //5 - EDIT CUSTOMER
    const onEdit = (item) => {
        navigation.navigate('NewCustomer', {customer: item, title:"Edit Customer"})
    };

    //==================================================================================================

    //6 - DELETE CUSTOMER
    const onDelete = (id) => {

        //OPTION 1 - UPDATE LOCAL STORAGE DATA
        AsyncStorage.getItem('customers', (err, customers) => {
            if (err) alert(err.message);
            else if (customers !== null){
                customers = JSON.parse(customers);

                //find the index of the customer with the id passed
                const index = customers.findIndex((obj) => obj.id === id);

                // remove the customer
                if (index !== -1) customers.splice(index, 1);

                //Update the local storage
                AsyncStorage.setItem('customers', JSON.stringify(customers), () => dispatch(deleteCustomer(id)));
            }
        });
    };

    //==================================================================================================

    //7 - RENDER
    if (isFetching) {
        return (
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator animating={true}/>
            </View>
        );
    } else{
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={customers}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `customers_${index}`}/>

                <TouchableHighlight style={styles.floatingButton}
                                    underlayColor='#003f5c'
                                    onPress={() => navigation.navigate('NewCustomer', {title:"New Customer"})}>
                    <Text style={{fontSize: 25, color: 'white'}}>+</Text>
                </TouchableHighlight>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#003f5c'
    },

    activityIndicatorContainer:{
        backgroundColor: "#003f5c",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    floatingButton:{
        backgroundColor: '#6B9EFA',
        borderColor: '#6B9EFA',
        height: 55,
        width: 55,
        borderRadius: 55 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 60,
        right: 15,
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
});