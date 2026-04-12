import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet, ScrollView, View, Text, TouchableOpacity, Animated, Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { HistoryColors } from '@/constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TABS = ['Scan History', 'Daily Logs'] as const;

interface TabBarProps {
    activeTab: number;
    setActiveTab: (index: number) => void;
    scrollViewRef: React.RefObject<ScrollView | null>;
    indicatorAnim: Animated.Value;
}

export default function TabBar({ activeTab, setActiveTab, scrollViewRef, indicatorAnim }: TabBarProps) {

    // --- Tab Switching ---
    const switchTab = (index: number) => {
        setActiveTab(index);
        scrollViewRef.current?.scrollTo({ x: index * SCREEN_WIDTH, animated: true });
        Animated.spring(indicatorAnim, {
            toValue: index,
            useNativeDriver: true,
            tension: 68,
            friction: 12,
        }).start();
    };

    // --- Animated Indicator ---
    const tabWidth = (SCREEN_WIDTH - 48) / 2; // 24px padding each side
    const indicatorTranslateX = indicatorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, tabWidth],
    });

    return (
        <View style={styles.tabBarWrapper}>
            <View style={styles.tabBar}>
                <Animated.View
                    style={[
                        styles.tabIndicator,
                        { width: tabWidth, transform: [{ translateX: indicatorTranslateX }] }
                    ]}
                />
                {TABS.map((tab, index) => (
                    <TouchableOpacity
                        key={tab}
                        style={styles.tabItem}
                        onPress={() => switchTab(index)}
                        activeOpacity={0.7}
                    >
                        <MaterialIcons
                            name={index === 0 ? 'document-scanner' : 'restaurant-menu'}
                            size={18}
                            color={activeTab === index ? HistoryColors.primary : HistoryColors.onSurfaceVariant}
                        />
                        <Text style={[
                            styles.tabText,
                            activeTab === index && styles.tabTextActive,
                        ]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tabBarWrapper: {
        position: 'absolute',
        top: 120,
        left: 0,
        right: 0,
        zIndex: 40,
        paddingHorizontal: 24,
        paddingBottom: 12,
        backgroundColor: HistoryColors.surface,
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: HistoryColors.surfaceContainerLow,
        borderRadius: 16,
        padding: 4,
        position: 'relative',
    },
    tabIndicator: {
        position: 'absolute',
        top: 4,
        left: 4,
        bottom: 4,
        borderRadius: 12,
        backgroundColor: HistoryColors.tabColors,
    },
    tabItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        gap: 8,
        zIndex: 1,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '700',
        color: HistoryColors.onSurface,
    },
    tabTextActive: {
        color: HistoryColors.onSurface,
    },
})