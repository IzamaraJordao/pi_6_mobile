import {Dimensions, ScrollView, Text, TouchableOpacity, View, Image, TextInput, Button, Pressable} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation, useRoute} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import {LinearGradient} from "expo-linear-gradient";
import {GenderMovie} from "../component/gender";
import { TextInputMask } from 'react-native-masked-text';
import {saveUser} from "../api/userdb";

var {width, height} = Dimensions.get('window');

export default function UserScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [favoriteGenres, setfavoriteGenres] = useState([])

    const {params: item} = useRoute();
    const navigation = useNavigation();

    const handleSelectedGenres = (selectedGenres) => {
        setfavoriteGenres(selectedGenres)
    };

    const saveUserPage = () => {
        if (name === "" || email === "" || password === "" || phone === "" || favoriteGenres.length === 0) {
            alert('Preencha todos os campos')
            return
        }

        const user = {
            name,
            email,
            password,
            phone,
            favoriteGenres : favoriteGenres.join(", "),
            receiveNotifications: true,
            isAdmin: false
        }

        saveUser(user).then((response) => {
            navigation.navigate('Home', {user: user})
        }).catch((error) => {
            navigation.navigate('Login')
        })
    }

    return (
        <ScrollView
            contentContainerStyle={{paddingBottom: 20}}
            className="flex-1 bg-neut-900">
            <View className="w-full bg-neut-900">
                <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4 mt-3">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-xl p-1"
                                      style={{backgroundColor: '#2165de'}}>
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white"/>
                    </TouchableOpacity>
                </SafeAreaView>
                <View className="flex-row justify-center items-center bg-neut-900">
                    <Image
                        source={require('../assets/images/indica.jpg')}
                        style={{width, height: height * 0.15}}
                    />
                    <LinearGradient colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                    style={{
                                        width, height: height * 0.18,
                                    }}
                                    start={{x: 0.5, y: 0}}
                                    end={{x: 0.5, y: 1}}
                                    className={"absolute bottom-0"}
                    />
                </View>
            </View>
            <View  className="flex-col justify-center items-center w-full rounded-lg">
                <Text className="text-3xl text-whit text-center font-bold tracking-wider mb-5">Cadastro</Text>
            </View>
            <View className="mx-4 mb-3 flex-col justify-center items-start">
                <Text className="text-whit text-start font-bold tracking-wider mb-1">*Nome</Text>
                <TextInput
                    placeholder={"Usuário"}
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor={"lightgray"}
                    className="bg-gray-50 text-lg border border-gray-border text-whit text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <Text className="text-whit text-start mt-5 font-bold tracking-wider mb-1">*Senha</Text>
                <TextInput
                    placeholder={"Senha"}
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor={"lightgray"}
                    className=" text-lg  border border-gray-border text-whit text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <Text className="text-whit text-start mt-5 font-bold tracking-wider mb-1">*E-mail</Text>
                <TextInput
                    placeholder={"Email"}
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor={"lightgray"}
                    className="bg-gray-50 text-lg border border-gray-border text-whit text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />

                <Text className="text-whit text-start mt-5 font-bold tracking-wider mb-1">*Celular (DDD)</Text>
                <TextInputMask
                    placeholder={"Digite seu telefone"}
                    value={phone}
                    onChangeText={setPhone}
                    placeholderTextColor={"lightgray"}
                    className="bg-gray-50 text-lg border border-gray-border text-whit text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type={'cel-phone'}
                    options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(999) '
                    }}
                />
            </View>
            <GenderMovie  onSelectGenres={handleSelectedGenres}/>
            <View  className="mt-4 flex-col justify-center items-center w-full rounded-lg">
                <Pressable
                    className="bg-yellow  w-3/4 h-10 flex-col justify-center items-center rounded-lg"
                    onPress={saveUserPage}
                >
                    <Text className="text-lg">Cadastrar</Text>
                </Pressable>
            </View>
        </ScrollView>

    )
}