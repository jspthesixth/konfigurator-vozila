export const RadioButton = ({ carName, onChange, checked }) => {
	return (
		<div>
			<input
				type="radio"
				id={`${carName}_id`}
				name={carName}
				value={carName}
				checked={checked}
				onChange={onChange}
			/>
			<label htmlFor={`${carName}_id`}>{carName}</label>
		</div>
	);
};
