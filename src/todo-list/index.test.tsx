import React from 'react';
import renderer from 'react-test-renderer';
import TodoList from './';

test('TodoList matches snapshot', () => {
  const tree = renderer
    .create(<TodoList />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});