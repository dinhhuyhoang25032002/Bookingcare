import React, { Component } from 'react';
import { connect } from "react-redux";
import { Modal } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import './ModalAccessPatient.scss'
import _ from 'lodash'
import { CommonUtils } from '../../../utils'
import { LANGUAGES } from '../../../../src/utils';
import { postMedicineBill } from '../../../services/userService'
import { toast } from 'react-toastify';

{/* <input placeholder={intl.formatMessage({ id: "messageId" })} /> */ }


class ModalAccessPatient extends Component {


    constructor(props) {
        super(props);
        this.state = {
            updateImage: '',
            email: ''
        }
    }
    async componentDidMount() {
        if (this.props.patientInfor) {
            this.setState({
                email: this.props.patientInfor.patientEmail
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.patientInfor !== this.props.patientInfor) {
            this.setState({
                email: this.props.patientInfor.patientEmail
            })
        }
    }

    handleUpdateImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            // console.log('chech data image: ', base64)
            //   let objectUrl = URL.createObjectURL(file);
            this.setState({
                //updateImage: objectUrl,
                updateImage: base64
            })
        }
    }
    handleOnchangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleSendData = async () => {
        let today = new Date()
        let day = today.getDate() > 9 ? `${today.getDate()}` : `0${today.getDate()}`;
        let month = today.getMonth() + 1 > 9 ? `${today.getMonth() + 1}` : `0${today.getMonth() + 1}`
        let date = `${day}/${month}/${today.getFullYear()}`;
        let { getListPatient } = this.props;
        let userInfo = this.props.userInfo
        let doctorName = `${userInfo.firstName} ${userInfo.lastName}`
        let data = {
            doctorName: doctorName,
            email: this.state.email,
            image: this.state.updateImage,
            patientInfor: this.props.patientInfor,
            date: this.props.currentDate,
            dateSendEmail:date,
            language: this.props.language
        }
        let res = await postMedicineBill(data)
        if(res && res.errCode === 0){
            toast.success(res.Message)
            await this.props.getListPatient()
            this.props.closeModal()
        }else{
            toast.error('Send Medicine Bill Failed !')
        }
       

    }
    render() {
        let { closeModal, isShowModal, patientInfor } = this.props;

        return (
            <Modal
                isOpen={isShowModal}
                toggle={closeModal}
                className='size-modal'
                centered
            //  size= '600'
            >
                <div className='container-modal-access-patient'>
                    <div className='content-modal-access-patient'>
                        <div className='header-modal-access-patient'>
                            <div className='logo'>

                            </div>


                            <div className='button-close-modal'>
                                <button className='btn-close-modal'
                                    onClick={closeModal}>
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className='body-modal-access-patient '>

                            <div className='patient-infor row'>
                                <div className='title-confirm text-center col-12 mb-3'>
                                    <b>Thông tin khám bệnh</b>
                                </div>
                                <div className='email-patient col-6 '>
                                    <label className="form-label">Emai</label>
                                    <input className='form-control' type='email'
                                        value={this.state.email}
                                        onChange={(event) => { this.handleOnchangeEmail(event) }}
                                    >

                                    </input>
                                </div>
                                <div className='full-name-patient col-6'>
                                    <label className="form-label">Họ và tên</label>
                                    <input className='form-control'
                                        value={patientInfor && patientInfor.patientFullName ? patientInfor.patientFullName : ''}>

                                    </input>
                                </div>
                                <div className='gender-patinet col-2 '>
                                    <label className="form-label">Giới tính</label>
                                    <input className='form-control'
                                        value={patientInfor && patientInfor.patientGender ? patientInfor.patientGender : ''}>
                                    </input>
                                </div>
                                <div className='address-patinet col-4'>
                                    <label className="form-label">Địa chỉ</label>
                                    <input className='form-control'
                                        value={patientInfor && patientInfor.patientAddress ? patientInfor.patientAddress : ''}>
                                    </input>
                                </div>
                                <div className='method col-6'>
                                    <label className="form-label">Phương thức khám bệnh</label>
                                    <input className='form-control'
                                        value={patientInfor && patientInfor.method ? patientInfor.method : ''}>
                                    </input>
                                </div>
                                <div className='method col-6'>
                                    <label className="form-label">Thời gian khám bệnh</label>
                                    <input className='form-control' value={patientInfor && patientInfor.timeType ? patientInfor.timeType : ''}>
                                    </input>
                                </div>
                                <div className='method col-6'>
                                    <div class="mb-3">
                                        <label for="formFile" class="form-label">Hóa đơn khám bệnh</label>
                                        <input class="form-control" type="file" id="formFile"
                                            onChange={(event) => { this.handleUpdateImage(event) }}
                                        />
                                    </div>
                                </div>
                                <div className='text-center mb-3 mt-3'>
                                    Bác sĩ Vũ Ngọc Anh Thư đã xác nhận !
                                </div>
                            </div>
                        </div>
                        <div className='footer-modal-access-patient mt-3'>
                            <button className='btn btn-primary'
                                onClick={() => { this.handleSendData() }}
                            >
                                Xác nhận
                            </button>
                            <button className='btn btn-secondary'
                                onClick={closeModal}
                            >
                                Trở lại
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalAccessPatient);
