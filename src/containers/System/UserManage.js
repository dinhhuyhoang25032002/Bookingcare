import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserFromService, deleteUserFromService, editUserFromService } from '../../services/userService';
import ModalUser from './modalUser';
import { emitter } from '../../utils/emitter'
import ModalEditUser from './modalEditUser';
class UserManage extends Component {

    state = {

    }
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        }
    }
    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            }, () => {

            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
        //alert('click me')
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,

        })
    }

    toggleUserModalEdit = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserFromService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false,
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }

        } catch (e) {
            console.log(e)
        }
    }

    handleDelete = async (user) => {
        try {
            let response = await deleteUserFromService(user.id)
            if (response && response.errCode === 0) {
                await this.getAllUsersFromReact();
            } else {
                alert(response.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleEditUser = (user) => {
        console.log('edit user', user)
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,
        })
    }

    doEditUser = async (user) => {
        try {
            let response = await editUserFromService(user);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                this.getAllUsersFromReact();
            } else {
                alert(response.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-container ">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggle={this.toggleUserModal}
                    size='lg'
                    centered
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggle={this.toggleUserModalEdit}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className='title text-center'>Manage Users</div>
                <div className='mx-3'>
                    <button className='btn btn-primary px-3' onClick={() => this.handleAddNewUser()}>

                        <i className="fas fa-plus"></i>
                        Add New User
                    </button>
                </div>
                <div className='user-table mt-3 mx-3'>
                    <table id="customers">
                        <tbody>
                            <tr >
                                <th >FisrtName</th>
                                <th>LastName</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>PhoneNumber</th>
                                <th>Gender</th>
                                <th>Action</th>

                            </tr>


                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.email}</td>
                                            <td>{item.address}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>{item.gender}</td>
                                            <td>
                                                <button className='btn-edit' onClick={() => this.handleEditUser(item)}> <i className="fas fa-pencil-alt"></i></button>
                                                <button className='btn-delete' onClick={() => this.handleDelete(item)}><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>

                                    </>
                                )
                            }
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
