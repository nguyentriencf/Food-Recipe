/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import Home from './src/screens/Home/Home'
AppRegistry.registerComponent(appName, () => Home);
