import React, {useMemo, useState} from 'react';
import {Alert, Share, ToastAndroid, View} from 'react-native';
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
import useToast from '../../hooks/helpers/useToast';
import {useMutation} from '@tanstack/react-query';
import {linkPartnerFn} from '../../api/profile';
import {useAppSelector} from '../../hooks/helpers/useRedux';
import Clipboard from '@react-native-clipboard/clipboard';

interface Props {
  handleStep: (value: number) => void;
}

const StepFive = ({handleStep}: Props) => {
  const tempUser = useAppSelector(state => state.app.tempUser);
  const [showBottomTab, setShowBottomTab] = useState(false);
  const [code, setCode] = useState('');

  const CELL_COUNT = 8;

  const userInviteCode = useMemo(() => {
    return tempUser?.inviteCode || '';
  }, [tempUser?.inviteCode]);

  const isValidCode = useMemo(() => {
    return code.length === CELL_COUNT;
  }, [code]);

  const handleCodeInput = (value: string) => {
    setCode(value);
  };

  const formattedCode = useMemo(() => {
    return (
      code
        .match(/.{1,2}/g)
        ?.join('-')
        .toUpperCase() || ''
    );
  }, [code]);

  const {showToast} = useToast();

  const linkPartnerMutation = useMutation({
    mutationFn: linkPartnerFn,
    onSuccess: result => {
      showToast({
        text1: `Partner linked!`,
        text2: `Let's go 🚀`,
        type: 'success',
      });
      setShowBottomTab(true);
    },
    onError: (error: any) => {
      showToast({
        text1: 'Oops, Error linking partner!',
        type: 'error',
        text2: error?.message || 'Linking partner failed',
      });
    },
  });

  const handleLinkPartner = () => {
    if (isValidCode) {
      linkPartnerMutation.mutate({partnerInviteCode: formattedCode});
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Share your invite code: ${userInviteCode}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(result.activityType);
        } else {
          return;
        }
      } else if (result.action === Share.dismissedAction) {
        return;
      }
    } catch (error: any) {
      ToastAndroid.showWithGravity(error.message, 1000, ToastAndroid.BOTTOM);
    }
  };

  const copyInviteCode = () => {
    Clipboard.setString(userInviteCode);
    showToast({
      text1: `Invite code copied!`,
      text2: `Let's go 🚀`,
      type: 'success',
    });
  };

  return (
    <>
      <AppText customStyle={{marginVertical: sizeBlock.getHeightSize(10)}}>
        Your partner must also install the app and get a user ID
      </AppText>

      <AppButton
        title="Invite partner to download"
        onPress={() => {
          onShare();
        }}
        textColor={appColors.green}
        bgColor={appColors.lightGreen}
        customViewStyle={{
          marginVertical: sizeBlock.getHeightSize(20),
        }}
      />

      <AppText fontSize={fontSize.small + 1}>Your invite code is:</AppText>

      <AppPressable
        onPress={() => {
          copyInviteCode();
        }}
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
            {userInviteCode}
          </AppText>

          <ClipboardIcon />
        </View>
      </AppPressable>

      <View
        style={{
          marginHorizontal: 'auto',
          marginBottom: sizeBlock.getHeightSize(30),
        }}>
        <QRCode value={userInviteCode} />
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
        <CodeInputComponent
          cellCount={CELL_COUNT}
          onChange={(value: string) => {
            handleCodeInput(value);
          }}
        />
      </View>

      {showBottomTab && (
        <AbsoluteOverlay>
          <PartnerLinkSuccess
            setShowBottomTab={setShowBottomTab}
            showBottomTab={showBottomTab}
            onDone={() => {
              handleStep(5);
            }}
          />
        </AbsoluteOverlay>
      )}

      <AppButton
        title="Connect Now"
        bgColor={appColors.green}
        customViewStyle={{
          marginTop: sizeBlock.getHeightSize(20),
        }}
        disabled={!isValidCode}
        loading={linkPartnerMutation.isPending}
        onPress={() => {
          handleLinkPartner();
        }}
      />
    </>
  );
};

export default StepFive;
