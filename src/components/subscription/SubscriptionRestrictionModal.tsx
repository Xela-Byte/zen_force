import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import AppText from '@/components/text/AppText';
import AppButton from '@/components/button/AppButton';
import {
  appColors,
  borderRadius,
  fontSize,
  sizeBlock,
  universalStyle,
} from '@/styles/universalStyle';
import {SubscriptionTier, SUBSCRIPTION_PLANS} from '@/types/subscription';

interface SubscriptionRestrictionModalProps {
  visible: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  currentTier: SubscriptionTier;
  requiredTier: SubscriptionTier;
  featureName: string;
}

const SubscriptionRestrictionModal: React.FC<
  SubscriptionRestrictionModalProps
> = ({visible, onClose, onUpgrade, currentTier, requiredTier, featureName}) => {
  const currentPlan = SUBSCRIPTION_PLANS[currentTier];
  const requiredPlan = SUBSCRIPTION_PLANS[requiredTier];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <AppText
              fontSize={fontSize.medium}
              fontType="bold"
              color={appColors.brown}
              customStyle={styles.title}>
              Upgrade Required
            </AppText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <AppText
                fontSize={fontSize.medium}
                color={appColors.textGrey}
                fontType="bold">
                ×
              </AppText>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}>
            <View style={styles.content}>
              <AppText
                fontSize={fontSize.small + 3}
                fontType="semiBold"
                color={appColors.brown}
                customStyle={styles.description}>
                This feature requires {requiredPlan.name} subscription
                {requiredPlan.name === 'Elite' ? '' : ' or higher'}.
              </AppText>

              <View style={styles.currentPlanContainer}>
                <AppText
                  fontSize={fontSize.small}
                  fontType="medium"
                  color={appColors.textGrey}>
                  Your current plan: {currentPlan.name}
                </AppText>
              </View>

              <View style={styles.featureContainer}>
                <AppText
                  fontSize={fontSize.small + 2}
                  fontType="semiBold"
                  color={appColors.brown}>
                  {featureName}
                </AppText>
                <AppText
                  fontSize={fontSize.small}
                  color={appColors.textGrey}
                  customStyle={styles.featureDescription}>
                  Available in {requiredPlan.name}
                  {requiredPlan.name === 'Elite' ? '' : ' and higher plans'}
                </AppText>
              </View>

              <View style={styles.benefitsContainer}>
                <AppText
                  fontSize={fontSize.small + 1}
                  fontType="semiBold"
                  color={appColors.brown}
                  customStyle={styles.benefitsTitle}>
                  What you'll get with {requiredPlan.name}:
                </AppText>
                {requiredPlan.features.map((feature, index) => (
                  <View key={index} style={styles.benefitItem}>
                    <AppText
                      fontSize={fontSize.small - 1}
                      color={appColors.textGrey}
                      fontType="medium">
                      • {feature}
                    </AppText>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <AppButton
              title="Upgrade Now"
              bgColor={appColors.green}
              textColor={appColors.white}
              onPress={onUpgrade}
              customViewStyle={styles.upgradeButton}
            />
            <AppButton
              title="Maybe Later"
              bgColor="transparent"
              textColor={appColors.textGrey}
              onPress={onClose}
              customViewStyle={styles.laterButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    ...universalStyle.centering,
    paddingHorizontal: sizeBlock.getWidthSize(20),
    paddingVertical: sizeBlock.getHeightSize(20),
  },
  modalContainer: {
    backgroundColor: appColors.white,
    borderRadius: borderRadius.medium + 5,
    width: '100%',
    maxWidth: sizeBlock.getWidthSize(380),
    maxHeight: Dimensions.get('window').height * 0.9,
    shadowColor: appColors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    maxHeight: Dimensions.get('window').height * 0.6,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: sizeBlock.getWidthSize(24),
    paddingTop: sizeBlock.getHeightSize(24),
    paddingBottom: sizeBlock.getHeightSize(16),
    borderBottomWidth: 1,
    borderBottomColor: appColors.lightGray,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    width: sizeBlock.getWidthSize(30),
    height: sizeBlock.getHeightSize(30),
    borderRadius: borderRadius.small,
    backgroundColor: appColors.lightGray,
    ...universalStyle.centering,
  },
  content: {
    paddingHorizontal: sizeBlock.getWidthSize(24),
    paddingVertical: sizeBlock.getHeightSize(20),
    flex: 1,
  },
  description: {
    textAlign: 'center',
    marginBottom: sizeBlock.getHeightSize(20),
    lineHeight: sizeBlock.getHeightSize(22),
  },
  currentPlanContainer: {
    backgroundColor: appColors.lightGray,
    paddingHorizontal: sizeBlock.getWidthSize(16),
    paddingVertical: sizeBlock.getHeightSize(12),
    borderRadius: borderRadius.small,
    marginBottom: sizeBlock.getHeightSize(20),
    borderLeftWidth: 4,
    borderLeftColor: appColors.gray,
  },
  featureContainer: {
    backgroundColor: appColors.lightPink,
    paddingHorizontal: sizeBlock.getWidthSize(16),
    paddingVertical: sizeBlock.getHeightSize(16),
    borderRadius: borderRadius.small,
    marginBottom: sizeBlock.getHeightSize(20),
    borderLeftWidth: 4,
    borderLeftColor: appColors.brown,
  },
  featureDescription: {
    marginTop: sizeBlock.getHeightSize(6),
    lineHeight: sizeBlock.getHeightSize(18),
  },
  benefitsContainer: {
    marginBottom: sizeBlock.getHeightSize(16),
  },
  benefitsTitle: {
    marginBottom: sizeBlock.getHeightSize(12),
    lineHeight: sizeBlock.getHeightSize(20),
  },
  benefitItem: {
    marginBottom: sizeBlock.getHeightSize(6),
    paddingLeft: sizeBlock.getWidthSize(8),
  },
  footer: {
    paddingHorizontal: sizeBlock.getWidthSize(24),
    paddingBottom: sizeBlock.getHeightSize(24),
    paddingTop: sizeBlock.getHeightSize(16),
    borderTopWidth: 1,
    borderTopColor: appColors.lightGray,
    backgroundColor: appColors.card,
    borderBottomLeftRadius: borderRadius.medium + 5,
    borderBottomRightRadius: borderRadius.medium + 5,
    flexShrink: 0,
  },
  upgradeButton: {
    marginBottom: sizeBlock.getHeightSize(12),
    borderRadius: borderRadius.small,
    shadowColor: appColors.green,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  laterButton: {
    borderWidth: 1.5,
    borderColor: appColors.gray,
    borderRadius: borderRadius.small,
    backgroundColor: appColors.white,
  },
});

export default SubscriptionRestrictionModal;
