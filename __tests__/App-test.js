import 'react-native';
import React from 'react';
import ImgList from '../components/imagelist';
import {create, act} from 'react-test-renderer';

// test('test renderer snapshot', () => {
//   const snapshot = renderer.create(<ImgList />).toJSON();
//   expect(snapshot).toMatchSnapshot();
// });

// const tree = create(<ImgList />);
// test('button test', () => {
//   const button = tree.root.findByProps({testID: 'my button'}).props;
//   act(() => button.onPress());
//   const text = tree.root.findByProps({testID: 'my text'}).props;
//   expect(text.children).toEqual('button')
// });

// const tree = create(<ImgList />);
// test('button test', () => {
//   const button = tree.root.findByProps({testID: 'my button'}).props;
//   act(() => button.onPress());
//   const text = tree.root.findByProps({testID: 'my text'}).props;
//   expect(text.children).toEqual('button')
// });
