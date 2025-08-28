import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './styles';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.cardBackground,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.light,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        headerTitle: () => (
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            <Text style={{ color: '#FFFFFF' }}>izi</Text>
            <Text style={{ color: colors.secondary }}>nsight</Text>
          </Text>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="oportunidades"
        options={{
          title: 'Oportunidades',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'location' : 'location-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ofertas"
        options={{
          title: 'Ofertas',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'document-text' : 'document-text-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="onboarding"
        options={{
          title: 'Onboarding',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person-add' : 'person-add-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="monitoreo"
        options={{
          title: 'Alertas',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'analytics' : 'analytics-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reportes"
        options={{
          title: 'Reportes',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'bar-chart' : 'bar-chart-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
