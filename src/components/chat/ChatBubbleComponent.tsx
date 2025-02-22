import {StyleSheet, View} from 'react-native';
import AppText from '../text/AppText';
import {
  appColors,
  borderRadius,
  sizeBlock,
  universalStyle,
} from '../../styles/universalStyle';
import AiChatIcon from '../../assets/images/ai_chat_icon.png';
import AppImage from '../image/AppImage';

type Props = {
  isOwn: boolean;
  message: string;
  time: string;
};

const ChatBubbleComponent = ({isOwn, message}: Props) => {
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
          }}
        />
      )}
      <View
        style={[styles.bubble, isOwn ? styles.ownBubble : styles.otherBubble]}>
        <AppText color={appColors.text}>{message}</AppText>
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
