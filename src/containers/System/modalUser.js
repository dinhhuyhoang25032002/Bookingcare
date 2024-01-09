import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            lastname: '',
            firstname: '',
            address: '',
            phonenumber: '',
        }
        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA' ,()=> {
         this.setState({
            email: '',
            password: '',
            lastname: '',
            firstname: '',
            address: '',
            phonenumber: '',
         })
        })
    }
    componentDidMount() {
    }
    toggle = () => {
        this.props.toggle();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = {... this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })

    }

    checkValid = () => {
        let Valid = true;
        let arrInput = ['email', 'password', 'firstname', 'lastname', 'address', 'phonenumber'];

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                Valid = false;
                alert('Missing required parameter:' + arrInput[i]);
                break;
            }
        } return Valid;
    }

    handleAddNewUser = () => {
        let valid = this.checkValid();
        if (valid === true) {
            this.props.createNewUser(this.state);

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
                    <ModalHeader toggle={() => { this.toggle() }}>Create New User</ModalHeader>
                    <ModalBody >

                        <div className=' modal-user-body'>
                            <div className='input-container'>
                                <label> Email</label>
                                <input type='text' placeholder='Email'

                                    onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                    value={this.state.email}>

                                </input>
                            </div>
                            <div className='input-container'>
                                <label> PassWord</label>
                                <input type='password' placeholder='Password'
                                    onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                    value={this.state.password}>

                                </input>
                            </div>
                            <div className='input-container'>
                                <label> firstName</label>
                                <input type='text' placeholder='firstName'
                                    onChange={(event) => { this.handleOnChangeInput(event, 'firstname') }}
                                    value={this.state.firstname}>

                                </input>
                            </div>
                            <div className='input-container'>
                                <label> lastName</label>
                                <input type='text' placeholder='lastName'
                                    onChange={(event) => { this.handleOnChangeInput(event, 'lastname') }}
                                    value={this.state.lastname}>
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
                                    onChange={(event) => { this.handleOnChangeInput(event, 'phonenumber') }}
                                    value={this.state.phonenumber}>

                                </input>
                            </div>
                        </div>


                    </ModalBody >
                    <ModalFooter>
                        <Button color="primary " className='px- 3' onClick={() => { this.handleAddNewUser() }}>
                            Add New
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



