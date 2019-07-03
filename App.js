

import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity,FlatList, ActivityIndicator, Text, View, TextInput} from 'react-native';
import {SearchBar} from "react-native-elements";

export default class App extends Component {
    constructor(){
        super();
        this.state = {
            isLoading: true,
            dataSource: [],
            search: '',

        }
    }

    componentDidMount() {
        const url = 'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json&fbclid=IwAR3mohzTTmrGRpZ9Q2gRBFGa2eFmZ7W3I3T4gIjFICkP7NS69GqPK1SLtq4';
        fetch(url).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.Results
                })
            })
    }

  //  renderHeader = () => {
   //     return <SearchBar placeholder= "Type Here..." lightTheme/>
   // };

    renderSeparator= ()=> {
        return(
            <View style={styles.separator}/>
        )
    };

    _renderItem= ({item}) => (
        <TouchableOpacity >
            <View style={styles.item}>
        <Text style={styles.words}> {item.Make_Name}</Text>
            </View>
        </TouchableOpacity>
            );


    updateSearch = search =>{
        this.setState({search:search});
    };

    render() {
        const search = this.state.search;

        if(this.state.isLoading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator size= "large" animating/>
                </View>
            )
        } else{

        return (
            <View style={styles.container}>
                <SearchBar
                    placeholder = "Type Here..."
                    lightTheme
                    containerStyle={styles.search_bar}
                    onChangeText = {this.updateSearch}
                    value={{search}}
                />
                <FlatList
                    data={this.state.dataSource}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={this.renderSeparator}
                />

            </View>
        );
    }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop: 20,
        width: "100%"
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    item: {
        padding: 15,
    },
    words: {
        fontSize: 20,
        padding: 5,
        paddingLeft: 5,
        fontWeight: 'bold'
    },
    separator: {
        height: 1,
        width: "90%",
        backgroundColor: '#CED0CE',
        marginRight: "5%",
        marginLeft: "5%",
    },
    search_bar: {
        width: 300,
    }


});
