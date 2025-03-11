import {ScrollView, StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import HeaderComponent from '../../../components/button/HeaderComponent';
import AppText from '../../../components/text/AppText';
import {
  borderRadius,
  fontSize,
  sizeBlock,
  universalStyle,
} from '../../../styles/universalStyle';
import ChestIcon from '../../../assets/images/chest.svg';
import {ProgressTrackingScreenProps} from '../../../types/navigation/CoupleNavigationType';

const ProgressCard = ({
  title,
  progress,
  subtitle,
}: {
  title: string;
  subtitle: string;
  progress: number | false; // Ensuring progress is either a number or false
}) => {
  return (
    <View style={styles.card}>
      <AppText color="#321C1C" fontType="medium" fontSize={fontSize.small + 10}>
        {title} {progress !== false && `- ${progress}%`}
      </AppText>
      <AppText
        fontType="medium"
        color="#877777"
        customStyle={{
          marginTop: sizeBlock.getHeightSize(5),
          marginBottom: sizeBlock.getHeightSize(30),
        }}>
        {subtitle}
      </AppText>

      {progress !== false && (
        <>
          <View style={[universalStyle.spaceBetween, {width: '100%'}]}>
            <View style={{width: '85%'}}>
              <View style={styles.progressContainer}>
                <Animatable.View
                  animation={{from: {width: '0%'}, to: {width: `${progress}%`}}}
                  duration={1000}
                  style={[styles.progressBar, {width: `${progress}%`}]}
                />
              </View>
            </View>
            <ChestIcon />
          </View>
          <View style={styles.progressLabels}>
            <AppText color="#877777" fontType="medium">
              {progress}%
            </AppText>
            <AppText fontType="medium" color="#877777">
              Goal: 100%
            </AppText>
          </View>
        </>
      )}
    </View>
  );
};

const ProgressTrackingScreen = ({navigation}: ProgressTrackingScreenProps) => {
  return (
    <LinearGradient
      style={[universalStyle.container]}
      colors={['#3BA700', '#5B783D', '#364724']}>
      <HeaderComponent navigation={navigation} title="Activity" theme="light" />
      <ScrollView
        contentContainerStyle={{
          padding: sizeBlock.getWidthSize(20),
          rowGap: sizeBlock.getHeightSize(30),
        }}>
        <ProgressCard
          progress={25}
          title="Communication"
          subtitle="Measure communication improvements"
        />
        <ProgressCard
          progress={5}
          title="Relationship Health"
          subtitle="Measure communication improvements"
        />
        <ProgressCard
          progress={false}
          title="Milestone tracker"
          subtitle="It’s 5 years now! Happy anniversary..."
        />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 10,
    elevation: 5,
  },

  progressContainer: {
    height: sizeBlock.getHeightSize(10),
    backgroundColor: '#D9D1C2',
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginVertical: sizeBlock.getHeightSize(10),
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#24B874',
    borderRadius: borderRadius.full,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
});

export default ProgressTrackingScreen;
