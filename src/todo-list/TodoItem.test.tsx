import React from 'react';
import renderer from 'react-test-renderer';
import { Todo } from './state';
import TodoItem from './TodoItem';

test('App matches snapshot', () => {
  const todo = new Todo('test todo');
  const tree = renderer
    .create(<TodoItem index={0} todo={todo} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});