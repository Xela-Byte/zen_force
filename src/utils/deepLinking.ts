import {Linking} from 'react-native';

export const openChoosePlanScreen = (plan?: any) => {
  const url = plan
    ? `zenforce://choose-plan?plan=${encodeURIComponent(JSON.stringify(plan))}`
    : 'zenforce://choose-plan';

  Linking.openURL(url).catch(err => {
    console.error('Error opening deep link:', err);
  });
};

export const openChoosePlanScreenWithPlan = (
  planTitle: string,
  planPrice: string,
  planDescription: string,
) => {
  const plan = {
    title: planTitle,
    price: planPrice,
    description: planDescription,
  };

  openChoosePlanScreen(plan);
};
