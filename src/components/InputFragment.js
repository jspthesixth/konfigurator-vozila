import Button from 'react-bootstrap/Button';

export const InputFragment = ({
	toggleInput,
	inputValue,
	handleOnChange,
	handleOnClick,
}) => {
	if (toggleInput) {
		return (
			<>
				<input type="text" value={inputValue} onChange={handleOnChange} />
				<Button size="sm" onClick={handleOnClick}>
					Primjeni
				</Button>
			</>
		);
	}

	return (
		<Button size="sm" onClick={handleOnClick}>
			Imam kupon
		</Button>
	);
};
