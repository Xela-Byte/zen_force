import {useMutation} from '@tanstack/react-query';
import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {errorCodes, pick, types} from '@react-native-documents/picker';
import {uploadProfilePicture} from '@/api/profile';
import Avatar from '@/assets/images/avatar.png';
import PencilIcon from '@/assets/images/pencil_icon.svg';
import {useAppDispatch, useAppSelector} from '@/hooks/helpers/useRedux';
import useToast from '@/hooks/helpers/useToast';
import {profileStyle} from '@/styles/profileStyle';
import {borderRadius, sizeBlock} from '@/styles/universalStyle';
import AppButton from '../button/AppButton';
import AppImage from '../image/AppImage';
import {updateUser} from '@/store/slices/appSlice';

const ProfilePicture = () => {
  const {showToast} = useToast();

  const dispatch = useAppDispatch();

  const updateUserData = (payload: any) => {
    dispatch(updateUser(payload));
  };

  const [file, setFile] = useState<any>(null);

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

      setFile(uploadFile);
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
      updateUserData(result);
      setFile(null);
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

  const user = useAppSelector(state => state.app.user);

  const userData = useMemo(() => {
    return user?.userInfo;
  }, [user]);

  const getImageSource = () => {
    if (file) {
      return {uri: file.uri};
    }
    if (userData?.profileImage) {
      return {uri: userData.profileImage};
    }
    return Avatar; // Default avatar
  };

  const imageSource = useMemo(() => {
    return getImageSource();
  }, [file, userData?.profileImage]);

  return (
    <>
      <View style={profileStyle.avatarContainer}>
        <AppImage
          source={imageSource}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: borderRadius.full,
          }}
          resizeMode="cover"
          alt="Avatar"
        />

        <View style={profileStyle.editIcon}>
          <PencilIcon
            onPress={() => {
              handleFilePick();
            }}
          />
        </View>
      </View>
      {file && (
        <AppButton
          title="Update"
          customViewStyle={{
            width: sizeBlock.getWidthSize(120),
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: sizeBlock.getHeightSize(25),
          }}
          loading={profilePUploadMutation.isPending}
          onPress={() => {
            handleUpload();
          }}
        />
      )}
    </>
  );
};

export default ProfilePicture;
