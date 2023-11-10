// Imports
import { useContext } from 'react';
import AlertContext from '../../../context/alert/alertContext';

const Alerts = () => {
	const alertContext = useContext(AlertContext);

	return (
		alertContext.alerts.length > 0 &&
		alertContext.alerts.map((alert) => (
			<div
				key={alert.id}
				className={`alert alert-${alert.type}`}
				style={{
					margin: '0',
					zIndex: '10000',
					position: 'absolute',
					top: '0',
					left: '0',
					width: '100%',
				}}
			>
				{alert.msg}
			</div>
		))
	);
};

export default Alerts;
