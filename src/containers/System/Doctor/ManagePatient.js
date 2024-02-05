import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor } from '../../../services/userService'
import moment from 'moment'
import ModalAccessPatient from '../../../containers/System/Doctor/ModalAccessPatient'
import _ from 'lodash'
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isShowConnect: true,
            isShowModal: false,
            patientInfor: {}
        }
    }
    async componentDidMount() {
        this.getListPatient()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    getListPatient = async () => {
        let { currentDate } = this.state;
        let userInfor = this.props.userInfo
        let formatDate = new Date(currentDate).getTime()
        if (userInfor && userInfor.id && formatDate) {
            let response = await getAllPatientForDoctor({
                doctorID: userInfor.id,
                date: formatDate
            })

            if (response && response.errCode === 0 && response.data) {
                this.setState({
                    dataPatient: response.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    handleOnchangDatePicker = async (date) => {
        this.setState({
            currentDate: date[0],
        }, () => {
            this.getListPatient()
        })
    }

    handleOnClickConnectPhone = () => {
        this.setState({
            isShowConnect: false
        })
    }

    handleOnClickConnectEmail = () => {
        this.setState({
            isShowConnect: true
        })
    }
    handlesendSendInvoice = (data) => {
        console.log('dasdasds',data);
    }

    handleAccept = (item) => {

        let data = {
            doctorID: item.doctorID,
            patientID: item.patientID,
            patientEmail: item.patientData.email,
            patientFullName: item.patientData.firstName,
            patientGender: item.patientData.genderData.valueVi,
            patientAddress: item.patientData.address,
            method: item.mepData.valueVi,
            timeType: item.timeTypeData.valueVi
        }
        // console.log('hoanG check data: ', data)
        this.setState({
            isShowModal: !this.state.isShowModal,
            patientInfor: data
        })
    }
    closeModal = () => {
        this.setState({
            isShowModal: !this.state.isShowModal,

        })
    }
    render() {

        let { language } = this.props;
        // let x = new Date().getTime()
        let { currentDate, dataPatient, isShowConnect, isShowModal, patientInfor } = this.state;

        //  console.log("hoang check state: ", date)
        return (
            <>
                <div className='container-list-patient '>
                    <div className='body-list-patient'>
                        <div className='manage-patient-title text-center'>
                            <FormattedMessage id='menu.doctor.manage-patient' />
                        </div>
                        <div className='manage-patient-content row '>
                            <div className='col-4 form-group mb-4'>
                                <label className='mb-2'>Chọn ngày khám bệnh</label>
                                <DatePicker
                                    className='form-control curent-date'
                                    onChange={this.handleOnchangDatePicker}
                                    value={currentDate}
                                //  placeholder={language === LANGUAGES.VI ? 'Ngày/Tháng/Năm Sinh (Bắt Buộc)' : 'Date Of Birth (Mandatory)'}
                                />
                            </div>
                            <table className="table table-warning">
                                <thead>
                                    <tr>
                                        <th scope="col-1" className='text-center'>STT</th>
                                        <th scope="col-3" className='text-center'> Họ và tên</th>
                                        <th scope="col-1" className='text-center'>Giới tính</th>
                                        <th scope="col-2" className='text-center'>Địa chỉ</th>
                                        <th scope="col-3" className='text-center'>Phương thức khám bệnh</th>
                                        <th scope="col-3" className='text-center'>Thời gian khám bệnh</th>
                                        <th scope="col-2" className='text-center'>Phương thức liên lạc</th>
                                        <th scope="col-3" className='text-center width-size'>Thông tin chi tiết</th>
                                        <th scope="col-3" className='text-center '>Tiến trình</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataPatient && dataPatient.length > 0 && dataPatient.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row" className='text-center'>{index + 1}</th>
                                                <td className='text-center'>{item.patientData.firstName}</td>
                                                <td className='text-center'>{item.patientData.genderData.valueVi}</td>
                                                <td className='text-center'>{item.patientData.address}</td>
                                                <td className='text-center'>{item.mepData.valueVi}</td>
                                                <td className='text-center'>{item.timeTypeData.valueVi}</td>


                                                <td className='collect-item' >
                                                    <button
                                                        className={isShowConnect === true ? 'logo-email image active ' : 'logo-email image'}
                                                        onClick={() => { this.handleOnClickConnectEmail() }}
                                                    >
                                                    </button>
                                                    <button
                                                        className={isShowConnect === false ? 'logo-phone image active' : 'logo-phone image'}
                                                        onClick={() => { this.handleOnClickConnectPhone() }}
                                                    >
                                                    </button>
                                                </td>


                                                {isShowConnect === true ?
                                                    <td className='text-center width-size'>{item.patientData.email}</td>
                                                    :
                                                    <td className='text-center width-size' >{item.patientData.phoneNumber}</td>}

                                                <td className='collect-button'>
                                                    <button
                                                        className='btn btn-primary'
                                                        onClick={() => { this.handleAccept(item) }}
                                                    >
                                                        Xác nhận
                                                    </button>
                                                    {/* 
                                                    <button
                                                        className='btn btn-success'

                                                    >
                                                        Gửi hóa đơn
                                                    </button> */}
                                                </td>
                                            </tr>
                                        )
                                    })

                                    }
                                </tbody>
                            </table>
                        </div >
                    </div>
                    <ModalAccessPatient
                        isShowModal={isShowModal}
                        closeModal={this.closeModal}
                        patientInfor={patientInfor}
                        currentDate={currentDate}
                        getListPatient={this.getListPatient}
                       // handlesendSendInvoice={this.handlesendSendInvoice}
                    />

                </div>

            </>

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
