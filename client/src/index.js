import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import { Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {
  ConnectedRouter,
  connectRouter,
  routerMiddleware
} from 'connected-react-router';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import * as serviceWorker from './serviceWorker';

// Import your reducers
import book from './reducers/book/';
import review from './reducers/review/';
import user from './reducers/user/';
import todo from './reducers/todo/';

// Import routes
import bookRoutes from './routes/book';
import reviewRoutes from './routes/review';
import userRoutes from './routes/user';
import todoRoutes from './routes/todo';

// Import component
import Welcome from './Welcome';
import Book from './components/book';
import Review from './components/review';
import User from './components/user';
import Todo from './components/todo';


const history = createBrowserHistory();
const store = createStore(
  combineReducers({
    router: connectRouter(history),
    form,
    book,
    review,
    user,
    todo
  }),
  applyMiddleware(routerMiddleware(history), thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        {bookRoutes}
        {reviewRoutes}
        {userRoutes}
        {todoRoutes}
        <Route path="/" component={Welcome} strict={true} exact={true} />
        <Route render={() => <h1>Not Found</h1>} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
