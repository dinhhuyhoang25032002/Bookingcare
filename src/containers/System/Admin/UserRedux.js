import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils'
import * as actions from '../../../store/actions'
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import TableManageUser from './TableManageUser'
//import { add, last } from 'lodash';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            updateImage: '',
            isOpen: false,
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            phonenumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            userEditId: '',

        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let arrGender = this.props.typeGender
        if (prevProps.typeGender !== this.props.typeGender) {
            this.setState({
                genderArr: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : ''
            })
        }
        if (prevProps.typePosition !== this.props.typePosition) {
            let arrPosition = this.props.typePosition
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''
            })
        }
        if (prevProps.typeRole !== this.props.typeRole) {
            let arrRole = this.props.typeRole
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGender = this.props.typeGender;
            let arrRole = this.props.typeRole;
            let arrPosition = this.props.typePosition;
            this.setState({
                email: '',
                password: '',
                firstname: '',
                lastname: '',
                phonenumber: '',
                address: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                updateImage: '',
            })
        }
    }

    handleUpdateImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            console.log('chech data image: ', base64)
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                updateImage: objectUrl,
                avatar: base64
            })
        }
    }

    handlePreviewImage = () => {
        if (!this.state.updateImage) return;
        this.setState({
            isOpen: true
        })
    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    CheckValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstname', 'lastname', 'phonenumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Missing required parameter:  ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    }

    handlesubmit = () => {
        let isValid = this.CheckValidateInput();
        if (isValid === false) return;

        let action = this.state.action;

        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                passWord: this.state.password,
                firstName: this.state.firstname,
                lastName: this.state.lastname,
                address: this.state.address,
                phoneNumber: this.state.phonenumber,
                gender: this.state.gender,
                roleID: this.state.role,
                positionID: this.state.position,
                avatar: this.state.avatar,

            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editUser({
                email: this.state.email,
                id: this.state.userEditId,
                passWord: this.state.password,
                firstName: this.state.firstname,
                lastName: this.state.lastname,
                address: this.state.address,
                phoneNumber: this.state.phonenumber,
                gender: this.state.gender,
                roleID: this.state.role,
                positionID: this.state.position,
                avatar: this.state.avatar
            })
        }

    }
    handleEditUser = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }

        this.setState({
            email: user.email,
            password: 'password',
            firstname: user.firstName,
            lastname: user.lastName,
            phonenumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionID,
            role: user.roleID,
            avatar: '',
            updateImage: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }
    render() {
        let genders = this.state.genderArr;
        let language = this.props.language;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;

        let { email, password, firstname, lastname, phonenumber, address, position, role, gender } = this.state;
        return (
            <div className='user-redux-container'>
                <div className='title my-3'><FormattedMessage id='manage-user.title' /></div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'><b><FormattedMessage id='manage-user.add' /></b></div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.email' /></label>
                                <input className='form-control'
                                    type='email'
                                    value={email}
                                    onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.password' /></label>
                                <input className='form-control'
                                    type='password'
                                    value={password}
                                    onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.firstname' /></label>
                                <input className='form-control'
                                    type='text'
                                    value={firstname}
                                    onChange={(event) => { this.handleOnChangeInput(event, 'firstname') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.lastname' /></label>
                                <input className='form-control'
                                    type='text'
                                    value={lastname}
                                    onChange={(event) => { this.handleOnChangeInput(event, 'lastname') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.phonenumber' /></label>
                                <input className='form-control'
                                    type='text'
                                    value={phonenumber}
                                    onChange={(event) => { this.handleOnChangeInput(event, 'phonenumber') }} />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id='manage-user.address' /></label>
                                <input className='form-control'
                                    type='text'
                                    value={address}
                                    onChange={(event) => { this.handleOnChangeInput(event, 'address') }} />
                            </div>
                            <div className='col-3'>
                                <label ><FormattedMessage id='manage-user.gender' /></label>
                                <select className="form-select"
                                    onChange={(event) => { this.handleOnChangeInput(event, 'gender') }}
                                    value={gender}>
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.role' /></label>
                                <select className="form-select"
                                    onChange={(event) => { this.handleOnChangeInput(event, 'role') }}
                                    value={role}>
                                    {roles && roles.length > 0 && roles.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}

                                </select>
                            </div>
                            
                            <div className='col-6'>
                                <label><FormattedMessage id='manage-user.image' /></label>
                                <div className='update-avatar'>
                                    <input id='update-image' type='file' hidden
                                        // value={avatar}
                                        onChange={(event) => { this.handleUpdateImage(event) }} />

                                    <label className='label-update' htmlFor="update-image"> Tải ảnh <i className="fas fa-upload"></i></label>

                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.updateImage})` }}
                                        onClick={() => { this.handlePreviewImage() }}
                                    >
                                    </div>
                                </div>

                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.position' /></label>
                                <select className="form-select"
                                    onChange={(event) => { this.handleOnChangeInput(event, 'position') }}
                                    value={position}>
                                    {positions && positions.length && positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-12'>

                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-outline-success my-3' : 'btn btn-outline-primary my-3'}
                                    onClick={() => { this.handlesubmit() }}>
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id='manage-user.edit' /> : <FormattedMessage id='manage-user.submit' />}
                                </button>
                            </div>

                            <div className='col-12 mb-5'>
                                <TableManageUser
                                    handleEditUser={this.handleEditUser}
                                    action={this.state.action}
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {this.state.isOpen === true && <Lightbox
                    mainSrc={this.state.updateImage}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                />}

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        typeGender: state.admin.genders,
        typePosition: state.admin.positions,
        typeRole: state.admin.roles,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        editUser: (data) => dispatch(actions.editUser(data))


        //processLogout: () => dispatch(actions.processLogout()),
        //changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),   
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);



