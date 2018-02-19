import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SimpleListItem from '../components/SimpleListItem';

configure({ adapter: new Adapter() });

test('renders correctly', () => {
  const tree = renderer.create(<SimpleListItem styles={{ row: {} }} onRemoveItem={() => {}} item={{}} index={0} />).toJSON;
  expect(tree).toMatchSnapshot();
});

test('remove item function is called on long press', () => {
  const removeItemSpy = jest.fn();

  const wrapper = shallow(<SimpleListItem
    styles={{ row: {} }}
    onRemoveItem={removeItemSpy}
    item={{ text: 'test' }}
    index={2}
  />);

  const item = wrapper.find('TouchableHighlight');
  item.simulate('longPress');
  expect(removeItemSpy.mock.calls).toHaveLength(1);
  expect(removeItemSpy.mock.calls[0][0]).toMatchObject({ text: 'test' });
});

test('on select item is called if passed in', () => {
  const onSelectItemSpy = jest.fn();

  const wrapper = shallow(<SimpleListItem
    styles={{ row: {} }}
    onSelectItem={onSelectItemSpy}
    onRemoveItem={() => {}}
    item={{ text: 'test' }}
    index={2}
  />);

  const item = wrapper.find('TouchableHighlight');
  item.simulate('Press');
  expect(onSelectItemSpy.mock.calls).toHaveLength(1);
  expect(onSelectItemSpy.mock.calls[0][0]).toMatchObject({ text: 'test' });
});
