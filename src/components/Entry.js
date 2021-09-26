import Button from 'react-bootstrap/Button';

export const Entry = ({ showConfigurator }) => {
	return (
		<div className="content">
			<h1>Pritisnite gumb niže kako biste pokrenuli</h1>
			<Button size="sm" onClick={showConfigurator} variant="primary">
				Pokreni konfigurator
			</Button>
		</div>
	);
};
