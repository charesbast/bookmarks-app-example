import { History, createBrowserHistory } from 'history';
import React, { FunctionComponent } from 'react';
import {
  Router,
  Switch,
  Route,
  Redirect,
} from 'react-router';

import BookmarksPage from 'src/containers/BookmarksPage/BookmarksPage';
import { BookmarksProvider } from 'src/context/bookmarks/bookmarkContext';

interface Props {
  history?: History;
}

const App: FunctionComponent<Props> = ({ history }) => (
  <Router history={history ?? createBrowserHistory()}>
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
