import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import * as myListsActions from '../actions/myListsActions';
import screens from '../constants/screens';
import SimpleList from '../components/SimpleList';

class ListsScreen extends React.Component {
  static navigationOptions = {
    title: 'my lists',
    headerLeft: null,
    // TODO: add Logout button
  };

  render() {
    return (
      <SimpleList
        navigation={this.props.navigation}
        newItem={this.props.newItem}
        list={this.props.list}
        onSelectItem={this.props.onSelectItem}
        onAddItemClick={this.props.onAddItemClick}
        onChangeText={this.props.onChangeText}
        onClearItemsClick={this.props.onClearItemsClick}
        onRemoveItem={this.props.onRemoveItem}
      />
    );
  }
}

ListsScreen.propTypes = {
  navigation: PropTypes.object,
  newItem: PropTypes.string.isRequired,
  onAddItemClick: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onClearItemsClick: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
};

ListsScreen.defaultProps = {
  navigation: null,
};

const mapStateToProps = state => ({
  newItem: state.lists.newList,
  list: { id: state.login.currentUser, items: state.lists.ownLists },
});

const mapDispatchToProps = dispatch => ({
  onSelectItem: (list, navigation) => {
    dispatch(myListsActions.selectList(list));
    if (navigation) navigation.navigate(screens.ActiveList);
    else console.warn('navigation is not defined');
  },
  onAddItemClick: (newItem, list) => {
    if (newItem !== '') {
      dispatch(myListsActions.addList(
        {
          name: newItem,
          lastModified: Date.now(),
          items: null,
        },
        list,
      ));
    }
  },
  onRemoveItem: (list) => {
    dispatch(myListsActions.removeList(list));
  },
  onChangeText: (text) => {
    dispatch(myListsActions.textUpdated(text));
  },
  onClearItemsClick: () => {
    // this should be configurable, optional and the button not displayed
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListsScreen);