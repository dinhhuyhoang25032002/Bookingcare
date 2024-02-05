import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { withRouter } from 'react-router';
//import { FormattedMessage } from 'react-intl';
import { handleLogin } from '../../../src/services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
            isRememberPassword: false,
        }
    }

    handleOnChangeUser = (event) => {
        this.setState({
            username: event.target.value
        })

    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })

    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    RememberPassword = () => {
        alert('click me');

    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })

        try {

            let data = await handleLogin(this.state.username, this.state.password);
            console.log('hoàng check data:', data);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.errMessage
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.errMessage
                    })
                }
            }


        }
    }

    handleKeyDown = (event) => {
         console.log('check event: ', event)
        if (event.key === 'Enter' || event.keyCode === 13) {
           this.handleLogin()
        }
    }

    handleCreateAccount = () => {
        if (this.props.history) {
            this.props.history.push(`/create-account`)
        }
    }
    // handleForgotPassWord =()=>{
    //     if (this.props.history) {
    //         this.props.history.push(`/forgot-password`)
    //     }
    // }
    render() {
        return (
            <div className='login-backgroud'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 logo-web'>

                        </div>
                        <div className='col-12 text-login'>Sign In</div>
                        <div className='col-12 form-group login-input'>
                            <label>UserName</label>
                            <input type='text' className='form-control' placeholder='Email' value={this.state.username}
                                onChange={(event) => this.handleOnChangeUser(event)}
                            onKeyDown={(event) => { this.handleKeyDown(event) }}
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>PassWord</label>
                            <div className='icon-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'} className='form-control' placeholder='Password' value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    onKeyDown={(event) => { this.handleKeyDown(event) }}
                                />
                                <span onClick={() => { this.handleShowHidePassword() }}>

                                    <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className='col-12' style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div>
                        </div>
                        <div className='col-12 note-me'>
                            <input type="checkbox" className="remember" onClick={() => this.RememberPassword()} />
                            <label className='text-remember'> Remember Me</label>
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => { this.handleLogin() }}>Sign In</button>
                        </div>
                        <div className='col-12 create-forgot-password'>
                            <span className='forgot-password'
                                onClick={() => { this.handleCreateAccount() }}
                            >
                                Create a account
                            </span>
                            {/* <span className='forgot-password'
                            // onClick={()=>{this.handleForgotPassWord()}}
                            >
                                Forgot your password?
                            </span> */}
                        </div>

                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
