import CurvedArrow from '@/assets/images/curved-arrow.svg';
import AppLogo from '@/assets/images/logo.png';
import Pattern from '@/assets/images/pattern.svg';
import AppButton from '@/components/button/AppButton';
import HeaderComponent from '@/components/button/HeaderComponent';
import AppImage from '@/components/image/AppImage';
import PopupComponent from '@/components/popup/PopupComponent';
import AppText from '@/components/text/AppText';
import {useAppSelector} from '@/hooks/helpers/useRedux';
import {useFetchPartnerQuery} from '@/hooks/queries/useFetchPartnerQuery';
import {
  appColors,
  borderRadius,
  fontSize,
  screenHeight,
  screenWidth,
  sizeBlock,
  universalStyle,
} from '@/styles/universalStyle';
import {viewPartnerStyle} from '@/styles/viewPartnerStyle';
import {ViewPartnerScreenProps} from '@/types/navigation/HomeStackNavigationType';
import {useMemo, useState} from 'react';
import {ScrollView, StatusBar, View, SafeAreaView} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ViewPartnerScreen = ({navigation}: ViewPartnerScreenProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const {data, isLoading, isSuccess, isError} = useFetchPartnerQuery();

  const LoadingState = () => {
    return (
      <SkeletonPlaceholder>
        <View
          style={{
            marginVertical: sizeBlock.getHeightSize(80),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/* First Avatar & Name */}
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                width: sizeBlock.getWidthSize(90),
                height: sizeBlock.getWidthSize(90),
                borderRadius: 50,
              }}
            />
            <View
              style={{
                marginTop: sizeBlock.getHeightSize(10),
                width: sizeBlock.getWidthSize(100),
                height: sizeBlock.getHeightSize(15),
                borderRadius: 4,
              }}
            />
          </View>

          {/* Second Avatar & Name */}
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                width: sizeBlock.getWidthSize(90),
                height: sizeBlock.getWidthSize(90),
                borderRadius: 50,
              }}
            />
            <View
              style={{
                marginTop: sizeBlock.getHeightSize(10),
                width: sizeBlock.getWidthSize(100),
                height: sizeBlock.getHeightSize(15),
                borderRadius: 4,
              }}
            />
          </View>
        </View>
      </SkeletonPlaceholder>
    );
  };

  const user = useAppSelector(state => state.app.user);
  const userData = useMemo(() => {
    return user?.userInfo;
  }, [user]);

  const partnerName = useMemo(() => {
    return data?.fullName || 'Zen User';
  }, [data]);

  const partnerImage = useMemo(() => {
    return data?.profileImage || 'Zen User';
  }, [data]);

  return (
    <>
      {showPopup && (
        <PopupComponent
          type="multi"
          title="Disconnect Partner"
          onDone={() => {}}
          confirmBtnTitle="Proceed"
          onCancel={() => {
            setShowPopup(false);
          }}
          content="All history with this partner will be cleared if you disconnect partner."
        />
      )}
      <SafeAreaView style={viewPartnerStyle.wrapper}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={appColors.white}
        />
        <ScrollView style={viewPartnerStyle.wrapper}>
          <Pattern
            width={screenWidth}
            height={screenHeight}
            style={{
              position: 'absolute',
            }}
          />
          <HeaderComponent title="Your Partner" navigation={navigation} />
          <View style={viewPartnerStyle.container}>
            <View style={viewPartnerStyle.partnerTab}>
              <AppText fontType="semiBold" fontSize={fontSize.medium + 5}>
                Your
              </AppText>

              <View
                style={{
                  position: 'relative',
                }}>
                <View
                  style={{
                    width: sizeBlock.getWidthSize(180),
                    height: sizeBlock.getHeightSize(50),
                    ...universalStyle.centering,
                    zIndex: 9,
                    backgroundColor: appColors.green,
                    paddingHorizontal: sizeBlock.getWidthSize(20),
                    paddingVertical: sizeBlock.getWidthSize(7),
                  }}>
                  <AppText
                    fontType="semiBold"
                    color={appColors.white}
                    fontSize={fontSize.medium + 5}>
                    Partner!
                  </AppText>
                </View>
                <View
                  style={{
                    width: sizeBlock.getWidthSize(167),
                    height: sizeBlock.getHeightSize(50),
                    ...universalStyle.centering,
                    zIndex: 8,
                    paddingHorizontal: sizeBlock.getWidthSize(20),
                    paddingVertical: sizeBlock.getWidthSize(7),
                    backgroundColor: '#CFE0C5',
                    bottom: -sizeBlock.getHeightSize(7),
                    left: sizeBlock.getWidthSize(20),
                    position: 'absolute',
                  }}>
                  <AppText
                    customStyle={{opacity: 0}}
                    fontType="semiBold"
                    color={appColors.white}
                    fontSize={fontSize.medium + 5}>
                    Partner
                  </AppText>
                </View>
              </View>
            </View>
            {isLoading && <LoadingState />}

            {isSuccess && data && (
              <View
                style={{
                  marginVertical: sizeBlock.getHeightSize(80),
                  ...universalStyle.spaceBetween,
                }}>
                <CurvedArrow
                  width={sizeBlock.getWidthSize(95)}
                  height={sizeBlock.getHeightSize(35)}
                  style={{
                    position: 'absolute',
                    left: '35%',
                    right: '50%',
                    top: 0,
                    transform: [{rotate: '180deg'}],
                  }}
                />
                <CurvedArrow
                  width={sizeBlock.getWidthSize(100)}
                  height={sizeBlock.getHeightSize(35)}
                  style={{
                    position: 'absolute',
                    left: '35%',
                    right: '50%',
                    bottom: sizeBlock.getHeightSize(20),
                  }}
                />

                <View>
                  <View style={viewPartnerStyle.partnerAvatar}>
                    {!userData?.profileImage ? (
                      <AppImage
                        source={AppLogo}
                        style={{
                          width: sizeBlock.getWidthSize(90),
                          height: sizeBlock.getWidthSize(90),
                          borderRadius: borderRadius.full,
                        }}
                        resizeMode="cover"
                      />
                    ) : (
                      <AppImage
                        source={{
                          uri: userData?.profileImage,
                        }}
                        style={{
                          width: sizeBlock.getWidthSize(90),
                          height: sizeBlock.getWidthSize(90),
                          borderRadius: borderRadius.full,
                        }}
                        alt="Avatar"
                        resizeMode="cover"
                      />
                    )}
                  </View>
                  <AppText
                    fontType="medium"
                    customStyle={{
                      textAlign: 'center',
                      marginVertical: sizeBlock.getHeightSize(10),
                    }}>
                    {userData?.fullName}
                  </AppText>
                </View>

                {/* Partner */}
                <View>
                  <View style={viewPartnerStyle.partnerAvatar}>
                    {!partnerImage ? (
                      <AppImage
                        source={AppLogo}
                        style={{
                          width: sizeBlock.getWidthSize(90),
                          height: sizeBlock.getWidthSize(90),
                          borderRadius: borderRadius.full,
                        }}
                        resizeMode="cover"
                      />
                    ) : (
                      <AppImage
                        source={{
                          uri: partnerImage,
                        }}
                        style={{
                          width: sizeBlock.getWidthSize(90),
                          height: sizeBlock.getWidthSize(90),
                          borderRadius: borderRadius.full,
                        }}
                        alt="Avatar"
                        resizeMode="cover"
                      />
                    )}
                  </View>
                  <AppText
                    fontType="medium"
                    customStyle={{
                      textAlign: 'center',
                      marginVertical: sizeBlock.getHeightSize(10),
                    }}>
                    {partnerName}
                  </AppText>
                </View>
              </View>
            )}

            <AppButton
              bgColor={appColors.green}
              customViewStyle={{
                marginTop: '40%',
              }}
              disabled={isLoading || isError}
              onPress={() => {}}
              title="Disconnect Partner"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ViewPartnerScreen;
