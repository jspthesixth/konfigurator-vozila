import { createContext } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentStep } from '../store/dataSlice';
import { setEditMode } from '../store/stepSlice';

export const EditModeContext = createContext();

const EditModeProvider = ({ children }) => {
	const dispatch = useDispatch();

	const handleOnClick = step => {
		dispatch(setCurrentStep(step));
		dispatch(setEditMode());
	};

	return (
		<EditModeContext.Provider value={{ handleOnClick }}>
			{children}
		</EditModeContext.Provider>
	);
};

export default EditModeProvider;
