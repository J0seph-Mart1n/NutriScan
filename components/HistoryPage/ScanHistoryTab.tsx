import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet, ScrollView, View, ActivityIndicator, Text,
    RefreshControl, TouchableOpacity, Animated, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import TopBar from '@/components/HomePage/TopBar';
import { SearchBar } from '@/components/HistoryPage/SearchBar';
import { HistoryEntries } from '@/components/HistoryPage/HistoryEntries';
import { LoadMore } from '@/components/HistoryPage/LoadMore';
import { HistoryColors } from '@/constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ScanHistoryTabProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    visibleCount: number;
    setVisibleCount: React.Dispatch<React.SetStateAction<number>>;
    fetchedScans: any[];
    isLoadingScans: boolean;
    refreshing: boolean;
    onRefresh: () => void;
    activeTab: number;
    filteredScans: any[];
    displayedScans: any[];
}

export default function ScanHistoryTab({ searchQuery, setSearchQuery, visibleCount, setVisibleCount, fetchedScans, isLoadingScans, refreshing, onRefresh, activeTab, filteredScans, displayedScans }: ScanHistoryTabProps) {
    return (
        <ScrollView
            style={{ width: SCREEN_WIDTH }}
            contentContainerStyle={styles.pageContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing && activeTab === 0}
                    onRefresh={onRefresh}
                    colors={[HistoryColors.primary]}
                    tintColor={HistoryColors.primary}
                />
            }
        >
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <View style={styles.listHeader}>
                <View>
                    <Text style={styles.labelTimeline}>TIMELINE</Text>
                    <Text style={styles.titleHistory}>Scan History</Text>
                </View>
            </View>

            {isLoadingScans ? (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color={HistoryColors.primary} />
                </View>
            ) : fetchedScans.length === 0 ? (
                <View style={styles.centered}>
                    <Text style={styles.emptyText}>No scans saved yet.</Text>
                </View>
            ) : (
                <>
                    <HistoryEntries displayedScans={displayedScans} />
                    <LoadMore
                        visibleCount={visibleCount}
                        recentScans={filteredScans}
                        setVisibleCount={setVisibleCount}
                    />
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageContent: {
        paddingTop: 130,
        paddingBottom: 130,
        paddingHorizontal: 24,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    labelTimeline: {
        fontSize: 12,
        fontWeight: '700',
        color: HistoryColors.primary,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 4,
    },
    titleHistory: {
        fontSize: 32,
        fontWeight: '800',
        color: HistoryColors.onSurface,
        letterSpacing: -0.5,
    },
    centered: {
        marginTop: 40,
        alignItems: 'center',
    },
    emptyText: {
        color: HistoryColors.onSurfaceVariant,
        fontSize: 16,
    },
})