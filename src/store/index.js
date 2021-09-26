import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import stepReducer from './stepSlice';

export default configureStore({
	reducer: {
		data: dataReducer,
		steps: stepReducer,
	},
});
