import React, { Component } from 'react';
//import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions'
import {getAllUsers} from '../../../services/userService'

//import MarkdownIt from 'markdown-it';
//import MdEditor from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';


// const mdParser = new MarkdownIt(/* Markdown-it options */);
// function handleEditorChange  ({ html, text }) {
// }


class TableManageUser extends Component {

    state = {

    }
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
        }
    }


    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id)
    }

    handleEditUser = (user) => {
        this.props.handleEditUser(user);
    }

    render() {
        let arrUsers = this.state.usersRedux;
        return (
            <React.Fragment>
                <table id='TableManageUser'>
                    <tbody>
                        <tr >
                            <th>FisrtName</th>
                            <th>LastName</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>PhoneNumber</th>
                            <th>Gender</th>
                            <th>Action</th>

                        </tr>

                        {arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.gender}</td>
                                        <td>
                                            <button className='btn-edit' > <i className="fas fa-pencil-alt"
                                                onClick={() => { this.handleEditUser(item) }}
                                            ></i></button>
                                            <button className='btn-delete'><i className="fas fa-trash-alt"
                                                onClick={() => { this.handleDeleteUser(item) }}
                                            ></i></button>
                                        </td>

                                    </tr>
                                )
                            })}



                    </tbody>
                </table>
                {/* <MdEditor style={{ height: '500px' }} 
                renderHTML={text => mdParser.render(text)} 
                onChange={this.handleEditorChange} /> */}

            </React.Fragment>


        )
    }
}



const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
