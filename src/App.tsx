import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { InitialState, NavigationContainer, NavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import I18n from 'i18n-js';
import { Icon } from 'native-base';
import React from 'react';
import { StatusBar } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import BaseProps from 'types/BaseProps';

import computeStyleSheet from './AppStyles';
import I18nManager from './I18n/I18nManager';
import DeepLinkingManager from './deeplinking/DeepLinkingManager';
import LocationManager from './location/LocationManager';
import MigrationManager from './migration/MigrationManager';
import NotificationManager from './notification/NotificationManager';
import CentralServerProvider from './provider/CentralServerProvider';
import ProviderFactory from './provider/ProviderFactory';
import Eula from './screens/auth/eula/Eula';
import Login from './screens/auth/login/Login';
import ResetPassword from './screens/auth/reset-password/ResetPassword';
import RetrievePassword from './screens/auth/retrieve-password/RetrievePassword';
import SignUp from './screens/auth/sign-up/SignUp';
import ChargingStationActions from './screens/charging-stations/actions/ChargingStationActions';
import ChargingStationConnectorDetails from './screens/charging-stations/connector-details/ChargingStationConnectorDetails';
import ChargingStations from './screens/charging-stations/list/ChargingStations';
import ChargingStationOcppParameters from './screens/charging-stations/ocpp/ChargingStationOcppParameters';
import ChargingStationProperties from './screens/charging-stations/properties/ChargingStationProperties';
import Home from './screens/home/Home';
import ReportError from './screens/report-error/ReportError';
import Sidebar from './screens/sidebar/SideBar';
import SiteAreas from './screens/site-areas/SiteAreas';
import Sites from './screens/sites/Sites';
import Statistics from './screens/statistics/Statistics';
import Tenants from './screens/tenants/Tenants';
import TransactionChart from './screens/transactions/chart/TransactionChart';
import TransactionDetails from './screens/transactions/details/TransactionDetails';
import TransactionsHistory from './screens/transactions/history/TransactionsHistory';
import TransactionsInProgress from './screens/transactions/in-progress/TransactionsInProgress';
import SecuredStorage from './utils/SecuredStorage';
import Utils from './utils/Utils';

// Init i18n
I18nManager.initialize();

// Navigation Stack variable
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const StatsStack = createStackNavigator();
const ReportErrorStack = createStackNavigator();
const SitesStack = createStackNavigator();
const ChargingStationsStack = createStackNavigator();
const TransactionHistoryStack = createStackNavigator();
const TransactionInProgressStack = createStackNavigator();
const rootStack = createStackNavigator();

// Navigation Tab variable
const ChargingStationDetailsTabs = createMaterialBottomTabNavigator();
const ChargingStationConnectorDetailsTabs = createMaterialBottomTabNavigator();
const TransactionDetailsTabs = createMaterialBottomTabNavigator();

// Navigation Drawer variable
const AppDrawer = createDrawerNavigator();

const createTabBarIcon = (props: { focused: boolean; tintColor?: string; horizontal?: boolean; },
  type: 'AntDesign' | 'Entypo' | 'EvilIcons' | 'Feather' | 'FontAwesome' | 'FontAwesome5' | 'Foundation' | 'Ionicons' | 'MaterialCommunityIcons' | 'MaterialIcons' | 'Octicons' | 'SimpleLineIcons' | 'Zocial',
  name: string): React.ReactNode => {
  const commonColor = Utils.getCurrentCommonColor();
  return <Icon style={{
    color: props.focused ? commonColor.topTabBarActiveTextColor : commonColor.topTabBarTextColor,
    paddingBottom: 5,
    fontSize: 23
  }} type={type} name={name} />
};

// save last page with state
const persistNavigationState = async (navigationState: NavigationState) => {
  try {
    await SecuredStorage.saveNavigationState(navigationState);
  } catch (error) {
    // tslint:disable-next-line: no-console
    console.log(error);
  }
};

function createAuthNavigator(props: BaseProps) {
  return (
    <AuthStack.Navigator initialRouteName={'Login'} headerMode='none'>
      <AuthStack.Screen name='Login' component={Login} initialParams={props?.route?.params?.params} />
      <AuthStack.Screen name='Tenants' component={Tenants} initialParams={props?.route?.params?.params} />
      <AuthStack.Screen name='Eula' component={Eula} initialParams={props?.route?.params?.params} />
      <AuthStack.Screen name='SignUp' component={SignUp} initialParams={props?.route?.params?.params} />
      <AuthStack.Screen name='ResetPassword' component={ResetPassword} initialParams={props?.route?.params?.params} />
      <AuthStack.Screen name='RetrievePassword' component={RetrievePassword} initialParams={props?.route?.params?.params} />
    </AuthStack.Navigator>
  );
}

function createHomeNavigator(props: BaseProps) {
  return (
    <HomeStack.Navigator initialRouteName='Home' headerMode='none'>
      <HomeStack.Screen name='Home' component={Home} initialParams={props?.route?.params?.params} />
    </HomeStack.Navigator>
  );
}

function createStatsNavigator(props: BaseProps) {
  return (
    <StatsStack.Navigator initialRouteName='Statistics' headerMode='none'>
      <StatsStack.Screen name='Statistics' component={Statistics} initialParams={props?.route?.params?.params} />
    </StatsStack.Navigator>
  );
}

function createReportErrorNavigator(props: BaseProps) {
  return (
    <ReportErrorStack.Navigator initialRouteName='ReportError' headerMode='none'>
      <ReportErrorStack.Screen name='ReportError' component={ReportError} initialParams={props?.route?.params?.params} />
    </ReportErrorStack.Navigator>
  );
}

function getTabStyle(): any {
  const commonColor = Utils.getCurrentCommonColor();
  return {
    backgroundColor: commonColor.containerBgColor,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: commonColor.topTabBarTextColor
  };
}

function createChargingStationDetailsTabsNavigator(props: BaseProps) {
  const commonColor = Utils.getCurrentCommonColor();
  const barStyle = getTabStyle();
  return (
    <ChargingStationDetailsTabs.Navigator initialRouteName='ChargingStationActions' activeColor={commonColor.topTabBarActiveTextColor}
      inactiveColor={commonColor.topTabBarTextColor} barStyle={barStyle} labeled={true} backBehavior='none'>
      <ChargingStationDetailsTabs.Screen name='ChargingStationActions' component={ChargingStationActions}
        initialParams={props?.route?.params?.params}
        options={{
          title: I18n.t('chargers.actions'),
          tabBarIcon: (props) => createTabBarIcon(props, 'MaterialIcons', 'build')
        }} />
      <ChargingStationDetailsTabs.Screen name='ChargingStationOcppParameters' component={ChargingStationOcppParameters}
        initialParams={props?.route?.params?.params}
        options={{
          title: I18n.t('chargers.ocpp'),
          tabBarIcon: (props) => createTabBarIcon(props, 'MaterialIcons', 'format-list-bulleted')
        }} />
      <ChargingStationDetailsTabs.Screen name='ChargingStationProperties' component={ChargingStationProperties}
        initialParams={props?.route?.params?.params}
        options={{
          title: I18n.t('chargers.properties'),
          tabBarIcon: (props) => createTabBarIcon(props, 'MaterialIcons', 'info')
        }} />
    </ChargingStationDetailsTabs.Navigator>
  );
}

function createChargingStationConnectorDetailsTabsNavigator(props: BaseProps) {
  const commonColor = Utils.getCurrentCommonColor();
  const barStyle = getTabStyle();
  return (
    <ChargingStationConnectorDetailsTabs.Navigator initialRouteName='ChargingStationConnectorDetails' activeColor={commonColor.topTabBarActiveTextColor}
      inactiveColor={commonColor.topTabBarTextColor} barStyle={barStyle} labeled={true} backBehavior='none'>
      <ChargingStationConnectorDetailsTabs.Screen name='ChargingStationConnectorDetails' component={ChargingStationConnectorDetails}
        initialParams={props?.route?.params?.params}
        options={{
          title: I18n.t('sites.chargePoint'),
          tabBarIcon: (props) => createTabBarIcon(props, 'FontAwesome', 'bolt')
        }} />
      <ChargingStationConnectorDetailsTabs.Screen name='TransactionChart' component={TransactionChart}
        initialParams={props?.route?.params?.params}
        options={{
          title: I18n.t('details.graph'),
          tabBarIcon: (props) => createTabBarIcon(props, 'AntDesign', 'linechart')
        }} />
    </ChargingStationConnectorDetailsTabs.Navigator>
  );
}

function createTransactionDetailsTabsNavigator(props: BaseProps) {
  const commonColor = Utils.getCurrentCommonColor();
  const barStyle = getTabStyle();
  return (
    <TransactionDetailsTabs.Navigator initialRouteName='TransactionDetails' activeColor={commonColor.topTabBarActiveTextColor}
      inactiveColor={commonColor.topTabBarTextColor} barStyle={barStyle} labeled={true} backBehavior='none'>
      <TransactionDetailsTabs.Screen name='TransactionDetails' component={TransactionDetails}
        initialParams={props?.route?.params?.params}
        options={{
          title: I18n.t('transactions.transaction'),
          tabBarIcon: (props) => createTabBarIcon(props, 'FontAwesome', 'bolt')
        }} />
      <TransactionDetailsTabs.Screen name='TransactionChart' component={TransactionChart}
        initialParams={props?.route?.params?.params}
        options={{
          title: I18n.t('details.graph'),
          tabBarIcon: (props) => createTabBarIcon(props, 'AntDesign', 'linechart')
        }} />
    </TransactionDetailsTabs.Navigator>
  );
}

function createSitesNavigator(props: BaseProps) {
  return (
    <SitesStack.Navigator initialRouteName='Sites' headerMode='none'>
      <SitesStack.Screen name='Sites' component={Sites} initialParams={props?.route?.params?.params} />
      <SitesStack.Screen name='SiteAreas' component={SiteAreas} initialParams={props?.route?.params?.params} />
      <SitesStack.Screen name='ChargingStations' component={ChargingStations} initialParams={props?.route?.params?.params} />
      <SitesStack.Screen name='ChargingStationDetailsTabs' component={createChargingStationDetailsTabsNavigator} initialParams={props?.route?.params?.params} />
      <SitesStack.Screen name='ChargingStationConnectorDetailsTabs' component={createChargingStationConnectorDetailsTabsNavigator} initialParams={props?.route?.params?.params} />
      <SitesStack.Screen name='TransactionDetailsTabs' component={createTransactionDetailsTabsNavigator} initialParams={props?.route?.params?.params} />
      <SitesStack.Screen name='ReportError' component={ReportError} initialParams={props?.route?.params?.params} />
    </SitesStack.Navigator>
  );
}

function createChargingStationsNavigator(props: BaseProps) {
  return (
    <ChargingStationsStack.Navigator initialRouteName='ChargingStations' headerMode='none'>
      <ChargingStationsStack.Screen name='ChargingStations' component={ChargingStations} initialParams={props?.route?.params?.params} />
      <ChargingStationsStack.Screen name='ChargingStationDetailsTabs' component={createChargingStationDetailsTabsNavigator} initialParams={props?.route?.params?.params} />
      <ChargingStationsStack.Screen name='ChargingStationConnectorDetailsTabs' component={createChargingStationConnectorDetailsTabsNavigator} initialParams={props?.route?.params?.params} />
      <ChargingStationsStack.Screen name='TransactionDetailsTabs' component={createTransactionDetailsTabsNavigator} initialParams={props?.route?.params?.params} />
      <ChargingStationsStack.Screen name='ReportError' component={ReportError} initialParams={props?.route?.params?.params} />
    </ChargingStationsStack.Navigator>
  );
}

function createTransactionHistoryNavigator(props: BaseProps) {
  return (
    <TransactionHistoryStack.Navigator initialRouteName='TransactionsHistory' headerMode='none'>
      <TransactionHistoryStack.Screen name='TransactionsHistory' component={TransactionsHistory} initialParams={props?.route?.params?.params} />
      <TransactionHistoryStack.Screen name='TransactionDetailsTabs' component={createTransactionDetailsTabsNavigator} initialParams={props?.route?.params?.params} />
    </TransactionHistoryStack.Navigator>
  );
}

function createTransactionInProgressNavigator(props: BaseProps) {
  return (
    <TransactionInProgressStack.Navigator initialRouteName='TransactionsInProgress' headerMode='none'>
      <TransactionInProgressStack.Screen name='TransactionsInProgress' component={TransactionsInProgress} initialParams={props?.route?.params?.params} />
      <TransactionInProgressStack.Screen name='ChargingStationDetailsTabs' component={createChargingStationDetailsTabsNavigator} initialParams={props?.route?.params?.params} />
      <TransactionInProgressStack.Screen name='ChargingStationConnectorDetailsTabs' component={createChargingStationConnectorDetailsTabsNavigator} initialParams={props?.route?.params?.params} />
    </TransactionInProgressStack.Navigator>
  );
}

function createAppDrawerNavigator(props: BaseProps) {
  const appStyles = computeStyleSheet();
  return (
    <AppDrawer.Navigator initialRouteName='HomeNavigator' screenOptions={{ swipeEnabled: true, unmountOnBlur: true }}
      drawerStyle={appStyles.sideMenu} drawerPosition='right' drawerContent={(props) => <Sidebar {...props} />}>
      <AppDrawer.Screen name='HomeNavigator' component={createHomeNavigator} initialParams={props?.route?.params?.params} />
      <AppDrawer.Screen name='SitesNavigator' component={createSitesNavigator} initialParams={props?.route?.params?.params} />
      <AppDrawer.Screen name='ChargingStationsNavigator' component={createChargingStationsNavigator} initialParams={props?.route?.params?.params} />
      <AppDrawer.Screen name='StatisticsNavigator' component={createStatsNavigator} initialParams={props?.route?.params?.params} />
      <AppDrawer.Screen name='ReportErrorNavigator' component={createReportErrorNavigator} initialParams={props?.route?.params?.params} />
      <AppDrawer.Screen name='TransactionHistoryNavigator' component={createTransactionHistoryNavigator} initialParams={props?.route?.params?.params} />
      <AppDrawer.Screen name='TransactionInProgressNavigator' component={createTransactionInProgressNavigator} initialParams={props?.route?.params?.params} />
    </AppDrawer.Navigator>
  );
}

function createRootNavigator(app: App, initialState: InitialState) {
  return (
    <NavigationContainer ref={(navigatorRef) => {
      if (navigatorRef) {
        app.notificationManager?.initialize(navigatorRef);
        app.deepLinkingManager?.initialize(navigatorRef, app.centralServerProvider);
      }
    }}
      onStateChange={persistNavigationState} initialState={initialState}>
      <rootStack.Navigator initialRouteName='AuthNavigator' headerMode='none'>
        <rootStack.Screen name='AuthNavigator' component={createAuthNavigator} />
        <rootStack.Screen name='AppDrawerNavigator' component={createAppDrawerNavigator} />
      </rootStack.Navigator>
    </NavigationContainer>
  );
}

export interface Props {
}

interface State {
  switchTheme?: boolean;
  isNavigationStateLoaded?: boolean;
  navigationState?: InitialState;
}

export default class App extends React.Component<Props, State> {
  public state: State;
  public props: Props;
  public notificationManager: NotificationManager;
  public deepLinkingManager: DeepLinkingManager;
  public centralServerProvider: CentralServerProvider;
  private location: LocationManager;

  constructor(props: Props) {
    super(props);
    this.state = {
      switchTheme: false,
      navigationState: null,
      isNavigationStateLoaded: false,
    };
  }

  public setState = (state: State | ((prevState: Readonly<State>, props: Readonly<Props>) => State | Pick<State, never>) | Pick<State, never>, callback?: () => void) => {
    super.setState(state, callback);
  }

  public async componentDidMount() {
    // Load Navigation State
    const navigationState = await SecuredStorage.getNavigationState();
    // Get the central server
    this.centralServerProvider = await ProviderFactory.getProvider();
    // Init Notification --------------------------------------
    this.notificationManager = NotificationManager.getInstance();
    this.notificationManager.setCentralServerProvider(this.centralServerProvider);
    await this.notificationManager.start();
    // Assign
    this.centralServerProvider.setNotificationManager(this.notificationManager);
    // Init Deep Linking ---------------------------------------
    this.deepLinkingManager = DeepLinkingManager.getInstance();
    // Activate Deep links
    this.deepLinkingManager.startListening();
    // Location ------------------------------------------------
    this.location = await LocationManager.getInstance();
    this.location.startListening();
    // Check on hold notification
    this.notificationManager.checkOnHoldNotification();
    // Check migration
    const migrationManager = MigrationManager.getInstance();
    migrationManager.setCentralServerProvider(this.centralServerProvider);
    await migrationManager.migrate();
    // Set
    this.setState({
      navigationState,
      isNavigationStateLoaded: true,
    });
  }

  public async componentWillUnmount() {
    // Deactivate Deep links
    this.deepLinkingManager.stopListening();
    // Stop Notifications
    await this.notificationManager.stop();
    // Stop Location
    this.location.stopListening();
  }

  public render() {
    return (
      this.state.isNavigationStateLoaded &&
        <RootSiblingParent>
          <StatusBar hidden={true} />
          {createRootNavigator(this, this.state.navigationState)}
        </RootSiblingParent>
    );
  }
}
