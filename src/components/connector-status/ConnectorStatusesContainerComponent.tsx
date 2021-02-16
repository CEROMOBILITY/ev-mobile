import { View } from 'native-base';
import React from 'react';

import BaseProps from '../../types/BaseProps';
import { ChargePointStatus } from '../../types/ChargingStation';
import ConnectorStats from '../../types/ConnectorStats';
import ConnectorStatusComponent from './ConnectorStatusComponent';
import computeStyleSheet from './ConnectorStatusesContainerComponentStyles';

export interface Props extends BaseProps {
  connectorStats: ConnectorStats;
}

interface State {
}

export default class ConnectorStatusesContainerComponent extends React.Component<Props, State> {
  public state: State;
  public props: Props;

  constructor(props: Props) {
    super(props);
  }

  public setState = (state: State | ((prevState: Readonly<State>, props: Readonly<Props>) => State | Pick<State, never>) | Pick<State, never>, callback?: () => void) => {
    super.setState(state, callback);
  }

  public render() {
    const style = computeStyleSheet();
    const { connectorStats, navigation } = this.props;
    return (
      <View style={style.container}>
        <ConnectorStatusComponent
          navigation={navigation}
          value={connectorStats.availableConnectors}
          status={ChargePointStatus.AVAILABLE}
        />
        <ConnectorStatusComponent
          navigation={navigation}
          value={
            connectorStats.suspendedConnectors +
            connectorStats.finishingConnectors +
            connectorStats.preparingConnectors +
            connectorStats.unavailableConnectors
          }
          text={'connector.notCharging'}
          status={ChargePointStatus.SUSPENDED_EVSE}
        />
        <ConnectorStatusComponent
          navigation={navigation}
          value={connectorStats.chargingConnectors}
          status={ChargePointStatus.CHARGING}
        />
      </View>
    );
  }
}
