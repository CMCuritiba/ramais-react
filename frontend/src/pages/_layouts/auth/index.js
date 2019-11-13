import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/layout/admin/Header';

import { Wrapper, Content } from './styles';

export default function AuthLayout({ children, selected }) {
  return (
    <Wrapper>
      <Header selected={selected} />
      <Content>{children}</Content>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
