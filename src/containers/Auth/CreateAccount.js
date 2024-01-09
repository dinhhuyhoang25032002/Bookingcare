import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import './CreateAccount.scss'
import { withRouter } from 'react-router';
class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }
    backGoLogin = () => {
        if (this.props.history) {
            this.props.history.push(`/login`)
        }
    }


    render() {

        let { language } = this.props;
        console.log("hoang check state: ", this.state)
        return (
            <div className='backgroup-sign-up'>
                <div className=' create-account '>

                    <div className='content container'>
                        <div className=' logo'>

                        </div>

                        <div className='group-item row'>
                            <div className='title-sign-up '>
                                <span> Sign Up</span>
                            </div>
                            <div className='ip-userName  col-6 '>
                                <label>firstName</label>
                                <input className='form-control '></input>
                            </div>
                            <div className='ip-userName  col-5 '>
                                <label>lastName</label>
                                <input className='form-control '></input>
                            </div>
                            <div className='email col-11 mt-1'>
                                <label>Email</label>
                                <input className='form-control'></input>
                            </div>
                            <div className='password col-11 mt-1'>
                                <label>PassWord</label>
                                <input className='form-control'></input>
                            </div>
                            <div className='birthday col-4 mt-1'>
                                <label>Day</label>
                                <select className='form-control '>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>25</option>
                                </select>
                            </div>
                            <div className='month col-4'>
                                <label>Month</label>
                                <select className='form-control'>
                                    <option>January</option>
                                    <option>February</option>
                                    <option>March</option>
                                    <option>April</option>

                                </select>
                            </div>
                            <div className='year col-3'>
                                <label>Year</label>
                                <select className='form-control'>
                                    <option>2001</option>
                                    <option>2002</option>
                                    <option>2003</option>
                                    <option>2004</option>
                                </select>
                            </div>

                            <div className='col-11 mt-1 '>
                                <label>Gender</label>
                                <div className='optin-gender' >
                                    <input type='radio' name='gender'></input>
                                    <label>Male</label>

                                    <input type='radio' name='gender'></input>
                                    <label>Female</label>

                                    <input type='radio' name='gender'></input>
                                    <label>Other</label>
                                </div>
                            </div>
                            <div className='col-11 mt-3'>
                                <button className='btn-login'
                                    onClick={() => { this.backGoLogin() }}
                                >Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateAccount));
