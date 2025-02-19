import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useCallback, useEffect, useRef, useMemo} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {
  appColors,
  borderRadius,
  fontSize,
  screenHeight,
  screenWidth,
  sizeBlock,
  universalStyle,
} from '../../styles/universalStyle';
import AppText from '../text/AppText';
import CheckmarkIcon from '../../assets/images/circle-checkmark.svg';
import AppButton from '../button/AppButton';

type Props = {
  showBottomTab: boolean;
  setShowBottomTab: (value: boolean) => void;
};

const PartnerLinkSuccess = ({setShowBottomTab, showBottomTab}: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleDone = () => {
    bottomSheetRef.current?.close();
    setShowBottomTab(false);
    Alert.alert('done');
  };

  useEffect(() => {
    if (showBottomTab) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [showBottomTab]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.7}
        pressBehavior={'none'}
      />
    ),
    [],
  );

  const snapPoints = useMemo(() => ['50%'], []);
  return (
    <>
      <View
        style={[
          styles.container,
          {
            display: !showBottomTab ? 'none' : 'flex',
          },
        ]}>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          backgroundStyle={styles.sheetBackground}
          index={1}
          enablePanDownToClose
          onClose={() => {
            setShowBottomTab(false);
          }}
          handleIndicatorStyle={styles.handleIndicator}>
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.innerContent}>
              <CheckmarkIcon style={styles.icon} />
              <AppText fontSize={fontSize.medium - 5} fontType="medium">
                Partner Linked
              </AppText>
              <AppText fontSize={fontSize.small - 1}>
                Code accepted. Partner linked successfully.
              </AppText>
              <AppButton
                title="Continue"
                bgColor={appColors.green}
                customViewStyle={styles.button}
                onPress={() => {
                  handleDone();
                }}
              />
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    zIndex: 9999,
  },
  sheetBackground: {
    backgroundColor: appColors.white,
  },
  handleIndicator: {
    backgroundColor: appColors.text,
  },
  contentContainer: {
    padding: 20,
    width: screenWidth,
  },
  innerContent: {
    ...universalStyle.centering,
    flexDirection: 'column',
    rowGap: sizeBlock.getHeightSize(20),
  },
  icon: {
    marginTop: sizeBlock.getHeightSize(10),
  },
  button: {
    width: screenWidth * 0.8,
    marginTop: sizeBlock.getHeightSize(20),
  },
});
export default PartnerLinkSuccess;
