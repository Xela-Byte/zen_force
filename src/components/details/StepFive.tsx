import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ClipboardIcon from '../../assets/images/clipboard_icon.svg';
import {
  appColors,
  borderRadius,
  fontSize,
  sizeBlock,
  universalStyle,
} from '../../styles/universalStyle';
import AppButton from '../button/AppButton';
import AppPressable from '../button/AppPressable';
import AppText from '../text/AppText';
import PartnerLinkSuccess from './PartnerLinkSuccess';
import CodeInputComponent from './CodeInputComponent';
import AbsoluteOverlay from '../background/AbsoluteOverlay';

interface Props {
  handleStep: (value: number) => void;
}

const StepFive = (props: Props) => {
  const [showBottomTab, setShowBottomTab] = useState(false);

  return (
    <>
      <AppText customStyle={{marginVertical: sizeBlock.getHeightSize(10)}}>
        Your partner must also install the app and get a user ID
      </AppText>

      <AppButton
        title="Invite partner to download"
        onPress={() => {}}
        textColor={appColors.green}
        bgColor={appColors.lightGreen}
        customViewStyle={{
          marginVertical: sizeBlock.getHeightSize(20),
        }}
      />

      <AppText fontSize={fontSize.small + 1}>Your invite code is:</AppText>

      <AppPressable
        onPress={() => {}}
        customViewStyle={{
          marginVertical: sizeBlock.getHeightSize(20),
          marginHorizontal: 'auto',
        }}>
        <View
          style={{
            ...universalStyle.flexBetween,
            columnGap: sizeBlock.getWidthSize(15),
          }}>
          <AppText
            fontSize={sizeBlock.fontSize(32)}
            fontType="medium"
            color={appColors.green}>
            19-F2-30-78
          </AppText>

          <ClipboardIcon />
        </View>
      </AppPressable>

      <View
        style={{
          marginHorizontal: 'auto',
          marginBottom: sizeBlock.getHeightSize(30),
        }}>
        <QRCode value="19-F2-30-78" />
      </View>

      <AppText
        customStyle={{marginBottom: sizeBlock.getHeightSize(5)}}
        fontType="medium">
        If your partner has a Code
      </AppText>
      <AppText>
        Input your partner’s code to connect Or scan your partner’s QR Code
      </AppText>

      <View
        style={{
          backgroundColor: appColors.lightCyan,
          marginVertical: sizeBlock.getHeightSize(20),
          padding: sizeBlock.getWidthSize(10),
          borderRadius: borderRadius.medium,
        }}>
        <CodeInputComponent />
      </View>

      {showBottomTab && (
        <AbsoluteOverlay>
          <PartnerLinkSuccess
            setShowBottomTab={setShowBottomTab}
            showBottomTab={showBottomTab}
          />
        </AbsoluteOverlay>
      )}

      <AppButton
        title="Connect Now"
        bgColor={appColors.green}
        customViewStyle={{
          marginTop: sizeBlock.getHeightSize(20),
        }}
        onPress={() => {
          setShowBottomTab(true);
        }}
      />
    </>
  );
};

export default StepFive;
