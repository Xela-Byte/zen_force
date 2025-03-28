import {StyleSheet, View} from 'react-native';
import Markdown from 'react-native-markdown-display';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AiChatIcon from '@/assets/images/ai_chat_icon.png';
import {
  appColors,
  borderRadius,
  fontFamily,
  fontSize,
  sizeBlock,
  universalStyle,
} from '@/styles/universalStyle';
import AppImage from '../image/AppImage';

type Props = {
  isOwn: boolean;
  message?: string; // Optional for skeleton loading
  isLoading?: boolean; // Flag to determine if loading
};

const ChatBubbleComponent = ({isOwn, message, isLoading}: Props) => {
  const markdownStyles = {
    body: {
      fontSize: fontSize.small,
      fontFamily: fontFamily.regular,
      color: appColors.text,
    },
    heading1: {
      fontSize: fontSize.small,
      fontFamily: fontFamily.semiBold,
      color: appColors.text,
    },

    strong: {
      fontSize: fontSize.small,
      fontFamily: fontFamily.semiBold,
      fontWeight: '600',
      color: appColors.text,
    },
    list_item: {
      fontSize: fontSize.small,
      marginVertical: 5,
      fontFamily: fontFamily.regular,
      color: appColors.text,
    },
  };

  return (
    <View
      style={[
        styles.bubbleContainer,
        isOwn ? styles.ownBubbleContainer : styles.otherBubbleContainer,
      ]}>
      {!isOwn && (
        <AppImage
          source={AiChatIcon}
          style={{
            width: sizeBlock.getWidthSize(25),
            height: sizeBlock.getWidthSize(25),
            alignSelf: 'flex-end',
          }}
        />
      )}

      <View
        style={[styles.bubble, isOwn ? styles.ownBubble : styles.otherBubble]}>
        {isLoading ? (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              width={150}
              height={20}
              borderRadius={8}
            />
          </SkeletonPlaceholder>
        ) : (
          <Markdown style={markdownStyles}>{message?.trim()}</Markdown>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    maxWidth: '80%',
    marginVertical: 5,
    paddingHorizontal: sizeBlock.getWidthSize(2),
    paddingVertical: sizeBlock.getHeightSize(5),
    ...universalStyle.verticalCentering,
    columnGap: sizeBlock.getWidthSize(10),
  },
  ownBubbleContainer: {
    alignSelf: 'flex-end',
  },
  otherBubbleContainer: {
    maxWidth: '90%',
    alignSelf: 'flex-start',
  },
  bubble: {
    paddingHorizontal: sizeBlock.getWidthSize(20),
    paddingVertical: sizeBlock.getHeightSize(15),
    borderRadius: borderRadius.medium + 10,
  },
  ownBubble: {
    backgroundColor: '#AACF95',
    borderTopRightRadius: 0,
  },
  otherBubble: {
    backgroundColor: '#3BA700',
    borderBottomLeftRadius: 0,
  },
});

export default ChatBubbleComponent;
