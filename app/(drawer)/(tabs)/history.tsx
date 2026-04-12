import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '@/components/HomePage/TopBar';
import { HistoryColors } from '@/constants/Colors';
import { fetchHistory, fetchDailyLogs } from '@/functions/HistoryPageFunc';
import TabBar from '@/components/HistoryPage/TabBar';
import ScanHistoryTab from '@/components/HistoryPage/ScanHistoryTab';
import DailyLogTab from '@/components/HistoryPage/DailyLogTab';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HistoryScreen = () => {
    // --- Shared State ---
    const [activeTab, setActiveTab] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const indicatorAnim = useRef(new Animated.Value(0)).current;

    // --- Scan History State ---
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(4);
    const [fetchedScans, setFetchedScans] = useState<any[]>([]);
    const [isLoadingScans, setIsLoadingScans] = useState(true);

    // --- Daily Logs State ---
    const [dailyLogs, setDailyLogs] = useState<any[]>([]);
    const [isLoadingLogs, setIsLoadingLogs] = useState(true);
    const [logsVisibleCount, setLogsVisibleCount] = useState(4);


    useEffect(() => {
        fetchHistory(false, setRefreshing, setIsLoadingScans, setFetchedScans);
        fetchDailyLogs(false, setRefreshing, setIsLoadingLogs, setDailyLogs)
    }, []);

    const onRefresh = () => {
        if (activeTab === 0) fetchHistory(true, setRefreshing, setIsLoadingScans, setFetchedScans);
        else fetchDailyLogs(true, setRefreshing, setIsLoadingLogs, setDailyLogs);
    };

    const handlePageScroll = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const page = Math.round(offsetX / SCREEN_WIDTH);
        if (page !== activeTab) {
            setActiveTab(page);
            Animated.spring(indicatorAnim, {
                toValue: page,
                useNativeDriver: true,
                tension: 68,
                friction: 12,
            }).start();
        }
    };

    // --- Filter & Display ---
    const filteredScans = fetchedScans.filter(scan =>
        scan.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const displayedScans = filteredScans.slice(0, visibleCount);
    const displayedLogs = dailyLogs.slice(0, logsVisibleCount);

    return (
        <SafeAreaView style={styles.container}>
            <TopBar />

            {/* Tab Bar */}
            <TabBar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                scrollViewRef={scrollViewRef}
                indicatorAnim={indicatorAnim}
            />

            {/* Swipeable Pages */}
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handlePageScroll}
                scrollEventThrottle={16}
            >
                {/* Page 1: Scan History */}
                <ScanHistoryTab
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    visibleCount={visibleCount}
                    fetchedScans={fetchedScans}
                    isLoadingScans={isLoadingScans}
                    activeTab={activeTab}
                    displayedScans={displayedScans}
                    filteredScans={filteredScans}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    setVisibleCount={setVisibleCount}
                />

                {/* Page 2: Daily Logs */}
                <DailyLogTab
                    dailyLogs={dailyLogs}
                    isLoadingLogs={isLoadingLogs}
                    logsVisibleCount={logsVisibleCount}
                    setLogsVisibleCount={setLogsVisibleCount}
                    activeTab={activeTab}
                    displayedLogs={displayedLogs}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: HistoryColors.surface,
    },
});

export default HistoryScreen;