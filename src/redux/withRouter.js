import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom';


export const withRouter = (Component) => {
	const Wrapper = (props) => {
		const getLocation = useLocation();
		const history = useNavigate();
		return <Component history={history} location={getLocation} {...props}  />;
	};
	return Wrapper;
};