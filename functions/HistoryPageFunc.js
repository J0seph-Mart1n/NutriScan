import { FIREBASE_AUTH } from '@/FirebaseConfig';

// --- Fetch Scan History ---
export const fetchHistory = async (isPullToRefresh = false, setRefreshing, setIsLoadingScans, setFetchedScans) => {
    if (isPullToRefresh) setRefreshing(true);
    else setIsLoadingScans(true);
    try {
        const user = FIREBASE_AUTH.currentUser;
        if (!user) return;
        const token = await user.getIdToken();
        const apiUrl = process.env.EXPO_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/scan-history`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
            const data = await response.json();
            const mappedScans = data.map((doc, index) => {
                let title = "Saved Scan";
                if (doc.data?.title) title = doc.data?.title;
                const scoreStr = String(doc.data?.health_score?.score || "0");
                const match = scoreStr.match(/\d+/);
                const scoreNum = match ? parseInt(match[0], 10) : 0;
                const d = new Date(doc.created_at);
                const formattedDate = d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                return {
                    id: doc.id || index,
                    title,
                    date: formattedDate,
                    score: scoreNum,
                    rawData: doc.data
                };
            });
            setFetchedScans(mappedScans);
        }
    } catch (error) {
        console.error("Failed to fetch history:", error);
    } finally {
        setIsLoadingScans(false);
        setRefreshing(false);
    }
};

// --- Fetch Daily Logs ---
export const fetchDailyLogs = async (isPullToRefresh = false, setRefreshing, setIsLoadingLogs, setDailyLogs) => {
    if (isPullToRefresh) setRefreshing(true);
    else setIsLoadingLogs(true);
    try {
        const user = FIREBASE_AUTH.currentUser;
        if (!user) return;
        const token = await user.getIdToken();
        const apiUrl = process.env.EXPO_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/daily-log`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
            const data = await response.json();
            setDailyLogs(data);
        }
    } catch (error) {
        console.error("Failed to fetch daily logs:", error);
    } finally {
        setIsLoadingLogs(false);
        setRefreshing(false);
    }
};