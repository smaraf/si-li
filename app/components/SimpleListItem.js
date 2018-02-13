import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import { PropTypes } from 'prop-types';

class SimpleListItem extends React.PureComponent {
  render() {
    const { onRemoveItem, item, styles } = this.props;

    return (
      <View>
        <TouchableHighlight onLongPress={() => onRemoveItem(item)}>
          <View style={[styles.row, !item.isActive && styles.inactiveRow]}>
            <Text>{item.text}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

SimpleListItem.propTypes = {
  onRemoveItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

export default SimpleListItem;
