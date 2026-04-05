import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";
import { ScanColors } from "@/constants/Colors";

interface AnalyzingModalProps {
    isAnalyzing: boolean;
}

export default function AnalyzingModal({ isAnalyzing }: AnalyzingModalProps) {
    return (
        <Modal visible={isAnalyzing} transparent={true} animationType="fade">
            <View style={[StyleSheet.absoluteFill, styles.analysingContainer]}>
                <ActivityIndicator size={60} color={ScanColors.primaryFixed} />
                <Text style={styles.analysingText}>Analyzing Label...</Text>
                <Text style={styles.extractingText}>Extracting nutritional details</Text>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    analysingContainer: {
        backgroundColor: 'rgba(0,0,0,0.85)', 
        justifyContent: 'center', 
        alignItems: 'center', 
        zIndex: 1000
    },
    analysingText: {
        color: '#fff', 
        marginTop: 24, 
        fontSize: 18, 
        fontWeight: '700', 
        letterSpacing: 0.5
    },
    extractingText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
    },
});