import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Platform,
  Alert,
  Dimensions,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import { ScanColors } from '@/constants/Colors'; 

interface BottomControlsProps {
    takePhoto: () => void;
}

export default function BottomControls({ takePhoto }: BottomControlsProps) {
    return (
        <View style={[styles.overlayDim, styles.bottomOverlay]}>
            {/* Bottom Card & Actions */}
            <View style={styles.bottomControls}>
                {/* Macro Snapshot Indicator */}
                <View style={styles.statusCard}>
                    <View style={styles.statusIconBg}>
                        <MaterialIcons name="local-dining" size={28} color={ScanColors.primaryFixed} />
                    </View>
                    <View style={styles.statusTextContainer}>
                        <Text style={styles.subGuidanceText}>Capture the label</Text>
                        <Text style={styles.statusLabel}>DETECTING</Text>
                    </View>
                    {/* Shutter Button integrated into the flow */}
                    <TouchableOpacity style={styles.captureButtonMini} onPress={takePhoto}>
                        <View style={styles.captureButtonInner} />
                    </TouchableOpacity>
                </View>

                {/* Tip Section */}
                <View style={styles.tipContainer}>
                <MaterialIcons name="lightbulb" size={20} color={ScanColors.primaryFixedDim} />
                <Text style={styles.tipText}>
                    Keep the label flat and avoid shadows for best results.
                </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlayDim: {
        flex: 1,
    },
    // -- Bottom Section --
    bottomOverlay: {
        alignItems: 'center',
        paddingTop: 24,
        paddingBottom: Platform.OS === 'ios' ? 120 : 100, // Clearance for tab bar
        zIndex: 20,
    },
    guidanceText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    subGuidanceText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        marginTop: 1,
        marginBottom: 10,
    },
    bottomControls: {
        width: '100%',
        alignItems: 'center',
        gap: 16,
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 120 : 100,
    },
    statusCard: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 28,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusIconBg: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: 'rgba(93, 172, 91, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    statusTextContainer: {
        flex: 1,
    },
    statusLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.5,
    },
    statusTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        marginTop: 2,
    },
    captureButtonMini: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: 'rgba(255,255,255,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButtonInner: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: ScanColors.primaryFixed,
    },
    tipContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        width: '90%',
        maxWidth: 400,
    },
    tipText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        marginLeft: 12,
        flex: 1,
    },
});