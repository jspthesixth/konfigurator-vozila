import { useContext } from 'react';
import { EditModeContext } from '../../context';
import { useSelector, useDispatch } from 'react-redux';
import { nextPage } from '../../store/dataSlice';
import { setUsersCar } from '../../store/stepSlice';
import { RadioButton } from '../RadioButton';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { data } from '../../data';

export const StepOne = () => {
	const usersCar = useSelector(state => state.steps.stepOne.usersCar);
	const editMode = useSelector(state => state.steps.stepFour.editMode);
	const editModeContext = useContext(EditModeContext);
	const { handleOnClick } = editModeContext;
	const dispatch = useDispatch();

	return (
		<>
			<Modal.Body>
				<h4>Korak 1. Odaberite proizvođača vašeg vozila</h4>
				{data.stepOne.cars.map((car, idx) => (
					<RadioButton
						key={idx}
						carName={car}
						checked={usersCar === car}
						onChange={() => dispatch(setUsersCar(car))}
					/>
				))}
			</Modal.Body>
			<Modal.Footer>
				{editMode ? (
					<Button size="sm" onClick={() => handleOnClick(4)}>
						Prihvati promjene
					</Button>
				) : (
					<Button
						size="sm"
						onClick={() => dispatch(nextPage())}
						disabled={!usersCar}
					>
						Dalje
					</Button>
				)}
			</Modal.Footer>
		</>
	);
};
