import {View, Text, ActivityIndicator} from 'react-native';
import React, {useMemo, useState} from 'react';
import {detailsStyle} from '@/styles/detailsStyle';
import AppPressable from '../button/AppPressable';
import PfpIcon from '@/assets/svgsComponents/PfpIcon';
import {
  appColors,
  borderRadius,
  fontSize,
  sizeBlock,
} from '@/styles/universalStyle';
import AppText from '../text/AppText';
import useToast from '@/hooks/helpers/useToast';
import {useMutation} from '@tanstack/react-query';
import {uploadProfilePicture} from '@/api/profile';
import {errorCodes, pick, types} from '@react-native-documents/picker';
import AppImage from '../image/AppImage';
import {setCurrentVettingStep, VettingData} from '@/store/slices/appSlice';
import {useAppDispatch, useAppSelector} from '@/hooks/helpers/useRedux';

type Props = {
  storeVettingData: (payload: Partial<VettingData>) => void;
};

const UploadPPButton = ({storeVettingData}: Props) => {
  const {showToast} = useToast();
  const vettingData = useAppSelector(state => state.app.vettingData);
  const dispatch = useAppDispatch();

  const file = useMemo(() => {
    return vettingData?.profileImage || null;
  }, [vettingData?.profileImage]);

  const handleFilePick = async () => {
    try {
      const [result] = await pick({
        type: [types.images],
      });

      const uploadFile = {
        uri: result.uri,
        name: result.name ?? 'profile.png',
        type: result.type ?? 'image/png',
      };

      storeVettingData({profileImage: uploadFile});
    } catch (err) {
      if (errorCodes.OPERATION_CANCELED) {
        console.log('User canceled file picker');
      } else {
        console.error('DocumentPicker Error:', err);
        showToast({
          text1: 'Error updating profile picture.',
          type: 'error',
          text2: 'An error occurred while selecting the file.',
        });
      }
    }
  };

  const profilePUploadMutation = useMutation({
    mutationFn: uploadProfilePicture,
    onSuccess: result => {
      showToast({
        text1: `Profile picture updated!`,
        text2: `Let's go 🚀`,
        type: 'success',
      });
    },
    onError: (error: any) => {
      showToast({
        text1: 'Error updating profile picture.',
        type: 'error',
        text2: 'Profile picture update failed',
      });
    },
  });

  const handleUpload = () => {
    if (file) {
      profilePUploadMutation.mutate(file);
    } else {
      showToast({
        text1: 'Error updating profile picture.',
        type: 'error',
        text2: 'No file selected.',
      });
    }
  };

  return (
    <View style={detailsStyle.uploadBtnWrapper}>
      <AppPressable
        customViewStyle={{position: 'relative'}}
        onPress={() => {
          handleFilePick();
        }}>
        {!file && !file?.uri ? (
          <>
            <PfpIcon />
            <AppText
              fontSize={fontSize.medium}
              customStyle={{position: 'absolute', top: -10, right: 0}}>
              +
            </AppText>
          </>
        ) : (
          <AppImage
            style={{
              width: sizeBlock.getWidthSize(70),
              height: sizeBlock.getWidthSize(70),
              borderRadius: borderRadius.full,
            }}
            source={{
              uri: file.uri,
            }}
            resizeMode="cover"
          />
        )}
      </AppPressable>
      <AppPressable
        customViewStyle={{
          borderColor: appColors.text,
          borderWidth: 2,
          paddingVertical: sizeBlock.getHeightSize(10),
          paddingHorizontal: sizeBlock.getWidthSize(20),
          borderRadius: borderRadius.medium,
        }}
        disabled={!file && !file?.uri}
        onPress={() => {
          handleUpload();
        }}>
        <AppText fontSize={fontSize.small - 1}>
          {profilePUploadMutation.isPending ? (
            <ActivityIndicator color={'black'} />
          ) : (
            'Upload'
          )}
        </AppText>
      </AppPressable>
    </View>
  );
};

export default UploadPPButton;
