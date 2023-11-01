import React, { Component } from 'react';
import { connect } from "react-redux";
import './ExtraDoctorInfor.scss'
import { LANGUAGES } from '../../../utils';
import { getExtraDoctorInfor } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
import { NumericFormat } from 'react-number-format';
class ExtraDoctorInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowInfor: false,
            extraDoctorInfor: {},
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
        if (prevProps.inforDoctorFromParent !== this.props.inforDoctorFromParent) {
            let doctorID = this.props.inforDoctorFromParent
            let response = await getExtraDoctorInfor(doctorID);
            if (response && response.errCode === 0) {
                this.setState({
                    extraDoctorInfor: response.data,
                })
            }

        }

    }

    

    handleShowDoctorInfor = (status) => {
        this.setState({
            isShowInfor: status
        })
    }

    render() {
        let { isShowInfor, extraDoctorInfor } = this.state;
        let { language } = this.props;
       // console.log("hoang check state: ", this.state)
        return (
            <div className='extra-doctor-infor-container'>
                <div className='content-up'>
                    <div className='text-address'><FormattedMessage id = 'patient.extra-doctor-infor.address-clinic'/></div>
                    <div className='name-clinic'>
                        <span>
                            {extraDoctorInfor && extraDoctorInfor.nameClinic ? extraDoctorInfor.nameClinic : ''}
                        </span>
                    </div>
                    <div className='address-clinic'>
                        <span>
                            {extraDoctorInfor && extraDoctorInfor.addressClinic ? extraDoctorInfor.addressClinic : ''}
                        </span>
                    </div>
                </div>
                <div className='content-down'>
                    {isShowInfor === false ?
                        <>
                            <div className='consultation-fee'><FormattedMessage id = 'patient.extra-doctor-infor.consultation-fee'/>
                                {
                                    extraDoctorInfor && extraDoctorInfor.priceData && extraDoctorInfor.priceData.valueVi
                                    && language === LANGUAGES.VI &&
                                    <NumericFormat
                                        value={extraDoctorInfor.priceData.valueVi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix=' VND' />
                                }
                                {
                                    extraDoctorInfor && extraDoctorInfor.priceData && extraDoctorInfor.priceData.valueVi
                                    && language === LANGUAGES.EN &&
                                    <NumericFormat
                                        value={extraDoctorInfor.priceData.valueEn}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix='$' />
                                }
                                .
                                <span className='view-detail' onClick={() => { this.handleShowDoctorInfor(true) }}><FormattedMessage id = 'patient.extra-doctor-infor.show-fee-detailt'/></span>
                            </div>
                        </> :
                        <>
                            <div className='text-content-down'></div>
                            <div className='text-fee'><FormattedMessage id = 'patient.extra-doctor-infor.consultation-fee'/></div>
                            <div className='consultation-fee-isShow'>
                                <div className='fee-isShow'>
                                    <b> <span><FormattedMessage id = 'patient.extra-doctor-infor.consultation-fee'/></span></b>
                                    <span>
                                        {
                                            extraDoctorInfor && extraDoctorInfor.priceData && extraDoctorInfor.priceData.valueVi
                                            && language === LANGUAGES.VI &&
                                            <NumericFormat
                                                value={extraDoctorInfor.priceData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix='VND' />
                                        }
                                        {
                                            extraDoctorInfor && extraDoctorInfor.priceData && extraDoctorInfor.priceData.valueVi
                                            && language === LANGUAGES.EN &&
                                            <NumericFormat
                                                value={extraDoctorInfor.priceData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix='$' />
                                        }
                                    </span>

                                </div>


                                <div className='note'>
                                    <span>
                                        {extraDoctorInfor && extraDoctorInfor.note && language === LANGUAGES.VI && extraDoctorInfor.note}     
                                        {extraDoctorInfor && extraDoctorInfor.note && language === LANGUAGES.EN && <FormattedMessage id = 'patient.extra-doctor-infor.note-detail'/>}
                                    </span>
                                </div>
                            </div>
                            <div className='payment-detail'>
                                <span className='valueVi'>{extraDoctorInfor && extraDoctorInfor.paymentData && language === LANGUAGES.VI && extraDoctorInfor.paymentData.valueVi}
                                </span>
                                <span className='valueEn'>{extraDoctorInfor && extraDoctorInfor.paymentData && language === LANGUAGES.EN && extraDoctorInfor.paymentData.valueEn}
                                </span>
                            </div>
                            <div className='hide-price-list'><span onClick={() => { this.handleShowDoctorInfor(false) }}><FormattedMessage id = 'patient.extra-doctor-infor.hide-fee-detailt'/> </span></div>
                        </>
                    }



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

export default connect(mapStateToProps, mapDispatchToProps)(ExtraDoctorInfor);
