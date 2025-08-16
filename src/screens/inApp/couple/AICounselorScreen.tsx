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
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Keyboard, TextInput, View, SafeAreaView} from 'react-native';

interface Inputs {
  messageBody: string;
}

const AICounselorScreen = ({navigation}: AICounselorScreenProps) => {
  const {control, watch, setValue} = useForm<Inputs>();
  const messageBody = watch('messageBody');
  const [pendingMessage, setPendingMessage] = useState('');
  const [inputInFocus, setInputInFocus] = useState(false);
  const invalidateQuery = useInvalidateQuery();

  const sendMessageMutation = useMutation({
    mutationFn: sendMessageFn,
    onSuccess: result => {
      setPendingMessage('');
      invalidateQuery('chats');
    },
    onError: (error: any) => {
      console.error('login error:', error);
    },
  });

  const isInputValid = useMemo(() => {
    return messageBody && messageBody.length > 0;
  }, [messageBody]);

  const sendMessage = useCallback(async () => {
    const messageToSend = messageBody.trim();
    setPendingMessage(messageToSend);
    setValue('messageBody', '');
    Keyboard.dismiss();
    await sendMessageMutation.mutateAsync({
      prompt: messageToSend,
    });
  }, [messageBody]);

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
    </>
  );
};

export default AICounselorScreen;
