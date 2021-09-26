export const CheckBox = ({ serviceName, onChange, checked }) => {
	return (
		<div>
			<input
				type="checkbox"
				id={`${serviceName}_id`}
				name={serviceName}
				value={serviceName}
				onChange={onChange}
				checked={checked}
			/>
			<label htmlFor={`${serviceName}_id`}>{serviceName}</label>
		</div>
	);
};
