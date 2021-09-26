import { useState, useEffect, useContext } from 'react';
import { EditModeContext } from '../../context';
import { useSelector, useDispatch } from 'react-redux';
import { prevPage, nextPage } from '../../store/dataSlice';
import {
	setCarServices,
	handleCarService,
	setCoupon,
	addTotalValue,
	setHasCoupon,
	setCouponAttempts,
	setDiscountAmount,
} from '../../store/stepSlice';
import { CheckBox } from '../CheckBox';
import { InputFragment } from '../InputFragment';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { data } from '../../data';

export const StepTwo = () => {
	const [toggleCouponInput, setToggleCouponInput] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const carServicesData = useSelector(state => {
		const carServices = state.steps.stepTwo.carServices;
		const chosenCarServices = state.steps.stepTwo.chosenCarServices;
		const totalValue = state.steps.stepTwo.totalValue;
		const coupon = state.steps.stepTwo.coupon;
		const hasCoupon = state.steps.stepTwo.hasCoupon;
		const couponAttempts = state.steps.stepTwo.couponAttempts;
		const discountAmount = state.steps.stepTwo.discountAmount;

		return {
			carServices,
			chosenCarServices,
			totalValue,
			coupon,
			hasCoupon,
			couponAttempts,
			discountAmount,
		};
	});
	const editMode = useSelector(state => state.steps.stepFour.editMode);
	const editModeContext = useContext(EditModeContext);
	const { handleOnClick } = editModeContext;
	const dispatch = useDispatch();

	const {
		carServices,
		chosenCarServices,
		totalValue,
		coupon,
		hasCoupon,
		couponAttempts,
		discountAmount,
	} = carServicesData;

	useEffect(() => {
		dispatch(setCarServices(data.stepTwo.services));
		dispatch(setCoupon(data.stepTwo.coupon));

		return () => {
			dispatch(setCarServices({}));
			dispatch(setCoupon(''));
		};
	}, []);

	useEffect(() => {
		const total =
			chosenCarServices.length > 0 &&
			chosenCarServices.map(service => service[1]).reduce((a, b) => a + b);

		dispatch(addTotalValue(Number(total)));
	}, [chosenCarServices]);

	useEffect(() => {
		hasCoupon && dispatch(setDiscountAmount((totalValue * 0.3).toFixed(2)));
	}, [totalValue, hasCoupon]);

	const isCouponValid = usersCoupon => {
		dispatch(setHasCoupon(usersCoupon === coupon));
		dispatch(setCouponAttempts());
	};

	const handleInputFragmentClick = () => {
		if (!toggleCouponInput) {
			setToggleCouponInput(prevState => !prevState);
		} else {
			isCouponValid(inputValue);
		}
	};

	return (
		<>
			<Modal.Body>
				<h4>Korak 2. Odaberite jednu ili više usluga</h4>
				{Object.entries(carServices).map(service => (
					<CheckBox
						key={`${service[0]}_${service[1]}`}
						serviceName={`${service[0]} (${service[1]} kn)`}
						checked={chosenCarServices.some(item => item[0] === service[0])}
						onChange={() => dispatch(handleCarService(service))}
					/>
				))}
				{!hasCoupon ? (
					<InputFragment
						toggleInput={toggleCouponInput}
						inputValue={inputValue}
						handleOnChange={e => setInputValue(e.target.value)}
						handleOnClick={() => handleInputFragmentClick()}
					/>
				) : (
					<Alert variant="success">
						Hvala vam što ste unijeli ispravan kupon!
					</Alert>
				)}
				{couponAttempts > 0 && toggleCouponInput && !hasCoupon && (
					<Alert variant="danger">Neispravan kupon, pokušajte ponovno!</Alert>
				)}
				{hasCoupon ? (
					<>
						<h6>OSNOVICA: {totalValue} KN</h6>
						<h6>Popust (30%): -{discountAmount} KN</h6>
						<h4>Ukupno: {totalValue - discountAmount} KN</h4>
					</>
				) : (
					<h4>Ukupno: {totalValue} KN</h4>
				)}
			</Modal.Body>
			<Modal.Footer>
				{editMode ? (
					<Button size="sm" onClick={() => handleOnClick(4)}>
						Prihvati promjene
					</Button>
				) : (
					<>
						<Button size="sm" onClick={() => dispatch(prevPage())}>
							Nazad
						</Button>
						<Button
							size="sm"
							onClick={() => dispatch(nextPage())}
							disabled={chosenCarServices.length === 0}
						>
							Dalje
						</Button>
					</>
				)}
			</Modal.Footer>
		</>
	);
};
