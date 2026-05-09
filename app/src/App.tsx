import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import { RootNavigator } from './navigation/RootNavigator'
import { store } from './store'

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  )
}
