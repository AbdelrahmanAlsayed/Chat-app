import { useAuth } from "../context/AppProvider";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';


function PrivateRoute({ children }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/signin" replace="true"/>
    }
    return children;
}

PrivateRoute.propTypes = {  // to make children is not missing the props validation
    children: PropTypes.node.isRequired
};

export default PrivateRoute;