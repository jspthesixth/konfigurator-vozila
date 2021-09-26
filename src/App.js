import { useSelector, useDispatch } from 'react-redux';
import { startConfigurator, endConfigurator } from './store/dataSlice';
import { clearStepsData } from './store/stepSlice';
import { Entry } from './components/Entry';
import { VerticallyCenteredModal } from './components/VerticallyCenteredModal';
import EditModeProvider from './context';

export const App = () => {
	const isConfiguratorOn = useSelector(state => state.data.isConfiguratorOn);
	const dispatch = useDispatch();

	const hideModal = () => {
		dispatch(endConfigurator());
		dispatch(clearStepsData());
	};

	return (
		<EditModeProvider>
			<Entry showConfigurator={() => dispatch(startConfigurator())} />
			<VerticallyCenteredModal
				show={isConfiguratorOn}
				onHide={() => hideModal()}
				backdrop="static"
				keyboard={false}
			/>
		</EditModeProvider>
	);
};
