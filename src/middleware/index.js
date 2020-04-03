import { applyMiddleware } from 'redux';
import logger from '../middleware/logger';
import thunk from 'redux-thunk';

export default applyMiddleware(thunk, logger);
