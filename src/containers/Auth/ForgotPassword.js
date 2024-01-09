import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import './ForgotPassword.scss'
class ForgotPassword extends Component {
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


    render() {

        let { language } = this.props;
        console.log("hoang check state: ", this.state)
        return (
            <div className='background'>
                <div className='content-up container'>
                    XIN CHÀO HOÀNG IU DẤU!
                </div>

            </div>


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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
