import React, { FunctionComponent } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import BookmarksPage from 'src/containers/BookmarksPage/BookmarksPage';
import { BookmarksProvider } from 'src/context/bookmarks/bookmarkContext';

const App: FunctionComponent = () => (
  <Router>
    <BookmarksProvider>
      <Switch>
        <Route path="/bookmarks" component={BookmarksPage} />

        <Route path="*">
          <Redirect to="/bookmarks" />
        </Route>
      </Switch>
    </BookmarksProvider>

  </Router>
);

export default App;
