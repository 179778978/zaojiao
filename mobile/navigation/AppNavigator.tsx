import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import type { MainTabParamList, RootStackParamList } from './types';
import { HomeScreen } from '../screens/HomeScreen';
import { ActivitiesScreen } from '../screens/ActivitiesScreen';
import { CalendarScreen } from '../screens/CalendarScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { ActivityDetailScreen } from '../screens/ActivityDetailScreen';
import { ActivityPlayScreen } from '../screens/ActivityPlayScreen';
import { GuideDetailScreen } from '../screens/GuideDetailScreen';
import { LibraryScreen } from '../screens/LibraryScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { RootNavigationContext } from './RootNavigationContext';
import { useColors } from '../theme/colors';

const Tabs = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();
const icon: Record<keyof MainTabParamList, string> = { 首页: '⌂', 活动: '✿', 日历: '▦', 绘本: '▤', 关于: '♡' };
function MainTabs() {
  const c = useColors();
  return <Tabs.Navigator screenOptions={({ route }) => ({ headerShown: false, tabBarActiveTintColor: c.green, tabBarInactiveTintColor: c.muted, tabBarStyle: { height: 86, paddingTop: 8, paddingBottom: 20, backgroundColor: c.surface, borderTopColor: c.line }, tabBarLabelStyle: { fontWeight: '700' }, tabBarIcon: ({ color }) => <Text style={{ fontSize: 21, color }}>{icon[route.name]}</Text> })}>
    <Tabs.Screen name="首页" component={HomeScreen} />
    <Tabs.Screen name="活动" component={ActivitiesScreen} />
    <Tabs.Screen name="日历" component={CalendarScreen} />
    <Tabs.Screen name="绘本" component={() => <LibraryScreen />} />
    <Tabs.Screen name="关于" component={AboutScreen} />
  </Tabs.Navigator>;
}
export function AppNavigator() {
  const c = useColors(); const dark = c.bg === '#1E2721';
  const theme = dark ? { ...DarkTheme, colors: { ...DarkTheme.colors, background: c.bg, card: c.surface, text: c.ink, border: c.line, primary: c.green } } : { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: c.bg, card: c.surface, text: c.ink, border: c.line, primary: c.green } };
  return <NavigationContainer theme={theme}><Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: c.bg } }}><Stack.Screen name="MainTabs">{(props) => <RootNavigationContext.Provider value={props.navigation}><MainTabs /></RootNavigationContext.Provider>}</Stack.Screen><Stack.Screen name="ActivityDetail" component={ActivityDetailScreen} /><Stack.Screen name="ActivityPlay" component={ActivityPlayScreen} /><Stack.Screen name="GuideDetail" component={GuideDetailScreen} /><Stack.Screen name="Library" component={LibraryScreen} /><Stack.Screen name="Search" component={SearchScreen} /></Stack.Navigator></NavigationContainer>;
}
