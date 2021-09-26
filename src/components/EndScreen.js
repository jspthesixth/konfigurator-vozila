import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const EndScreen = ({ hideModal }) => {
	return (
		<Modal.Body>
			<div className="centered-text">
				<h3>Vaša prijava je uspješno poslana</h3>
				<p>
					Vaša prijava je uspješno poslana i zaprimljena. Kontaktirati ćemo vas
					u najkraćem mogućem roku. Hvala vam.
				</p>
				<Button size="sm" onClick={hideModal}>
					Zatvori
				</Button>
			</div>
		</Modal.Body>
	);
};
