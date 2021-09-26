import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { prevPage, nextPage } from '../../store/dataSlice';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { EditModeContext } from '../../context';

export const StepFour = () => {
	const usersCar = useSelector(state => state.steps.stepOne.usersCar);
	const usersInfo = useSelector(state => {
		const name = state.steps.stepThree.formDetails.name;
		const email = state.steps.stepThree.formDetails.email;
		const phone = state.steps.stepThree.formDetails.phone;
		const text = state.steps.stepThree.formDetails.text;

		return { name, email, phone, text };
	});
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
	const editModeContext = useContext(EditModeContext);
	const { handleOnClick } = editModeContext;
	const dispatch = useDispatch();

	const { name, email, phone, text } = usersInfo;
	const { chosenCarServices, totalValue, hasCoupon, discountAmount } =
		carServicesData;

	return (
		<>
			<Modal.Body>
				<h4>Korak 4. Pregled vaših odabira</h4>
				<Container>
					<Row>
						<Col>
							<div className="custom-row">
								<h6>MODEL VOZILA</h6>
								<Button size="sm" onClick={() => handleOnClick(1)}>
									UREDI
								</Button>
							</div>
							<p>{usersCar}</p>
						</Col>
						<Col>
							<div className="custom-row">
								<h6>ODABRANE USLUGE</h6>
								<Button size="sm" onClick={() => handleOnClick(2)}>
									UREDI
								</Button>
							</div>
							{chosenCarServices.map((service, idx) => (
								<p key={idx}>{`${service[0]}: ${service[1]} KN`}</p>
							))}
							{hasCoupon ? (
								<>
									<h6>OSNOVICA: {totalValue} KN</h6>
									<h6>Popust (30%): -{discountAmount} KN</h6>
									<h4>Ukupno: {totalValue - discountAmount} KN</h4>
								</>
							) : (
								<h4>Ukupno: {totalValue} KN</h4>
							)}
						</Col>
					</Row>
				</Container>
				<Container>
					<Row>
						<Col>
							<div className="custom-row">
								<h6>KONTAKT PODACI</h6>
								<Button size="sm" onClick={() => handleOnClick(3)}>
									UREDI
								</Button>
							</div>
							<p>Ime i prezime: {name}</p>
							<p>Email: {email}</p>
							<p>Broj telefona: {phone}</p>
							<p>Napomena: {text}</p>
						</Col>
					</Row>
				</Container>
			</Modal.Body>
			<Modal.Footer>
				<Button size="sm" onClick={() => dispatch(prevPage())}>
					Nazad
				</Button>
				<Button size="sm" onClick={() => dispatch(nextPage())}>
					Pošalji
				</Button>
			</Modal.Footer>
		</>
	);
};
