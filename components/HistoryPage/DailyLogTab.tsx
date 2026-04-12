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

interface DailyLogTabProps {
    refreshing: boolean;
    onRefresh: () => void;
    isLoadingLogs: boolean;
    dailyLogs: any[];
    displayedLogs: any[];
    logsVisibleCount: number;
    setLogsVisibleCount: React.Dispatch<React.SetStateAction<number>>;
    activeTab: number;
}

export default function DailyLogTab({ refreshing, onRefresh, isLoadingLogs, dailyLogs, displayedLogs, logsVisibleCount, setLogsVisibleCount, activeTab }: DailyLogTabProps) {
    return (
        <ScrollView
            style={{ width: SCREEN_WIDTH }}
            contentContainerStyle={styles.pageContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing && activeTab === 1}
                    onRefresh={onRefresh}
                    colors={[HistoryColors.primary]}
                    tintColor={HistoryColors.primary}
                />
            }
        >
            <View style={styles.listHeader}>
                <View>
                    <Text style={styles.labelTimeline}>NUTRITION</Text>
                    <Text style={styles.titleHistory}>Daily Logs</Text>
                </View>
            </View>

            {isLoadingLogs ? (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color={HistoryColors.primary} />
                </View>
            ) : dailyLogs.length === 0 ? (
                <View style={styles.centered}>
                    <Text style={styles.emptyText}>No daily logs yet.</Text>
                </View>
            ) : (
                <>
                    <View style={styles.logsContainer}>
                        {displayedLogs.map((log: any, index: number) => {
                            const d = new Date(log.created_at);
                            const formattedDate = d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                            return (
                                <View key={log.id || index} style={styles.logCard}>
                                    <View style={styles.logIconContainer}>
                                        <MaterialIcons name="restaurant" size={22} color={HistoryColors.primary} />
                                    </View>
                                    <View style={styles.logContent}>
                                        <Text style={styles.logTitle} numberOfLines={1}>{log.food_name}</Text>
                                        <Text style={styles.logDate}>{formattedDate}</Text>
                                        <View style={styles.logMacros}>
                                            <View style={styles.macroPill}>
                                                <Text style={styles.macroPillText}>{log.calories} kcal</Text>
                                            </View>
                                            <View style={[styles.macroPill, { backgroundColor: 'rgba(27, 109, 36, 0.08)' }]}>
                                                <Text style={[styles.macroPillText, { color: HistoryColors.primary }]}>{log.protein}g P</Text>
                                            </View>
                                            <View style={[styles.macroPill, { backgroundColor: 'rgba(197, 147, 0, 0.1)' }]}>
                                                <Text style={[styles.macroPillText, { color: '#8B6914' }]}>{log.carbs}g C</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.logQuantity}>
                                        <Text style={styles.logQuantityText}>{log.quantity}</Text>
                                        <Text style={styles.logQuantityUnit}>{log.unit}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>

                    {dailyLogs.length > logsVisibleCount && (
                        <TouchableOpacity
                            style={styles.loadMoreButton}
                            onPress={() => setLogsVisibleCount(prev => prev + 4)}
                        >
                            <Text style={styles.loadMoreText}>Load More</Text>
                            <MaterialIcons name="expand-more" size={20} color={HistoryColors.primary} />
                        </TouchableOpacity>
                    )}
                </>
            )}
        </ScrollView>
    )
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
    // --- Daily Log Card Styles ---
    logsContainer: {
        gap: 16,
    },
    logCard: {
        flexDirection: 'row',
        backgroundColor: HistoryColors.surfaceContainerLowest,
        borderRadius: 20,
        padding: 16,
        gap: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'center',
    },
    logIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: 'rgba(27, 109, 36, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logContent: {
        flex: 1,
    },
    logTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: HistoryColors.onSurface,
        lineHeight: 22,
    },
    logDate: {
        fontSize: 12,
        color: 'rgba(63, 74, 60, 0.6)',
        marginTop: 2,
        marginBottom: 8,
    },
    logMacros: {
        flexDirection: 'row',
        gap: 6,
    },
    macroPill: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: 'rgba(63, 74, 60, 0.06)',
    },
    macroPillText: {
        fontSize: 11,
        fontWeight: '700',
        color: HistoryColors.onSurfaceVariant,
    },
    logQuantity: {
        alignItems: 'center',
    },
    logQuantityText: {
        fontSize: 20,
        fontWeight: '800',
        color: HistoryColors.onSurface,
    },
    logQuantityUnit: {
        fontSize: 10,
        fontWeight: '700',
        color: HistoryColors.onSurfaceVariant,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    loadMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        paddingVertical: 12,
        gap: 4,
    },
    loadMoreText: {
        fontSize: 14,
        fontWeight: '700',
        color: HistoryColors.primary,
    },
})