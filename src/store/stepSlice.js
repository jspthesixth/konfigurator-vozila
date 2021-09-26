import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	stepOne: {
		usersCar: '',
	},
	stepTwo: {
		carServices: {},
		chosenCarServices: [],
		coupon: '',
		totalValue: 0,
		hasCoupon: false,
		couponAttempts: 0,
		discountAmount: 0,
	},
	stepThree: {
		isFormValid: false,
		formDetails: { name: '', email: '', phone: '', text: '' },
	},
	stepFour: {
		editMode: false,
	},
};

export const stepSlice = createSlice({
	name: 'steps',
	initialState,
	reducers: {
		setUsersCar: (state, action) => {
			state.stepOne.usersCar = action.payload;
		},
		setCarServices: (state, action) => {
			state.stepTwo.carServices = action.payload;
		},
		handleCarService: (state, action) => {
			if (
				state.stepTwo.chosenCarServices.some(service =>
					service.includes(action.payload[0])
				)
			) {
				state.stepTwo.chosenCarServices =
					state.stepTwo.chosenCarServices.filter(
						service => !service.includes(action.payload[0])
					);
			} else {
				state.stepTwo.chosenCarServices = [
					...state.stepTwo.chosenCarServices,
					action.payload,
				];
			}
		},
		setCoupon: (state, action) => {
			state.stepTwo.coupon = action.payload;
		},
		addTotalValue: (state, action) => {
			state.stepTwo.totalValue = action.payload;
		},
		setHasCoupon: (state, action) => {
			state.stepTwo.hasCoupon = action.payload;
		},
		setCouponAttempts: state => {
			state.stepTwo.couponAttempts += 1;
		},
		setDiscountAmount: (state, action) => {
			state.stepTwo.discountAmount = action.payload;
		},
		setIsFormValid: state => {
			state.stepThree.isFormValid = true;
		},
		setFormDetails: (state, action) => {
			state.stepThree.formDetails = action.payload;
		},
		setEditMode: state => {
			state.stepFour.editMode = !state.stepFour.editMode;
		},
		clearStepsData: state => {
			return initialState;
		},
	},
});

export const {
	setUsersCar,
	setCarServices,
	handleCarService,
	setCoupon,
	addTotalValue,
	setHasCoupon,
	setCouponAttempts,
	setDiscountAmount,
	setIsFormValid,
	setFormDetails,
	setEditMode,
	clearStepsData,
} = stepSlice.actions;

export default stepSlice.reducer;
