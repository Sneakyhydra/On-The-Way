const Preloader = ({
	colorClass = 'primary',
	marginClass = 'm-0',
	text = '',
}) => {
	return (
		<div className={'d-flex justify-content-center ' + marginClass}>
			<div className={'spinner-grow text-' + colorClass} role='status'>
				<span className='sr-only'>{text}</span>
			</div>
		</div>
	);
};

export default Preloader;
