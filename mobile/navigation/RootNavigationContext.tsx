import { createContext, useContext } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
export type RootNavigation = NativeStackNavigationProp<RootStackParamList>;
export const RootNavigationContext = createContext<RootNavigation | null>(null);
export function useRootNavigation(): RootNavigation {
  const value = useContext(RootNavigationContext);
  if (!value) throw new Error('RootNavigationContext is missing');
  return value;
}
