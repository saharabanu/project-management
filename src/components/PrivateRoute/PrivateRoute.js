const { Navigate } = require('react-router-dom');
const { default: useAuth } = require('../../hooks/useAuth');

const PrivateRoute = ({ children }) => {
	const isLoggedIn = useAuth();
	return isLoggedIn ? children : <Navigate to='/' replace={true} />;
};

export default PrivateRoute;