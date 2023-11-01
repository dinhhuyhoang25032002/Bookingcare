import React, { Component } from 'react';
import { connect } from "react-redux";
import { Modal } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import './Bookingcare.scss'
import ProfileDoctor from '../ProfileDoctor';
import { getProfileDoctorById, postPatientBookingInfor } from '../../../../../src/services/userService'
import _ from 'lodash'
import { NumericFormat } from 'react-number-format';
import { LANGUAGES } from '../../../../utils';
import DatePicker from '../../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import moment from 'moment';
import localization from 'moment/locale/vi';



{/* <input placeholder={intl.formatMessage({ id: "messageId" })} /> */ }


class Bookingcare extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
            fullNamePatient: '',
            phoneNumber: '',
            dateOfBirth: '',
            address: '',
            gender: '',
            bookingMethod: '',
            reson: '',
            support: '',
            //  payment: true,
            email: '',
            doctorID: '',
            timeType: '',
            doctorName: ''
        }
    }
    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
        if (prevProps.dataDoctorSchedule !== this.props.dataDoctorSchedule) {
            // this.getFrofileDoctor(this.props.doctorID)
            let { dataDoctorSchedule } = this.props;
            let doctorID = '';
            doctorID = dataDoctorSchedule && !_.isEmpty(dataDoctorSchedule) ? dataDoctorSchedule.doctorID : '-1';
            let data = await this.getFrofileDoctor(doctorID)
            //   console.log('hoang check response: ', data)
            this.setState({
                dataProfile: data,
                doctorID: doctorID,
                timeType: dataDoctorSchedule.timeType,
            })
        }
    }

    getFrofileDoctor = async (id) => {
        let result = {};
        if (id) {
            let response = await getProfileDoctorById(id)
            //   console.log('hoang check response: ', response)
            if (response && response.errCode === 0) {
                result = response.data;
            }

        }
        return result;
    }


    handleOnchangeInputValue = (event, id) => {
        let dataInput = event.target.value;

        let stateCopy = { ...this.state }
        stateCopy[id] = dataInput;
        this.setState({
            ...stateCopy
        })
    }



    handleOnchangDatePicker = (date) => {
        this.setState({
            dateOfBirth: date[0],
        })
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    builDataTime = (dataDoctorSchedule) => {
        let { language } = this.props;
        if (dataDoctorSchedule && !_.isEmpty(dataDoctorSchedule)) {
            let date = language === LANGUAGES.VI ? moment.unix(+dataDoctorSchedule.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+dataDoctorSchedule.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            let today = this.capitalizeFirstLetter(date)
            // console.log("hoang check time:", dataDoctorSchedule.timeTypeData)
            let time = dataDoctorSchedule.timeTypeData && dataDoctorSchedule.timeTypeData.valueVi
                && language === LANGUAGES.VI ? dataDoctorSchedule.timeTypeData.valueVi : dataDoctorSchedule.timeTypeData.valueEn
            return (

                `${time} - ${today}`


            )
        } return ``

    }

    builDoctorNameBooking = (dataDoctorSchedule) => {
        let { language } = this.props;
        if (dataDoctorSchedule && !_.isEmpty(dataDoctorSchedule)) {
            let doctorName = language === LANGUAGES.VI?
                `${dataDoctorSchedule.doctorProfile.firstName} ${dataDoctorSchedule.doctorProfile.lastName}`
                :
                `${dataDoctorSchedule.doctorProfile.lastName} ${dataDoctorSchedule.doctorProfile.firstName}`

            return doctorName;

        }
        return 

    }
    
   
    submitPatientBookingInfor = async () => {
        let date = new Date(this.state.dateOfBirth).getTime();
        // console.log('check data time: ', this.state, date);
        let { language } = this.props;
        let dataTime = this.builDataTime(this.props.dataDoctorSchedule)
        let doctorName = this.builDoctorNameBooking(this.props.dataDoctorSchedule)
        //  toast.error('Medical examination appointment failed'
        let response = await postPatientBookingInfor({
            fullNamePatient: this.state.fullNamePatient,
            phoneNumber: this.state.phoneNumber,
            dateOfBirth: date,
            address: this.state.address,
            gender: this.state.gender,
            bookingMethod: this.state.bookingMethod,
            reson: this.state.reson,
            support: this.state.support,
            email: this.state.email,
            doctorID: this.state.doctorID,
            timeType: this.state.timeType,
            doctorName: doctorName,
            language: this.props.language,
            dataTime: dataTime,
            //  doctorName:this
        })

        // console.log('hoang check doctorname')
        if (response && response.errCode === 0) {
            {
                language === LANGUAGES.VI ? toast.success('Bạn đã đăng kí lịch khám thành công, chúng thôi sẽ phản hồi lại sớm nhất') :
                    toast.success('You have successfully scheduled a medical appointment. We will provide feedback as soon as possible');
            }
            this.props.closeModalDoctorSchedule();
            this.setState({
                fullNamePatient: '',
                phoneNumber: '',
                dateOfBirth: '',
                address: '',
                gender: '',
                bookingMethod: '',
                reson: '',
                support: '',
                //  payment: true,
                email: '',
                doctorID: '',
                timeType: '',
            })
        } else {
            let date = new Date(this.state.dateOfBirth).getTime();
            this.setState({
                fullNamePatient: this.state.fullNamePatient,
                phoneNumber: this.state.phoneNumber,
                dateOfBirth: date,
                address: this.state.address,
                gender: this.state.gender,
                bookingMethod: this.state.bookingMethod,
                reson: this.state.reson,
                support: this.state.support,
                email: this.state.email,
                doctorID: this.state.doctorID,
                timeType: this.state.timeType
            })

        }
        {
            language === LANGUAGES.VI ? toast.error('Bạn đang nhập thiếu dữ liệu đầu vào, Hãy kiểm tra lại!') :
                toast.error("You are entering incomplete input data. Please check again")
        }

    }

    render() {
        let { dataProfile, } = this.state;
        let { isshowModal, closeModalDoctorSchedule, language, dataDoctorSchedule } = this.props;
        console.log('check data time: ', dataDoctorSchedule);

        return (
            <Modal
                isOpen={isshowModal}
                toggle={closeModalDoctorSchedule}
                className='bookingcare-modal-container'
                centered
                size='lg'
            >
                <div className='bookingcare-content'>
                    <div className='bookingcare-header'>
                        <div className='logo-image'></div>
                        <span>
                            <i className="fas fa-times"
                                onClick={closeModalDoctorSchedule}
                            ></i>
                        </span>
                    </div>

                    <div className='bookingcare-body'>
                        <h3><FormattedMessage id='patient.modal-booking.title-booking' /></h3>
                        <ProfileDoctor
                            dataProfile={dataProfile}
                            isShowDescription={false}
                            dataDoctorSchedule={dataDoctorSchedule}
                        />

                        <div className='row'>
                            <div className='format-item col-6 form-group'>
                                <i className="fas fa-user"></i>
                                <input
                                    value={this.state.fullNamePatient}
                                    onChange={(event) => this.handleOnchangeInputValue(event, 'fullNamePatient')}
                                    placeholder={language === LANGUAGES.VI ? 'Họ và tên bệnh nhân (bắt buộc)' : "Patient's full name (mandatory)"}
                                    className='form-control uptext'>
                                </input>
                            </div>
                            <div className='format-item col-6 form-group'>
                                <i className="fas fa-phone-volume"></i>
                                <input
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnchangeInputValue(event, 'phoneNumber')}
                                    placeholder={language === LANGUAGES.VI ? 'Số điện thoại liên hệ (bắt buộc)' : 'Contact phone number (mandatory)'}
                                    className='form-control uptext' />
                            </div>
                            <div className='format-item col-6 form-group'>
                                <i class="fa fa-envelope" aria-hidden="true"></i>
                                <input
                                    value={this.state.email}
                                    onChange={(event) => { this.handleOnchangeInputValue(event, 'email') }}
                                    placeholder={language === LANGUAGES.VI ? 'Địa Chỉ Email (Bắt Buộc)' : 'Emai Address(Mandatory'}
                                    className='form-control ' />
                            </div>
                            <div className='format-item col-6 form-group'>
                                <i className="fas fa-map-marker-alt"></i>
                                <input
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnchangeInputValue(event, 'address')}
                                    placeholder={language === LANGUAGES.VI ? 'Địa chỉ liên hệ (bắt buộc)' : 'Contact address (mandatory)'}
                                    className='add-input form-control uptext' />
                            </div>
                            <div className='gender col-6 form-group'>

                                <div className="container dateofbirth">
                                    <input name='gender'
                                        value="M"
                                        onChange={(event) => this.handleOnchangeInputValue(event, 'gender')}
                                        type="radio" />
                                    <span className="checkmark"><FormattedMessage id="patient.modal-booking.male" /></span>
                                </div>
                                <div className="container dateofbirth">
                                    <input name='gender' type="radio"
                                        value="F"
                                        onChange={(event) => this.handleOnchangeInputValue(event, 'gender')}
                                    />
                                    <span className="checkmark"><FormattedMessage id="patient.modal-booking.female" /></span>
                                </div>
                                <DatePicker
                                    className='form-control date-birth'
                                    onChange={this.handleOnchangDatePicker}
                                    value={this.state.dateOfBirth}
                                    placeholder={language === LANGUAGES.VI ? 'Ngày/Tháng/Năm Sinh (Bắt Buộc)' : 'Date Of Birth (Mandatory)'}
                                />
                            </div>
                            <div className='gender bookfor col-6 form-group'>
                                <div className="container">
                                    <input name='bookingMethod' type="radio"
                                        value="ONL"
                                        onChange={(event) => this.handleOnchangeInputValue(event, 'bookingMethod')}
                                    />
                                    <span className="checkmark"><FormattedMessage id="patient.modal-booking.booking-online" /></span>
                                </div>
                                <div className="container">
                                    <input name='bookingMethod' type="radio"
                                        value="OFF"
                                        onChange={(event) => this.handleOnchangeInputValue(event, 'bookingMethod')}
                                    />
                                    <span className="checkmark"><FormattedMessage id="patient.modal-booking.booking-offline" /></span>
                                </div>

                            </div>
                            <div className='col-12 reson-examination form-group'>
                                <i className="fas fa-plus-circle"></i>
                                <input
                                    value={this.state.reson}
                                    onChange={(event) => this.handleOnchangeInputValue(event, 'reson')}
                                    placeholder={language === LANGUAGES.VI ? 'Lí Do Khám' : 'Purpose Of Medical Visit'}
                                    className='form-control'></input>
                            </div>
                            <div className='format-instance'>
                                <div className='gender private-insurance col-12 form-group'>
                                    <div className="container-insurance ">
                                        <input name='support' type="radio"
                                            value="PER"
                                            onChange={(event) => this.handleOnchangeInputValue(event, 'support')}
                                        />
                                        <span className="checkmark"><FormattedMessage id="patient.modal-booking.insurance" /></span>
                                    </div>
                                    <div className="container-insurance">
                                        <input name='support' type="radio"
                                            value="ASI"
                                            onChange={(event) => this.handleOnchangeInputValue(event, 'support')}
                                        />
                                        <span className="checkmark"><FormattedMessage id="patient.modal-booking.sociation" /></span>
                                    </div>
                                </div>
                                <div className='format-payment col-6 form-group'>
                                    <label><FormattedMessage id="patient.modal-booking.payment-method" /></label>
                                    <div class="container">
                                        <input className='input-select' type="radio"

                                            onChange={(event) => this.handleOnchangeInputValue(event, 'payment')}
                                        />
                                        <span className="checkmark">
                                            <FormattedMessage id="patient.modal-booking.later" />
                                            {dataProfile && dataProfile.Doctor_infor && dataProfile.Doctor_infor.priceData
                                                && dataProfile.Doctor_infor.priceData.valueVi && language === LANGUAGES.VI && <NumericFormat
                                                    value={dataProfile.Doctor_infor.priceData.valueVi}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix=' VND' />
                                            }
                                            {
                                                dataProfile && dataProfile.Doctor_infor && dataProfile.Doctor_infor.priceData
                                                && dataProfile.Doctor_infor.priceData.valueVi && language === LANGUAGES.EN &&
                                                <NumericFormat
                                                    value={dataProfile.Doctor_infor.priceData.valueEn}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix=' $' />
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bookingcare-footer'>
                        <button
                            onClick={() => this.submitPatientBookingInfor()}
                            className=' button-submit active'
                        >
                            <FormattedMessage id="patient.modal-booking.btn-submit" />
                        </button>
                    </div>
                </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Bookingcare);
