import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import './ChangePassword.scss'
import { handleChangePassword } from '../../services/userService'
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {

            newPassword: '',
            confirmPassword: '',
            checkPassword: true
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    handleOnChange = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleKeyDown = (event) => {
        // console.log('check event: ', event)
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.changPassword()
        }
    }

    changPassword = async () => {
        let { userInfo } = this.props;

        if (this.state.confirmPassword === this.state.newPassword) {
            let data = {
                email: userInfo.email,
                newPassword: this.state.newPassword,

            }
            this.setState({
                checkPassword: true
            })
            let res = await handleChangePassword(data);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage);

            } else {
                toast.error("Change Password failed!")
            }
        } else {
            this.setState({
                checkPassword: false
            })
        }
    }

    backGoLogin = () => {
        if (this.props.history) {
            this.props.history.push(`/doctor/manage-patientn`)
        }
    }

    render() {

        let { language, userInfo } = this.props;
        let { confirmPassword, newPassword, checkPassword, email } = this.state;

        //  console.log("hoang check state: ", this.state)
        return (
            <div className='background'>
                <div className='content-up container'>
                    <div className='body row'>
                        <div className='title-change-password text-center'>Đổi mật khẩu</div>
                        <div className='email ' >
                            <label className='label' htmlFor='input-email'>Email</label>
                            <input type='email' className='form-control input-email mb-1'
                                value={userInfo && userInfo.email ? userInfo.email : email}

                                name='email'
                            ></input>
                        </div>
                        <div className='new-password'>
                            <label className='label' htmlFor='input-new-password'>Nhập mật khẩu mới</label>
                            <input type='password' className='form-control input-new-password mb-1'
                                value={newPassword}
                                onChange={(event) => this.handleOnChange(event, 'newPassword')}
                                onKeyDown={(event) => { this.handleKeyDown(event) }}
                                name='newPassword'
                            ></input>
                        </div>
                        <div className='confirm-password'>
                            <label className='label' htmlFor='input-confirm-password'>Xác nhận lại mật khẩu</label>
                            <input className='form-control input-confirm-password' type='password'
                                value={confirmPassword}
                                onKeyDown={(event) => { this.handleKeyDown(event) }}
                                onChange={(event) => this.handleOnChange(event, 'confirmPassword')}
                                name='confirmPassword'
                            ></input>
                        </div>

                        {checkPassword === true ?
                            <div></div>
                            :
                            <div className='check-password'>
                                <label className='label'>
                                    Mật khẩu đang không trùng khớp
                                </label> </div>
                        }


                        <div className='button-change-password'>
                            <button className='btn btn-primary mt-3'
                                onClick={() => this.changPassword()}
                            >
                                Đổi mật khẩu
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
