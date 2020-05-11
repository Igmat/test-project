import React from 'react';
import renderer from 'react-test-renderer';
import TodoForm from './TodoForm';

test('TodoForm matches snapshot', () => {
  const tree = renderer
    .create(<TodoForm />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});