import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import MainNavigation from './navigation';
import { Provider } from 'react-redux'
import store from './store'
import { init } from './db'

init()
  .then(() => console.log('database initialized'))
  .catch((err) => {
    console.log('database fail connect')
    console.log(err.message)
  })

export default function App() {
  
  const [loaded] = useFonts({
    OpenSans: require('./assets/fonts/OpenSans-Regular.ttf'),
    OpenSansBold: require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if(!loaded) return <AppLoading />

  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}

