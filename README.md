# Vitality - Health & Nutrition Tracker

Vitality is a modern React Native cross-platform application built with **Expo**, aimed at solving everyday nutritional tracking effortlessly through the power of AI.

The application allows users to capture photos of food nutritional labels and receive an instant breakdown of the health impact (benefits, harmful effects, health score, and macro-nutritional data) utilizing Groq's fast LLM processing on the backend. This data is seamlessly pushed to user-specific dashboards for daily progress monitoring.

## 🌟 Key Features

1. **Authentication:** 
   - Secure Login/Sign Up architecture using Firebase Authentication.
2. **AI Label Scanning:** 
   - Users can take pictures of nutrition labels right within the app.
   - The picture is sent to the backend where it is analyzed and structured into an intuitive layout highlighting benefits, warnings, nutritional facts, and a health score.
3. **Daily Nutrition Tracking (Manual & Scanned):** 
   - Easily ingest and document meals.
   - Real-time macro-nutrient estimations (Calories, Protein, Carbs).
   - "Calculate Estimate" overrides to accurately adjust data via AI context analysis.
4. **Interactive Dashboard:** 
   - Intuitive Bento grid UI built with React Native.
   - Dynamic, animated SVG progress tracking (Circular and Linear bars) highlighting your daily goals.
5. **Swipeable History:** 
   - Two specialized timelines: `Scan History` and `Daily Logs`.
   - Rich "shimmer/skeleton" loading states utilizing `react-native-reanimated-skeleton` for smooth UX transitions.

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18+)
- Expo CLI
- Firebase Project configured for Web/Native (Authentication enabled)
- Go backend running (to process `/analyze-label`, `/estimate-nutrition`, etc.)

---

### Step 1: Install Dependencies
Launch your terminal and run the installation script:

```bash
npm install
```

### Step 2: Environment configuration (`.env`)
You must configure Firebase inside of your app correctly so Expo can bundle it natively.
You can get your Firebase credentials by logging into firebase and creating a project. Create a Web App and copy the configs from the SDK setup. 
Create a `.env` file at the root of the frontend folder `/Vitality` and populate it as follows:

```env
# Expo specifically requires the EXPO_PUBLIC_ prefix for variables to be bundled into the app natively.
# Replace the URL below with your backend's network IP (or localhost if testing web only)
EXPO_PUBLIC_API_URL=http://<YOUR_BACKEND_IP>:8080

# Firebase Configuration keys 
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGE_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

> **Note**: You must replace `<YOUR_BACKEND_IP>` with the local IP of your running Go server, especially if you are using Expo Go on a physical phone. Do not use `localhost` if connecting from a mobile device over WiFi.

### Step 3: Run the Application

Start up the Expo bundler:

```bash
npm start
```
From here you can open it in:
- A local iOS Simulator (Press `i`)
- A local Android Emulator (Press `a`)
- A physical Android/iOS phone via the **Expo Go** application (Scan the QR Code).

## 🛠️ Architecture Details
- **Frontend Stack**: React Native, Expo Router, TypeScript
- **Backend Stack**: Go, Gin Web Framework, MongoDB (for persistence), Groq Llama 4 (for AI Vision processing)
- **Authenticatior**: Firebase
- **State Pattern**: Lightweight prop drilling and Contextual state hook abstraction (i.e. isolated `/functions` folder to extract API logic from React templates).

## 📝 License
This project is for demonstration and personal use. 
