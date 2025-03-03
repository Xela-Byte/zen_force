import Toast from 'react-native-toast-message';
import {fontFamily, fontSize} from '../styles/universalStyle';

type ToastOptions = {
  type: 'success' | 'error' | 'info';
  text1: string;
  text2?: string;
  visibilityTime?: number;
  position?: 'top' | 'bottom';
};

const useToast = () => {
  const showToast = (options: ToastOptions) => {
    Toast.show({
      type: options.type,
      text1: options.text1,
      text2: options.text2,
      visibilityTime: options.visibilityTime ?? 5000, // Default to 3 seconds
      position: options.position ?? 'top',
    });
  };

  return {showToast};
};

export default useToast;
