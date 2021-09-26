import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isConfiguratorOn: false,
	currentStep: 0,
	stepsData: [],
};

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes
export const dataSlice = createSlice({
	name: 'storeData',
	initialState,
	reducers: {
		startConfigurator: state => {
			state.isConfiguratorOn = true;
			state.currentStep += 1;
		},
		endConfigurator: state => {
			return initialState;
		},
		prevPage: state => {
			state.currentStep -= 1;
		},
		nextPage: state => {
			state.currentStep += 1;
		},
		setCurrentStep: (state, action) => {
			state.currentStep = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	startConfigurator,
	endConfigurator,
	prevPage,
	nextPage,
	setCurrentStep,
} = dataSlice.actions;

export default dataSlice.reducer;
