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

import {addQuote, updateQuote} from "../actions";


const MAX_LENGTH = 250;

export default function NewQuote(props) {
    const dispatch = useDispatch();
    const {navigation} = props;

    let quote = navigation.getParam('quote', null);

    //1 - DECLARE VARIABLES
    const [isSaving, setIsSaving] = useState(false);
    const [author, setAuthor] = useState(quote ? quote.author : "");
    const [text, setText] = useState(quote ? quote.text : "");
    const [companyname, setCompanyName] = useState(quote ? quote.companyname : "");
    const [owner, setOwner] = useState(quote ? quote.owner : "");
    const [adres, setAdres] = useState(quote ? quote.adres : "");
    const [phonenumber, setPhoneNumber] = useState(quote ? quote.phonenumber : "");
    const [email, setEmail] = useState(quote ? quote.email : "");

    //==================================================================================================

    //2 - GET FLATLIST DATA
    const onSave = () => {
        let edit = quote !== null;
        let quote_ = {};

        if (edit) {
            quote_ = quote;
            quote_['author'] = author;
            quote_['text'] = text;
            quote_['companyname'] = companyname;
            quote_['owner'] = owner;
            quote_['adres'] = adres;
            quote_['phonenumber'] = phonenumber;
            quote_['email'] = email;
        } else {
            let id = generateID();
            quote_ = {"id": id, "author": author, "text": text, "companyname": companyname, "owner": owner, "adres": adres, "phonenumber": phonenumber, "email": email};
        }

        //OPTION 1 - ADD TO LOCAL STORAGE DATA
        AsyncStorage.getItem('quotes', (err, quotes) => {
            if (err) alert(err.message);
            else if (quotes !== null){
                quotes = JSON.parse(quotes);

                if (!edit){
                    //add the new quote to the top
                    quotes.unshift(quote_);
                }else{
                    //find the index of the quote with the quote id
                    const index = quotes.findIndex((obj) => obj.id === quote_.id);

                    //if the quote is in the array, replace the quote
                    if (index !== -1) quotes[index] = quote_;
                }

                //Update the local storage
                AsyncStorage.setItem('quotes', JSON.stringify(quotes), () => {
                    if (!edit) dispatch(addQuote(quote_));
                    else dispatch(updateQuote(quote_));

                    navigation.goBack();
                });
            }
        });

        //OPTION 2 - FAKE API
        // let url = "https://my-json-server.typicode.com/mesandigital/demo/quotes";
        // axios.post(url, quote_)
        //     .then(res => res.data)
        //     .then((data) => {
        //         dispatch(quote ? updateQuote(data) : addQuote(data));
        //         navigation.goBack();
        //     })
        //     .catch(error => alert(error.message))
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