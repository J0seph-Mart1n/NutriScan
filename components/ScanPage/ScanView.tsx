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

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const VIEWFINDER_WIDTH = SCREEN_WIDTH * 0.75;
const VIEWFINDER_HEIGHT = VIEWFINDER_WIDTH * (4 / 3);
const BORDER_WIDTH = 1000;

interface ScanViewProps {
    isFocused: boolean;
}

export default function ScanView({ isFocused }: ScanViewProps) {

    // Animation for the scanning line
    const scanAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isFocused) {
        Animated.loop(
            Animated.sequence([
            Animated.timing(scanAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }),
            Animated.timing(scanAnim, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true,
            }),
            ])
        ).start();
        } else {
        scanAnim.stopAnimation();
        }
    },[isFocused]);

    const scanLineTranslateY = scanAnim.interpolate({
        inputRange:[0, 1],
        outputRange: [0, 430], // Adjust based on your viewfinder height
    });

    return (
        <View style={styles.middleRow}>
            <View style={styles.overlayDim} />
            
            {/* The Viewfinder Cutout */}
            <View style={styles.viewfinderContainer}>
                {/* Rounded Mask Overlay */}
                <View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center', zIndex: -1 }]} pointerEvents="none">
                    <View
                        style={{
                        width: VIEWFINDER_WIDTH + BORDER_WIDTH * 2,
                        height: VIEWFINDER_HEIGHT + BORDER_WIDTH * 2,
                        borderWidth: BORDER_WIDTH,
                        borderColor: ScanColors.overlay,
                        borderRadius: BORDER_WIDTH + 32,
                        }}
                    />
                </View>

                <View style={styles.viewfinder}>
                    {/* Corner Markers */}
                    <View style={[styles.corner, styles.topLeft]} />
                    <View style={[styles.corner, styles.topRight]} />
                    <View style={[styles.corner, styles.bottomLeft]} />
                    <View style={[styles.corner, styles.bottomRight]} />

                    {/* Scanning Animation Line */}
                    <Animated.View
                    style={[
                        styles.scanLine,
                        { transform: [{ translateY: scanLineTranslateY }] },
                    ]}
                    />
                </View>
            </View>

            <View style={styles.overlayDim} />
        </View>
    );
}

const styles = StyleSheet.create({
    overlayDim: {
        flex: 1,
    },
    middleRow: {
        flexDirection: 'row',
        height: VIEWFINDER_HEIGHT,
    },
    viewfinderContainer: {
        width: VIEWFINDER_WIDTH,
        height: VIEWFINDER_HEIGHT,
        position: 'relative',
    },
    viewfinder: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 32,
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },
    // -- Viewfinder Corners --
    corner: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderColor: ScanColors.primaryFixed,
        zIndex: 30,
    },
    topLeft: {
        top: 0, left: 0,
        borderTopWidth: 4, borderLeftWidth: 4,
        borderTopLeftRadius: 32,
    },
    topRight: {
        top: 0, right: 0,
        borderTopWidth: 4, borderRightWidth: 4,
        borderTopRightRadius: 32,
    },
    bottomLeft: {
        bottom: 0, left: 0,
        borderBottomWidth: 4, borderLeftWidth: 4,
        borderBottomLeftRadius: 32,
    },
    bottomRight: {
        bottom: 0, right: 0,
        borderBottomWidth: 4, borderRightWidth: 4,
        borderBottomRightRadius: 32,
    },
    // -- Viewfinder Scanning Effects --
    scanLine: {
        width: '100%',
        height: 2,
        backgroundColor: ScanColors.primaryFixed,
        shadowColor: ScanColors.primaryFixed,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
    },
    gridLineHorizontal: {
        position: 'absolute',
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        top: '33%',
    },
    gridLineVertical: {
        position: 'absolute',
        height: '100%',
        width: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        left: '33%',
    },
});