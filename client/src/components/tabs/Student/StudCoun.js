import { useEffect, useContext } from 'react';
import StudContext from '../../../context/student/studContext';
import StudCounCard from '../../layout/Student/Coun/StudCounCard';
import Preloader from '../../layout/Preloader/Preloader';

const StudCoun = ({ tabKey, setTabKey, setCounsellor }) => {
	const studContext = useContext(StudContext);
	const { counsellors, loadCounsellors } = studContext;

	useEffect(() => {
		if (tabKey === 'StudCoun') {
			loadCounsellors();
		}
		// eslint-disable-next-line
	}, [tabKey]);

	if (!counsellors) {
		return <Preloader marginClass='m-5' colorClass='success' />;
	}

	return (
		<div
			style={{
				borderRadius: '0.5rem',
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'wrap',
				gap: '2rem',
				paddingTop: '2rem',
			}}
		>
			{counsellors.map((item) => {
				return (
					<StudCounCard
						key={item.coun_id}
						user={item}
						setTabKey={setTabKey}
						setCounsellor={setCounsellor}
					/>
				);
			})}
		</div>
	);
};

export default StudCoun;
