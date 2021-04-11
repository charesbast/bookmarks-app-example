import { render, RenderResult } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import App from 'src/containers/App';
import { RoutePath } from 'src/types/routing.types';

export interface RenderAppConfig {
  route?: RoutePath;
}

/*
  This function arguments will most certainly evolve with time: adding more params in that object
  will prevent us from refactoring every calls in the tests
*/
export function renderApp({ route }: RenderAppConfig): RenderResult {
  const history = createMemoryHistory({
    ...route ? { initialEntries: [route] } : {},
  });

  return render(
    <App history={history} />,
  );
}
