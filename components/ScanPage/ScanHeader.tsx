import React from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { ScanColors } from '@/constants/Colors';

interface ScanHeaderProps {
    flash: boolean;
    setFlash: (flash: boolean) => void;
}

export default function ScanHeader({ flash, setFlash }: ScanHeaderProps) {
    return (
        <SafeAreaView style={styles.headerSafeArea}>
            <View style={styles.header}>
                <View style={styles.headerLeft} />
                <View style={styles.headerRight}>
                    <TouchableOpacity 
                        style={[styles.iconButton, flash && styles.iconButtonActive]} 
                        onPress={() => setFlash(!flash)}
                    >
                        <MaterialIcons 
                            name={flash ? "flash-on" : "flash-off"} 
                            size={24} 
                            color={flash ? ScanColors.primaryFixed : "#fff"} 
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerSafeArea: {
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: Platform.OS === 'android' ? 40 : 16, // Top padding for android status bar
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 12,
    },
    headerRight: {
        flexDirection: 'row',
        gap: 8,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButtonActive: {
        backgroundColor: 'rgba(163, 246, 156, 0.3)', // primaryFixed tint
    },
});