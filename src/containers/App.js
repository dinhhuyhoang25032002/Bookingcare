import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'
import Login from './Auth/Login'
import Home from '../routes/Home';
import System from '../routes/System';
//import { CustomToastCloseButton } from '../components/CustomToast';
import HomePage from './HomePage/HomePage.js'
import InforDoctor from './Patient/Doctor/InforDoctor'
import CustomScrollbars from '../components/CustomScrollbars';
import Doctor from '../routes/Doctor';
import confirmBooking from '../containers/Patient/confirmBooking';
import SpecialtyInfor from '../containers/Patient/Specialty/SpecialtyInfor'
import ClinicInfor from '../containers/Patient/Clinic/ClinicInfor.js'
import CreateAccount from '../containers/Auth/CreateAccount.js'
import ForgotPassword from './Auth/ForgotPassword.js'
import Introduction from '../containers/HomePage/Extention/Introduction.js'

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.CREATE_ACCOUNT} component={CreateAccount} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.INFOR_DOCTOR} component={InforDoctor} />
                                    <Route path={path.INFOR_SPCIALTY} component={SpecialtyInfor} />
                                    <Route path={path.INFOR_CLINIC} component={ClinicInfor} />
                                    <Route path={'/doctor/'} component={userIsAuthenticated(Doctor)} />
                                    <Route path={path.CONFIRM_BOOKING} component={confirmBooking} />
                                    <Route path={path.FORGOT_PASSWORD} component={ForgotPassword} />
                                    <Route path={path.INTRODUCTION_HOMECARE} component={Introduction} />
                                </Switch>
                            </CustomScrollbars>
                        </div>

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}

                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />

                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);