import Navigator from '@/navigation/Navigator';
import {QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {StripeProvider} from '@stripe/stripe-react-native';
import {WithSplashScreen} from './src/components/splashScreen/SplashScreen';
import {persistor, store} from './src/store';
import {queryClient} from './src/store/queryClient';
import {fontFamily, fontSize} from './src/styles/universalStyle';

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const appTimeout = setTimeout(() => {
      setIsAppReady(true);
    }, 2500);
    return () => {
      clearTimeout(appTimeout);
    };
  }, []);

  const toastConfig = {
    /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
    success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
      <BaseToast
        {...props}
        style={{borderLeftColor: 'green'}}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: fontSize.small,
          fontWeight: '400',
          fontFamily: fontFamily.medium,
        }}
        text2Style={{
          fontSize: fontSize.small - 3,
          fontWeight: '400',
          fontFamily: fontFamily.regular,
        }}
      />
    ),
    /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
    error: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: fontSize.small,
          fontWeight: '400',
          fontFamily: fontFamily.medium,
        }}
        text2Style={{
          fontSize: fontSize.small - 3,
          fontWeight: '400',
          fontFamily: fontFamily.regular,
        }}
      />
    ),
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StripeProvider
        publishableKey={process.env.STRIPE_PUBLISHABLE_KEY!}
        merchantIdentifier="merchant.com.zenforce"
        urlScheme="zenforce://">
        <WithSplashScreen isAppReady={isAppReady}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <QueryClientProvider client={queryClient}>
                <Navigator />
                <Toast config={toastConfig} />
              </QueryClientProvider>
            </PersistGate>
          </Provider>
        </WithSplashScreen>
      </StripeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
