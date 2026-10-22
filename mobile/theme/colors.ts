import { useColorScheme } from 'react-native';

const palette = {
  light: { bg: '#FFF9E9', surface: '#FFFFFF', ink: '#27352B', muted: '#68736B', green: '#347653', greenSoft: '#E3F0E3', yellow: '#F5CE58', coral: '#E77A5D', line: '#27352B', danger: '#A23C31' },
  dark: { bg: '#1E2721', surface: '#2A352D', ink: '#F6F0E1', muted: '#B6C1B8', green: '#A6D2A8', greenSoft: '#344839', yellow: '#D9B94E', coral: '#EF9C82', line: '#D5DFC8', danger: '#FF9E91' },
};
export function useColors() {
  return palette[useColorScheme() === 'dark' ? 'dark' : 'light'];
}
export type Colors = ReturnType<typeof useColors>;
