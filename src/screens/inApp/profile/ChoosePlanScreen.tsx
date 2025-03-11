import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import {choosePlanStyle} from '../../../styles/choosePlanStyle';
import {
  appColors,
  fontSize,
  sizeBlock,
  universalStyle,
} from '../../../styles/universalStyle';
import HeaderComponent from '../../../components/button/HeaderComponent';
import {ChoosePlanScreenProps} from '../../../types/navigation/ProfileNavigationType';
import {plans} from '../../../components/profile/PlanSelection';
import AppText from '../../../components/text/AppText';
import BulletIcon from '../../../assets/images/bullet.svg';
import AppButton from '../../../components/button/AppButton';

const ChoosePlanScreen = ({navigation, route}: ChoosePlanScreenProps) => {
  const {params} = route;
  const {plan} = params;

  const specificPlan = plans.find(item => {
    return item.title === plan.title;
  });

  if (!specificPlan) {
    navigation.goBack();
    return null;
  }

  return (
    <SafeAreaView style={choosePlanStyle.wrapper}>
      <StatusBar backgroundColor={appColors.white} barStyle={'dark-content'} />
      <HeaderComponent navigation={navigation} title="Choose your plan" />
      <ScrollView style={choosePlanStyle.container}>
        <View
          style={[
            choosePlanStyle.radioBtnContainer,
            {
              borderColor: appColors.green,
            },
          ]}>
          <AppText fontSize={fontSize.small - 3} color={appColors.border}>
            {specificPlan.title}
          </AppText>
          <AppText>{specificPlan.price}</AppText>
          <AppText fontSize={fontSize.small - 3}>
            {specificPlan.description}
          </AppText>
          <View style={choosePlanStyle.radioBtn} />

          <AppText
            fontType="medium"
            customStyle={{
              marginVertical: sizeBlock.getHeightSize(10),
            }}>
            Benefits
          </AppText>

          {specificPlan.benefits.map((text, index) => {
            return (
              <View
                key={index}
                style={[
                  universalStyle.verticalCentering,
                  {
                    gap: sizeBlock.getWidthSize(15),
                    width: '90%',
                  },
                ]}>
                <BulletIcon />
                <AppText>{text}</AppText>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View style={choosePlanStyle.container}>
        <AppButton
          customViewStyle={{
            position: 'relative',
          }}
          title="Pay Now"
          bgColor={appColors.green}
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChoosePlanScreen;
