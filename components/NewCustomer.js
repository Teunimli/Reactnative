import React, {useState} from 'react';
import {
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    AsyncStorage
} from 'react-native';

import {useDispatch} from 'react-redux';
import {Header} from 'react-navigation-stack';

import {addCustomer, updateCustomer} from "../actions";


const MAX_LENGTH = 250;

export default function NewCustomer(props) {
    const dispatch = useDispatch();
    const {navigation} = props;

    let customer = navigation.getParam('customer', null);

    //1 - DECLARE VARIABLES
    const [isSaving, setIsSaving] = useState(false);
    const [author, setAuthor] = useState(customer ? customer.author : "");
    const [text, setText] = useState(customer ? customer.text : "");
    const [companyname, setCompanyName] = useState(customer ? customer.companyname : "");
    const [owner, setOwner] = useState(customer ? customer.owner : "");
    const [adres, setAdres] = useState(customer ? customer.adres : "");
    const [phonenumber, setPhoneNumber] = useState(customer ? customer.phonenumber : "");
    const [email, setEmail] = useState(customer ? customer.email : "");

    //==================================================================================================

    //2 - GET FLATLIST DATA
    const onSave = () => {
        let edit = customer !== null;
        let customer_ = {};

        if (edit) {
            customer_ = customer;
            customer_['author'] = author;
            customer_['text'] = text;
            customer_['companyname'] = companyname;
            customer_['owner'] = owner;
            customer_['adres'] = adres;
            customer_['phonenumber'] = phonenumber;
            customer_['email'] = email;
        } else {
            let id = generateID();
            customer_ = {"id": id, "author": author, "text": text, "companyname": companyname, "owner": owner, "adres": adres, "phonenumber": phonenumber, "email": email};
        }

        //OPTION 1 - ADD TO LOCAL STORAGE DATA
        AsyncStorage.getItem('customers', (err, customers) => {
            if (err) alert(err.message);
            else if (customers !== null){
                customers = JSON.parse(customers);

                if (!edit){
                    //add the new customer to the top
                    customers.unshift(customer_);
                }else{
                    //find the index of the customer with the customer id
                    const index = customers.findIndex((obj) => obj.id === customer_.id);

                    //if the customer is in the array, replace the customer
                    if (index !== -1) customers[index] = customer_;
                }

                //Update the local storage
                AsyncStorage.setItem('customers', JSON.stringify(customers), () => {
                    if (!edit) dispatch(addCustomer(customer_));
                    else dispatch(updateCustomer(customer_));

                    navigation.goBack();
                });
            }
        });
    };

    //==================================================================================================

    //3 - GENERATE ID
    const generateID = () => {
        let d = new Date().getTime();
        let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(5);
        });

        return id;
    };

    //==================================================================================================

    //4 - RENDER
    let disabled = (companyname.length > 0, owner.length > 0, adres.length > 0) ? false : true;
    return (
        <KeyboardAvoidingView keyboardVerticalOffset={Header.HEIGHT} style={styles.flex} behavior="padding">
            <SafeAreaView style={styles.flex}>
                <View style={styles.flex}>
                    <TextInput
                        onChangeText={(text) => setCompanyName(text)}
                        placeholder={"Bedrijfs Naam"}
                        autoFocus={true}
                        style={[styles.textfield]}
                        value={companyname}/>

                    <TextInput
                        onChangeText={(text) => setOwner(text)}
                        placeholder={"Eigenaar"}
                        autoFocus={true}
                        style={[styles.textfield]}
                        value={owner}/>

                    <TextInput
                        onChangeText={(text) => setAdres(text)}
                        placeholder={"Adres"}
                        autoFocus={true}
                        style={[styles.textfield]}
                        value={adres}/>

                    <TextInput
                        onChangeText={(text) => setPhoneNumber(text)}
                        placeholder={"Telefoon Nummer"}
                        autoFocus={true}
                        style={[styles.textfield]}
                        value={phonenumber}/>

                    <TextInput
                        onChangeText={(text) => setEmail(text)}
                        placeholder={"Email"}
                        autoFocus={true}
                        style={[styles.textfield]}
                        value={email}/>
                </View>

                <View style={styles.buttonContainer}>
                    <View style={{flex: 1, alignItems: "flex-end"}}>
                        <TouchableHighlight style={[styles.button]} disabled={disabled} onPress={onSave}
                                            underlayColor="rgba(0, 0, 0, 0)">
                            <Text style={[styles.buttonText, {color: disabled ? "rgba(255,255,255,.5)" : "#FFF"}]}>
                                Save
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: '#003f5c'
    },

    buttonContainer: {
        height: 70,
        flexDirection: "row",
        padding: 12,
        backgroundColor: '#003f5c'
    },

    count: {
        fontSize: 17,
        color: "#6B9EFA"
    },

    button: {
        width: 80,
        height: 44,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#6B9EFA"
    },

    buttonText: {
        fontSize: 16,

    },

    textfield: {
        fontSize: 20,
        lineHeight: 22,
        height: 80,
        padding: 16,
        backgroundColor: '#003f5c',
        color: "#FFF"
    },

    text: {
        fontSize: 30,
        lineHeight: 33,
        color: "#FFF",
        padding: 16,
        paddingTop: 16,
        minHeight: 170,
        borderTopWidth: 1,
        borderColor: "rgba(212,211,211, 0.3)"
    }
});