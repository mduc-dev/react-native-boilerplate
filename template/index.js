import {AppRegistry, Text, TextInput} from 'react-native';
import App from './src/App';
import {enableFreeze, enableScreens} from 'react-native-screens';
import {name as appName} from './app.json';
enableScreens();
enableFreeze();
Text.defaultProps = Text.defaultProps || {
  allowFontScaling: false,
};

TextInput.defaultProps = TextInput.defaultProps || {
  allowFontScaling: false,
  autoCorrect: false,
  spellCheck: false,
};
AppRegistry.registerComponent(appName, () => App);
