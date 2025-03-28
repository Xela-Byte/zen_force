import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {appColors, fontSize, sizeBlock} from '@/styles/universalStyle';
import ChatBubbleComponent from './ChatBubbleComponent';
import AppText from '../text/AppText';

type Props = {
  message: string;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  retry?: () => void;
};

const PendingMessageComponent = ({
  isSuccess,
  isPending,
  message,
  isError,
  retry,
}: Props) => {
  return (
    <>
      {!!message && (
        <Pressable
          onPress={() => {
            if (isError) retry?.(); // Only retry if there's an error
          }}
          disabled={!isError} // Prevent unnecessary re-renders
          style={{
            paddingHorizontal: sizeBlock.getWidthSize(15),
            marginLeft: 'auto',
          }}>
          {/* Always display the chat bubble, even if sent successfully */}
          <ChatBubbleComponent isOwn isLoading={false} message={message} />

          {/* Status Message */}
          {!isSuccess && (
            <View
              style={{
                marginTop: 0, // Avoid negative margin
                alignItems: 'flex-end',
              }}>
              {isPending && (
                <AppText
                  color={appColors.textGrey}
                  fontSize={fontSize.small - 3}>
                  Sending message...
                </AppText>
              )}
              {isError && (
                <AppText color="red" fontSize={fontSize.small - 3}>
                  Message not sent. Tap to retry.
                </AppText>
              )}
            </View>
          )}
        </Pressable>
      )}
    </>
  );
};

export default PendingMessageComponent;
