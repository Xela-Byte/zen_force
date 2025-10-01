import {sendMessageFn} from '@/api/chat';
import MicIcon from '@/assets/images/Mic.svg';
import SendIcon from '@/assets/images/send.svg';
import HeaderComponent from '@/components/button/HeaderComponent';
import ChatList from '@/components/chat/ChatList';
import useInvalidateQuery from '@/hooks/queries/useInvalidateQueries';
import {aiCounselorStyle} from '@/styles/aiCounselorStyle';
import {appColors} from '@/styles/universalStyle';
import {AICounselorScreenProps} from '@/types/navigation/CoupleNavigationType';
import {useMutation} from '@tanstack/react-query';
import {useDispatch} from 'react-redux';
import {incrementAISession} from '@/store/slices/progressSlice';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Keyboard, TextInput, View, SafeAreaView} from 'react-native';
import {useAppSelector} from '@/hooks/helpers/useRedux';
import {
  hasActiveSubscription,
  hasFeatureAccess,
  getRequiredTierForFeature,
} from '@/utils/subscriptionUtils';
import SubscriptionRestrictionModal from '@/components/subscription/SubscriptionRestrictionModal';

interface Inputs {
  messageBody: string;
}

const AICounselorScreen = ({navigation}: AICounselorScreenProps) => {
  const {control, watch, setValue} = useForm<Inputs>();
  const messageBody = watch('messageBody');
  const [pendingMessage, setPendingMessage] = useState('');
  const [inputInFocus, setInputInFocus] = useState(false);
  const [restrictionModal, setRestrictionModal] = useState<{
    visible: boolean;
    currentTier: string;
    requiredTier: string;
    featureName: string;
  }>({
    visible: false,
    currentTier: 'basic',
    requiredTier: 'elite',
    featureName: '',
  });
  const invalidateQuery = useInvalidateQuery();

  // Get user subscription data at component level
  const user = useAppSelector(state => state.app.user);
  const currentTier = user?.userInfo?.subscription?.tier || 'basic';
  const isSubscribed = user?.userInfo?.subscription?.isSubscribed ?? false;
  const status = user?.userInfo?.subscription?.status || 'inactive';
  const expired = user?.userInfo?.subscription?.expired ?? false;
  const expiryDate = user?.userInfo?.subscription?.expiryDate as
    | string
    | undefined;

  const dispatch = useDispatch();
  const sendMessageMutation = useMutation({
    mutationFn: sendMessageFn,
    onSuccess: result => {
      setPendingMessage('');
      invalidateQuery('chats');
      dispatch(incrementAISession());
    },
    onError: (error: any) => {
      console.error('login error:', error);
    },
  });

  const isInputValid = useMemo(() => {
    return messageBody && messageBody.length > 0;
  }, [messageBody]);

  const sendMessage = useCallback(async () => {
    // Check subscription before sending message
    const requiredTier = getRequiredTierForFeature('ai_coaching');
    const hasActiveSub = hasActiveSubscription(
      isSubscribed,
      status as any,
      expired,
      expiryDate,
    );
    const canAccess =
      hasFeatureAccess(currentTier, requiredTier) && hasActiveSub;

    if (!canAccess) {
      setRestrictionModal({
        visible: true,
        currentTier,
        requiredTier,
        featureName: getFeatureDisplayName('ai_coaching'),
      });
      return;
    }

    const messageToSend = messageBody.trim();
    setPendingMessage(messageToSend);
    setValue('messageBody', '');
    Keyboard.dismiss();
    await sendMessageMutation.mutateAsync({
      prompt: messageToSend,
    });
  }, [messageBody, currentTier, isSubscribed, status, expired]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setInputInFocus(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setInputInFocus(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <>
      <SafeAreaView style={aiCounselorStyle.wrapper}>
        {/* Header */}
        <View style={aiCounselorStyle.header}>
          <HeaderComponent
            theme="light"
            navigation={navigation}
            title="AI Counselor"
          />
        </View>

        {/* Chat List */}
        <ChatList
          inputInFocus={inputInFocus}
          isMessageError={sendMessageMutation.isError}
          isMessagePending={sendMessageMutation.isPending}
          isMessageSuccess={sendMessageMutation.isSuccess}
          message={pendingMessage}
        />

        {/* Message Input */}
        <View style={aiCounselorStyle.messageInputWrapper}>
          <View style={aiCounselorStyle.messageInputContainer}>
            <Controller
              control={control}
              name="messageBody"
              render={({field: {value, onChange}}) => (
                <View style={aiCounselorStyle.inputContainer}>
                  <TextInput
                    style={aiCounselorStyle.input}
                    placeholder="Write your message"
                    placeholderTextColor={appColors.black}
                    value={value}
                    onChangeText={onChange}
                    returnKeyType={messageBody ? 'send' : 'default'}
                    multiline
                    cursorColor={appColors.text}
                    onBlur={() => {
                      setInputInFocus(false);
                    }}
                    onFocus={() => {
                      setInputInFocus(true);
                    }}
                  />
                  <SendIcon
                    opacity={isInputValid ? 1 : 0.5}
                    disabled={!isInputValid}
                    onPress={sendMessage}
                  />
                </View>
              )}
            />
          </View>

          <MicIcon opacity={0.4} />
        </View>
      </SafeAreaView>

      <SubscriptionRestrictionModal
        visible={restrictionModal.visible}
        onClose={() => setRestrictionModal(prev => ({...prev, visible: false}))}
        onUpgrade={() => {
          setRestrictionModal(prev => ({...prev, visible: false}));
          navigation
            .getParent()
            ?.navigate('Profile', {screen: 'ChoosePlanScreen'});
        }}
        currentTier={restrictionModal.currentTier as any}
        requiredTier={restrictionModal.requiredTier as any}
        featureName={restrictionModal.featureName}
      />
    </>
  );
};

const getFeatureDisplayName = (feature: string): string => {
  const featureNames: Record<string, string> = {
    unlimited_questions: 'Unlimited Questions',
    analytics: 'Analytics & Progress Reports',
    romance_section: 'Romance & Intimacy Section',
    ai_coaching: 'AI-Powered Coaching',
    expert_sessions: 'Expert Q&A Sessions',
    priority_support: 'Priority Support',
    early_access: 'Early Access Features',
  };

  return featureNames[feature] || feature;
};

export default AICounselorScreen;
