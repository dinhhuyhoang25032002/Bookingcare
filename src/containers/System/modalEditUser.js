import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            lastName: '',
            firstName: '',
            address: '',
            phoneNumber: '',
        }

    }

    componentDidMount() {
        let user = this.props.currentUser
        if (user && !_.isEmpty(user)) {
            this.setState({
                id:user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                password: 'ascfas',
                address: user.address,
                phoneNumber: user.phoneNumber
            })
        }
    }
    toggle = () => {
        this.props.toggle();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ... this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })

    }

    checkValid = () => {
        let Valid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber'];

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                Valid = false;
                alert('Missing required parameter:' + arrInput[i]);
                break;
            }
        } return Valid;
    }



    handleSaveUser = () => {
        let valid = this.checkValid();
        if (valid === true) {
            this.props.editUser(this.state);
        }
    }

    render() {

        return (
            <div className="text-center" >
                <Modal isOpen={this.props.isOpen}
                    toggle={() => { this.toggle() }}
                    className={'modal-user-container'}
                    size='lg'
                    centered
                >
                    <ModalHeader toggle={() => { this.toggle() }}>Edit a User</ModalHeader>
                    <ModalBody >

                        <div className=' modal-user-body'>
                            <div className='input-container'>
                                <label> Email</label>
                                <input type='text' placeholder='Email'

                                    onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                    value={this.state.email}
                                    disabled>

                                </input>
                            </div>
                            <div className='input-container'>
                                <label> PassWord</label>
                                <input type='password' placeholder='Password'
                                    onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                    value={this.state.password}
                                    disabled>

                                </input>
                            </div>
                            <div className='input-container'>
                                <label> firstName</label>
                                <input type='text' placeholder='firstName'
                                    onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }}
                                    value={this.state.firstName}>

                                </input>
                            </div>
                            <div className='input-container'>
                                <label> lastName</label>
                                <input type='text' placeholder='lastName'
                                    onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }}
                                    value={this.state.lastName}>
                                </input>
                            </div>
                            <div className='input-container max-width-input'>
                                <label> Address</label>
                                <input type='text' placeholder='Address'
                                    onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                                    value={this.state.address}>

                                </input>
                            </div>
                            <div className='input-container max-width-input'>
                                <label> phoneNumber</label>
                                <input type='text' placeholder='phoneNumber'
                                    onChange={(event) => { this.handleOnChangeInput(event, 'phoneNumber') }}
                                    value={this.state.phoneNumber}>

                                </input>
                            </div>
                        </div>


                    </ModalBody >
                    <ModalFooter>
                        <Button color="primary " className='px- 3' onClick={() => { this.handleSaveUser() }}>
                            Save Changes
                        </Button>{' '}
                        <Button color="secondary" className='px- 3' onClick={() => { this.toggle() }}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal >
            </div >
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);



