import {View, Text, TextInput, ScrollView} from 'react-native';
import React from 'react';
import {aiCounselorStyle} from '../../../styles/aiCounselorStyle';
import HeaderComponent from '../../../components/button/HeaderComponent';
import {AICounselorScreenProps} from '../../../types/navigation/CoupleNavigationType';
import {Controller, useForm} from 'react-hook-form';
import {
  appColors,
  screenHeight,
  sizeBlock,
} from '../../../styles/universalStyle';
import SendIcon from '../../../assets/images/send.svg';
import MicIcon from '../../../assets/images/Mic.svg';
import ChatBubbleComponent from '../../../components/chat/ChatBubbleComponent';

interface Inputs {
  messageBody: string;
}

const chatMessages = [
  {
    isOwn: true,
    message: "Hey! How's it going?",
    time: '10:30 AM',
  },
  {
    isOwn: false,
    message: "Hey! I'm doing great, how about you?",
    time: '10:31 AM',
  },
  {
    isOwn: true,
    message: "I'm good too! Just working on a project.",
    time: '10:32 AM',
  },
  {
    isOwn: false,
    message: 'Nice! What kind of project?',
    time: '10:33 AM',
  },
  {
    isOwn: true,
    message: 'A chat app with cool bubble styles!',
    time: '10:34 AM',
  },
];

const AICounselorScreen = ({navigation}: AICounselorScreenProps) => {
  const {control, watch} = useForm<Inputs>();
  const messageBody = watch('messageBody');

  return (
    <View style={aiCounselorStyle.wrapper}>
      <View style={aiCounselorStyle.header}>
        <HeaderComponent
          theme="light"
          navigation={navigation}
          title="AI Counselor"
        />
      </View>

      <ScrollView
        style={{
          height: screenHeight * 0.7,
          paddingHorizontal: sizeBlock.getWidthSize(15),
        }}>
        {chatMessages.map((msg, index) => {
          return (
            <ChatBubbleComponent
              key={index}
              isOwn={msg.isOwn}
              message={msg.message}
              time={msg.time}
            />
          );
        })}
      </ScrollView>

      <View style={aiCounselorStyle.messageInputWrapper}>
        <View style={aiCounselorStyle.messageInputContainer}>
          <Controller
            control={control}
            name={'messageBody'}
            render={({field: {value, onChange}}) => (
              <>
                <View style={aiCounselorStyle.inputContainer}>
                  <TextInput
                    style={aiCounselorStyle.input}
                    placeholderTextColor={appColors.black}
                    placeholder="Write your message"
                    value={value}
                    onChangeText={onChange}
                    returnKeyType={messageBody ? 'send' : 'default'}
                    multiline
                  />

                  <SendIcon />
                </View>
              </>
            )}
          />
        </View>

        <MicIcon />
      </View>
    </View>
  );
};

export default AICounselorScreen;
