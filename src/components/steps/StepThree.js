import { useContext } from 'react';
import { EditModeContext } from '../../context';
import { useSelector, useDispatch } from 'react-redux';
import { prevPage, nextPage } from '../../store/dataSlice';
import { setFormDetails } from '../../store/stepSlice';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const StepThree = () => {
	const contact = useSelector(state => state.steps.stepThree.formDetails);
	const editMode = useSelector(state => state.steps.stepFour.editMode);
	const editModeContext = useContext(EditModeContext);
	const { handleOnClick } = editModeContext;
	const dispatch = useDispatch();

	const handleOnChange = e => {
		dispatch(setFormDetails({ ...contact, [e.target.name]: e.target.value }));
	};

	const validateEmail = email => {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	};

	const validateForm = () => {
		if (name !== '' && email !== '' && phone !== '' && validateEmail(email)) {
			dispatch(setFormDetails(contact));
			dispatch(nextPage());
		} else {
			alert('Popuni sve required fieldove točno!');
		}
	};

	const { name, email, phone, text } = contact;

	return (
		<>
			<Modal.Body>
				<h4>Korak 3. Vaši kontakt podaci</h4>
				<form onSubmit={e => e.preventDefault()}>
					<input
						type="text"
						name="name"
						value={name}
						placeholder="Ime i prezime*"
						onChange={handleOnChange}
						required
					/>
					<input
						type="email"
						name="email"
						value={email}
						placeholder="Email adresa*"
						onChange={handleOnChange}
						required
					/>
					<input
						type="number"
						name="phone"
						value={phone}
						placeholder="Broj telefona*"
						onChange={handleOnChange}
						required
					/>
					<textarea
						type="text"
						name="text"
						value={text}
						placeholder="Napomena (opcionalno)"
						onChange={handleOnChange}
					/>
				</form>
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
						<Button size="sm" onClick={() => validateForm()}>
							Dalje
						</Button>
					</>
				)}
			</Modal.Footer>
		</>
	);
};
