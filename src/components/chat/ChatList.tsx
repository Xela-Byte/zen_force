import {useQuery} from '@tanstack/react-query';
import React, {useCallback, useEffect, useRef} from 'react';
import {FlatList, View} from 'react-native';
import {fetchUserChats} from '../../api/chat';
import {screenHeight, sizeBlock} from '../../styles/universalStyle';
import AppText from '../text/AppText';
import ChatBubbleComponent from './ChatBubbleComponent';
import PendingMessageComponent from './PendingMessageComponent';

interface Chat {
  _id: string;
  userId: string;
  userMessage: string;
  aiResponse: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const LoadingComponent = () => (
  <View style={{paddingHorizontal: sizeBlock.getWidthSize(15)}}>
    {Array.from({length: 5}).map((_, index) => (
      <ChatBubbleComponent key={index} isOwn={index % 2 === 0} isLoading />
    ))}
  </View>
);

interface ChatProps {
  inputInFocus: boolean;
  isMessagePending: boolean;
  isMessageSuccess: boolean;
  message: string;
  isMessageError: boolean;
}

const ChatList = ({
  inputInFocus,
  isMessageError,
  isMessagePending,
  isMessageSuccess,
  message,
}: ChatProps) => {
  const {
    data: chats,
    isLoading,
    isError,
  } = useQuery<Chat[]>({
    queryKey: ['chats'],
    queryFn: fetchUserChats,
  });

  const flatListRef = useRef<FlatList>(null);
  const NORMAL_HEIGHT = screenHeight * 0.76;
  const INPUT_IN_FOCUS_HEIGHT = screenHeight * 0.35;
  const chatListHeight = inputInFocus ? INPUT_IN_FOCUS_HEIGHT : NORMAL_HEIGHT;

  if (isLoading) return <LoadingComponent />;
  if (isError) return <AppText>Failed to load chats</AppText>;

  const ChatBodyComponent = useCallback(
    ({item}: {item: Chat}) => {
      return (
        <View style={{paddingHorizontal: sizeBlock.getWidthSize(15)}}>
          <ChatBubbleComponent
            isOwn
            message={item.userMessage}
            isLoading={false}
          />
          <ChatBubbleComponent
            isOwn={false}
            message={item.aiResponse}
            isLoading={false}
          />
        </View>
      );
    },
    [chats],
  );

  return (
    <View
      style={{
        height: chatListHeight,
        paddingVertical: sizeBlock.getHeightSize(15),
      }}>
      <FlatList
        ref={flatListRef}
        data={chats}
        keyExtractor={item => item._id}
        renderItem={({item}) => <ChatBodyComponent item={item} />}
        ListEmptyComponent={<AppText>No messages yet.</AppText>}
        contentContainerStyle={{paddingBottom: 20}}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        ListHeaderComponent={
          isMessagePending || isMessageError ? (
            <PendingMessageComponent
              isPending={isMessagePending}
              isSuccess={isMessageSuccess}
              message={message}
              isError={isMessageError}
            />
          ) : null
        }
        inverted
      />
    </View>
  );
};

export default ChatList;
