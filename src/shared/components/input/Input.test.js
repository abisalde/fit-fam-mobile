import * as React from 'react';
import renderer from 'react-test-renderer';
import {Text} from 'react-native';

import {Input} from './Input';

describe('<Input />', () => {
	test('renders correctly without error or touch', () => {
		const tree = renderer.create(<Input />).toJSON();

		expect(tree).toMatchSnapshot();
	});

	test('renders correctly with error message', () => {
		const tree = renderer
			.create(<Input error='Example error message' touched={true} />)
			.toJSON();

		expect(tree).toMatchSnapshot();
	});

	test('renders correctly with start and end adornments', () => {
		const tree = renderer
			.create(
				<Input
					startEndornment={
						<Text testID='start-endornment'>Start Endornment</Text>
					}
					endEndornment={<Text testID='end-endornment'>End Endornment</Text>}
				/>
			)
			.toJSON();

		expect(tree).toMatchSnapshot();
	});
});
