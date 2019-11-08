import React from 'react';

import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
  getByText,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Button from '../../../../../components/layout/Paginator/Button';

afterEach(cleanup);

describe('Button', () => {
  it('renderiza corretamente', () => {
    function clickPagina() {}

    const value = 1;
    const page = 1;
    const loading = false;

    const { container } = render(
      <Button
        value={value}
        page={page}
        loading={loading}
        handleClickPagina={clickPagina}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('testa click no botão', () => {
    function clickPagina(e) {
      expect(e).toBe(222);
    }

    const value = 222;
    const page = 1;
    const loading = false;

    const { container, getByText } = render(
      <Button
        value={value}
        page={page}
        loading={loading}
        handleClickPagina={clickPagina}
      />
    );

    const botao = getByText('222');

    fireEvent.click(botao);
  });

  it('testa botão desabilitado se mesma página', () => {
    const value = 222;
    const page = 222;
    const loading = false;

    const { container, getByText } = render(
      <Button value={value} page={page} loading={loading} />
    );

    const botao = getByText('222');

    expect(botao).toHaveAttribute('disabled');
  });

  it('testa botão desabilitado se carregando dados', () => {
    const value = 222;
    const page = 1;
    const loading = true;

    const { container, getByText } = render(
      <Button value={value} page={page} loading={loading} />
    );

    const botao = getByText('222');

    expect(botao).toHaveAttribute('disabled');
  });
});
