import { Link } from 'react-router-dom';
import { useTitleCase } from '../hooks';

function Navbar({ currentPath, pathTarget }) {
	const btnSwitch = useTitleCase(pathTarget);

	return (
		<div className={`navbar-main navbar-main--${currentPath}`}>
			<Link to="/" className="navbar-main__logo">
				<img
					src={
						currentPath === 'encode'
							? '/images/decod-red.svg'
							: '/images/decod-white.svg'
					}
					alt="Logo"
				/>
				<h3>Decod</h3>
			</Link>
			<Link to={`/${pathTarget}`} className="navbar-main__btn">
				{btnSwitch}
			</Link>
		</div>
	);
}

export default Navbar;
