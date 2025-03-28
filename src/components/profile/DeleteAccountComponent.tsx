import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import ClockIcon from '@/assets/profileIcons/clock.svg';
import ArrowLeft from '@/assets/svgsComponents/ArrowLeft';
import {profileStyle} from '@/styles/profileStyle';
import {sizeBlock} from '@/styles/universalStyle';
import AppPressable from '../button/AppPressable';
import AppText from '../text/AppText';
import PopupComponent from '../popup/PopupComponent';
import useToast from '@/hooks/helpers/useToast';
import {useMutation} from '@tanstack/react-query';
import {deleteAccountFn} from '@/api/auth/delete-account';
import {useAppDispatch} from '@/hooks/helpers/useRedux';
import {logout} from '@/store/slices/appSlice';

const DeleteAccountComponent = () => {
  const [showBottomTab, setShowBottomTab] = useState(false);
  const {showToast} = useToast();
  const dispatch = useAppDispatch();

  // Logout function (to be called when needed)
  const logoutUser = () => dispatch(logout());

  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccountFn,
    onSuccess: () => {
      showToast({
        text1: 'Account Deleted',
        type: 'success',
        text2: 'Your account has been successfully deleted.',
      });

      logoutUser();
    },
    onError: () => {
      showToast({
        text1: 'Error deleting account.',
        type: 'error',
        text2: 'Delete account failed. Please try again.',
      });
    },
  });

  const onDeleteAccount = async () => {
    setShowBottomTab(false);
    await deleteAccountMutation.mutateAsync();
  };

  // Cleanup effect
  useEffect(() => {
    return () => setShowBottomTab(false);
  }, []);

  return (
    <>
      <AppPressable
        customViewStyle={{marginTop: sizeBlock.getHeightSize(40)}}
        onPress={() => setShowBottomTab(true)}>
        <View style={profileStyle.tab}>
          <ClockIcon />
          <AppText>
            {deleteAccountMutation.isPending
              ? 'Deleting Account...'
              : 'Delete Account'}
          </AppText>
          <ArrowLeft
            style={{transform: [{rotate: '180deg'}], marginLeft: 'auto'}}
          />
        </View>
      </AppPressable>

      {showBottomTab && (
        <PopupComponent
          type="multi"
          title="Delete Account"
          onDone={onDeleteAccount}
          confirmBtnTitle="Delete"
          onCancel={() => setShowBottomTab(false)}
          content="Are you sure you want to delete your account? You will lose everything."
        />
      )}
    </>
  );
};

export default DeleteAccountComponent;
