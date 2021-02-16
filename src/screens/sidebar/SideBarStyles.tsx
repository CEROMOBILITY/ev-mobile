import deepmerge from 'deepmerge';
import { Platform, StyleSheet } from 'react-native';
import ResponsiveStylesSheet from 'react-native-responsive-stylesheet'
import { ScaledSheet } from 'react-native-size-matters';

import Utils from '../../utils/Utils';

export default function computeStyleSheet(): StyleSheet.NamedStyles<any> {
  const commonColor = Utils.getCurrentCommonColor();
  const commonStyles = ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: commonColor.containerBgColor,
      borderColor: commonColor.listBorderColor,
      borderLeftWidth: 1,
      padding: '10@s'
    },
    background: {
      flex: 1
    },
    drawerContent: {
      flex: 1
    },
    header: {
      flexDirection: 'column',
      backgroundColor: commonColor.containerBgColor,
      borderColor: commonColor.listBorderColor,
      borderBottomWidth: 1,
      height: Platform.OS === 'ios' ? '120@s' : '150@s',
      marginTop: Platform.OS === 'ios' ? '-5@s' : '5@s'
    },
    logo: {
      resizeMode: 'contain',
      width: '100@s',
      height: '50@s',
      alignSelf: 'center',
      margin: '5@s',
      marginBottom: '10@s',
    },
    tenantName: {
      color: commonColor.textColor,
      fontSize: '14@s',
      margin: '2@s',
      alignSelf: 'center',
      textAlign: 'center',
      width: '90%'
    },
    versionText: {
      color: commonColor.textColor,
      fontSize: '14@s',
      margin: '2@s',
      alignSelf: 'center',
      fontWeight: 'bold',
      marginBottom: '10@s',
    },
    versionDate: {
      color: commonColor.textColor,
      fontSize: '14@s',
      alignSelf: 'center',
      marginTop: '-5@s',
      marginBottom: '2@s'
    },
    linkContainer: {
      paddingTop: '10@s',
    },
    links: {
      borderBottomWidth: 0,
      borderBottomColor: 'transparent',
      height: Platform.OS === 'ios' ? undefined : '40@s',
      paddingTop: '10@s',
      paddingBottom: '10@s'
    },
    linkIcon: {
      fontSize: '30@s',
      color: commonColor.textColor
    },
    linkText: {
      color: commonColor.textColor,
      fontSize: '16@s',
      paddingLeft: '10@s'
    },
    logoutContainer: {
      paddingBottom: Platform.OS === 'ios' ? '25@s' : '10@s',
      paddingLeft: '10@s',
      paddingRight: '10@s',
      paddingTop: 0,
      borderTopWidth: 1,
      borderTopColor: commonColor.listBorderColor
    },
    logoutButton: {
      paddingTop: '10@s',
      flexDirection: 'row',
    },
    gridLogoutContainer: {
      flex: 1,
      flexDirection: 'row'
    },
    columnAccount: {
      flexDirection: 'column',
      flexGrow: 2,
      flex: 1
    },
    buttonLogout: {
      alignSelf: 'flex-start',
      backgroundColor: 'transparent'
    },
    logoutText: {
      fontWeight: 'bold',
      fontSize: '14@s',
      color: commonColor.textColor
    },
    userName: {
      paddingTop: '5@s',
      fontSize: '14@s',
      color: commonColor.textColor
    },
    columnThumbnail: {
      flex: 1,
      flexDirection: 'column'
    },
    buttonThumbnail: {
      alignSelf: 'flex-end'
    },
    profilePic: {
      width: '40@s',
      height: '40@s',
      borderRadius: '20@s'
    }
  });
  const portraitStyles = {};
  const landscapeStyles = {};
  return ResponsiveStylesSheet.createOriented({
    landscape: deepmerge(commonStyles, landscapeStyles) as StyleSheet.NamedStyles<any>,
    portrait: deepmerge(commonStyles, portraitStyles) as StyleSheet.NamedStyles<any>
  });
}
