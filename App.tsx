import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './mobile/navigation/AppNavigator';
import { useColors } from './mobile/theme/colors';
export default function App() {
  const c = useColors();
  return <><StatusBar style={c.bg === '#1E2721' ? 'light' : 'dark'} backgroundColor={c.bg} /><AppNavigator /></>;
}
