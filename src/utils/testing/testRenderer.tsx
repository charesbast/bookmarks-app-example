import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import App from 'src/containers/App';

export interface RenderAppConfig {
  route?: string;
}

/*
  This function arguments will most certainly evolve with time: adding more params in that object
  will prevent us from refactoring every calls in the tests
*/
export function renderApp({ route }: RenderAppConfig): RenderResult {
  return render(
    <MemoryRouter initialEntries={route ? [route] : []}>
      <App />
    </MemoryRouter>,
  );
}
