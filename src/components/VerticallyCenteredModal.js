import { useSelector } from 'react-redux';
import { StepOne } from './steps/StepOne';
import { StepTwo } from './steps/StepTwo';
import { StepThree } from './steps/StepThree';
import { StepFour } from './steps/StepFour';
import { EndScreen } from './EndScreen';
import Modal from 'react-bootstrap/Modal';

export const VerticallyCenteredModal = props => {
	const currentStep = useSelector(state => state.data.currentStep);
	let modalContent;

	if (currentStep === 1) {
		modalContent = <StepOne />;
	} else if (currentStep === 2) {
		modalContent = <StepTwo />;
	} else if (currentStep === 3) {
		modalContent = <StepThree />;
	} else if (currentStep === 4) {
		modalContent = <StepFour />;
	} else {
		modalContent = <EndScreen hideModal={props.onHide} />;
	}

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton={currentStep < 5 ? true : false}>
				<Modal.Title id="contained-modal-title-vcenter">
					Konfigurator servisa
				</Modal.Title>
			</Modal.Header>
			{modalContent}
		</Modal>
	);
};
