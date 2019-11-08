import React from 'react';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Spinner from '../../../../components/layout/Spinner';

afterEach(cleanup);

describe('Spinner', () => {
  it('renderiza corretamente', () => {
    const { container } = render(<Spinner />);

    expect(container).toMatchSnapshot();
  });
});
