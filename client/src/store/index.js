import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { composeWithDevTools as composeWithDevToolsDev } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

import reducers from './reducers';

const composeEnhancers =
  process.env.NODE_ENV === 'production'
    ? composeWithDevTools({
        // Specify name here, actionsBlacklist, actionsCreators and other options if needed
        // options like actionSanitizer, stateSanitizer
      })
    : composeWithDevToolsDev({});

const middlewares = [thunk];

const store = createStore(
  reducers,
  /* preloadedState, */ composeEnhancers(
    applyMiddleware(...middlewares),
    // other store enhancers if any
  ),
);

export default store;
