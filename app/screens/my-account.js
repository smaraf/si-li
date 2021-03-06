import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import * as myAccountActions from '../actions/my-account-actions';
import SimpleButton from '../components/MenuButton';
import styles from '../components/styles/SimpleListStyles';

class MyAccount extends React.PureComponent {
  static navigationOptions = {
    title: 'my account',
  };

  render() {
    const { currentUser, onSignOut } = this.props;
    return (
      <View>
        <Text style={[styles.baseText, styles.text]}>
          You are currently logged in as {currentUser.name} using {currentUser.email}.
        </Text>
        <SimpleButton onPress={onSignOut} title="Sign Out" />
      </View>
    );
  }
}

MyAccount.propTypes = {
  currentUser: PropTypes.object.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentUser: state.login.currentUser,
});

const mapDispatchToProps = dispatch => ({
  onSignOut: () => {
    dispatch(myAccountActions.signOut());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
