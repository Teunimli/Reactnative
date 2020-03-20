import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoadingScreen from './LoadingScreen'
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from './Home'
import NewQuoteScreen from './NewQuote'

const AppStack = createStackNavigator({
    Login:{
        screen: LoginScreen,
        navigationOptions: ({ navigation }) => ({
            title: `Login`,
        }),
    },
    Welcome:{
        screen: WelcomeScreen,
        navigationOptions: ({ navigation }) => ({
            title: `Welcome`,
        }),
    },
    Home:{
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            title: `Home`,
        }),
    },
    NewQuote:{
        screen: NewQuoteScreen,
        navigationOptions: ({ navigation }) => ({
            title: `Bedrijf`,
        }),
    }
});

const RoutesStack = createSwitchNavigator(
    {
        Loading: LoadingScreen,
        App: AppStack
    },
    {initialRouteName: 'Loading'}
);

const Router = createAppContainer(RoutesStack);

export default Router;