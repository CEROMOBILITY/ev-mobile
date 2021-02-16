import deepmerge from 'deepmerge';
import { StyleSheet } from 'react-native';
import ResponsiveStylesSheet from 'react-native-responsive-stylesheet';
import { ScaledSheet } from 'react-native-size-matters';

import ThemeManager from '../../custom-theme/ThemeManager';
import Utils from '../../utils/Utils';

export default function computeStyleSheet(): StyleSheet.NamedStyles<any> {
  const commonColor = Utils.getCurrentCommonColor();
  const darkTheme = ThemeManager.getInstance().isThemeTypeIsDark();
  const connectorSuccessColor = darkTheme ? commonColor.brandSuccessLight : commonColor.brandSuccess;
  const connectorWarningColor = darkTheme ? commonColor.brandWarningLight : commonColor.brandWarning;
  const connectorWarningBorderColor = darkTheme ? commonColor.brandWarning : commonColor.brandWarningDark;
  const connectorDangerColor = darkTheme ? commonColor.brandDangerLight : commonColor.brandDanger;
  const connectorDangerBorderColor = darkTheme ? commonColor.brandDanger : commonColor.brandDangerDark;
  const connectorDisabledColor = darkTheme ? commonColor.brandDisabledLight : commonColor.brandDisabledDark;
  const connectorDisabledBorderColor = darkTheme ? commonColor.brandDisabled : commonColor.brandDisabledDark;
  const connectorPrimaryColor = darkTheme ? commonColor.brandPrimaryLight : commonColor.brandPrimary;
  const connectorPrimaryBorderColor = darkTheme ? commonColor.brandPrimary : commonColor.brandPrimaryDark;
  const commonStyles = ScaledSheet.create({
    containerWithDescription: {
      height: '60@s',
      width: '100@s',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    containerWithNoDescription: {
      height: '55@s',
      width: '60@s',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    commonConnector: {
      width: '44@s',
      height: '44@s',
      justifyContent: 'center',
      borderStyle: 'solid',
      alignItems: 'center',
      borderWidth: '4@s',
      borderRadius: '22@s',
      borderColor: commonColor.textColor,
      backgroundColor: 'transparent'
    },
    commonConnectorValue: {
      fontSize: '22@s',
      fontWeight: 'bold',
      color: commonColor.inverseTextColor
    },
    commonConnectorDescription: {
      position: 'absolute',
      bottom: '-2@s',
      fontSize: '12@s',
      color: commonColor.textColor
    },
    faultedConnector: {
      backgroundColor: connectorDangerColor,
      borderColor: connectorDangerBorderColor
    },
    faultedConnectorValue: {},
    faultedConnectorDescription: {
      color: connectorDangerColor
    },
    availableConnector: {
      borderColor: connectorSuccessColor
    },
    availableConnectorValue: {
      color: connectorSuccessColor
    },
    availableConnectorDescription: {
      color: connectorSuccessColor
    },
    suspendedConnector: {
      backgroundColor: connectorPrimaryColor,
      borderColor: connectorPrimaryBorderColor
    },
    suspendedConnectorValue: {
      color: commonColor.brandLight
    },
    suspendedConnectorDescription: {
      color: connectorPrimaryColor
    },
    preparingConnector: {
      backgroundColor: connectorWarningColor,
      borderColor: connectorWarningBorderColor
    },
    preparingConnectorValue: {
      color: commonColor.brandLight
    },
    preparingConnectorDescription: {
      color: connectorWarningColor
    },
    finishingConnector: {
      backgroundColor: connectorWarningColor,
      borderColor: connectorWarningBorderColor
    },
    finishingConnectorValue: {
      color: commonColor.brandLight
    },
    finishingConnectorDescription: {
      color: connectorWarningColor
    },
    unavailableConnector: {
      borderColor: connectorDisabledBorderColor
    },
    unavailableConnectorValue: {
      color: connectorDisabledColor
    },
    unavailableConnectorDescription: {
      color: connectorDisabledColor
    },
    reservedConnector: {
      backgroundColor: connectorDisabledColor,
      borderColor: connectorDisabledBorderColor
    },
    reservedConnectorValue: {
      color: commonColor.brandLight
    },
    reservedConnectorDescription: {
      color: connectorDisabledColor
    },
    chargingConnector: {
      backgroundColor: commonColor.brandPrimary,
      borderColor: commonColor.brandInfoLight,
      borderTopColor: commonColor.brandPrimary,
      borderBottomColor: commonColor.brandPrimary
    },
    chargingConnectorValue: {
      color: commonColor.brandLight
    },
    chargingConnectorDescription: {
      color: connectorPrimaryColor
    }
  });
  const portraitStyles = {};
  const landscapeStyles = {};
  return ResponsiveStylesSheet.createOriented({
    landscape: deepmerge(commonStyles, landscapeStyles) as StyleSheet.NamedStyles<any>,
    portrait: deepmerge(commonStyles, portraitStyles) as StyleSheet.NamedStyles<any>
  });
}
