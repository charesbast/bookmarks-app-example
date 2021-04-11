import React, { FunctionComponent } from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import BookmarkEditionPage from 'src/containers/BookmarkEditionPage/BookmarkEditionPage';
import BookmarksPage from 'src/containers/BookmarksPage/BookmarksPage';
import { BookmarksProvider } from 'src/context/bookmarks/bookmarkContext';
import { RoutePath } from 'src/types/routing.types';

const App: FunctionComponent = () => (
  <BookmarksProvider>
    <Switch>
      <Route
        path={RoutePath.Bookmarks}
        component={BookmarksPage}
        exact
      />
      <Route
        path={RoutePath.BookmarkEdition}
        component={BookmarkEditionPage}
      />

      <Route>
        <Redirect to={RoutePath.Bookmarks} />
      </Route>
    </Switch>
  </BookmarksProvider>
);

export default App;
