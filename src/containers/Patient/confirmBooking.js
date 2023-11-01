import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../src/utils';
import { FormattedMessage } from 'react-intl';
import { postConfirmPatientBookingInfor } from '../../services/userService'
import HomeHeader from '../HomePage/HomeHeader';
import './confirmBooking.scss'
import { Modal } from 'reactstrap';
class confirmBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmStatus: false,
            errCode: 0,
            isShowModal: true,
        }
    }
    async componentDidMount() {
        //  console.log('check all props: ', this.props)
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorID = urlParams.get('doctorID');

            let response = await postConfirmPatientBookingInfor({
                doctorID: doctorID,
                token: token
            })
            console.log('resdjfasd: ', response.errCode)
            if (response && response.errCode === 0) {
                this.setState({
                    confirmStatus: true,
                    errCode: response.errCode
                })
            } else {
                this.setState({
                    confirmStatus: true,
                    errCode: response && response.errCode ? response.errCode : -1
                })
            }
        }

        // console.log('hoang check token', token, doctorID)
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    closeModal = () => {
        this.setState({
            isShowModal: false,
        })
    }
    render() {

        let { language } = this.props;
        let { errCode, confirmStatus, isShowModal } = this.state;
        console.log("hoang check state: ", this.state)
        return (
            <>
                <HomeHeader />

                {/* <div className='confirm-booking container'> */}
                <div className='confirm-booking '>  </div>
                <Modal
                    isOpen={isShowModal}
                    toggle={this.closeModal}
                    className='bookingcare-modal container'
                    centered
                    size='lg'
                > <div className='bookingcare-header'>
                        <div className='logo-image'></div>
                        <span>
                            <i className="fas fa-times"
                                onClick={this.closeModal}
                            ></i>
                        </span>
                    </div>
                    {errCode === 0 ?
                        <div className='confirm-booking-content'>
                            <div className='title'>Bookingcare cam kết đặt sức khỏe người bệnh <br></br>và chất lượng phục vụ lên hàng đầu.</div>

                            <div className='confirm-title'>Bạn đã xác nhận thành công lịch khám bệnh. Hệ thống đã xác thực lịch khám</div>
                            <div className='note-doctor'>
                                <i className="fas fa-plus-circle"></i>
                                <input
                                    className='form-control '
                                    placeholder='Một số lưu ý cho bác sĩ?'
                                ></input></div>

                            <div className='note-client'><b>Lưu ý cho khách hàng:</b></div>
                            <div className='number-phone'>* Khách hàng có thể hủy lịch khám đã đặt bằng hotline của Bookingcare <label>(022-6666-9999)</label>.</div>
                            <div>* Khách hàng có thể đặt lại lịch khám với bác sĩ. </div>
                            <div>* Booking care có trách nhiệm tiếp nhận phản hồi, khiếu nại và hỗ trợ khách hàng liên quan đến việc sử dụng dịch vụ tại <a href='Bookingcare.vn'> Bookingcare.com.</a>.</div>
                            <div>* Khách hàng tự ý hủy dịch vụ 2 lần liên tiếp, Bookingcare có thể cân nhắc không tiếp tục hỗ trợ dịch vụ.</div>
                            <div className='thank-for'> Chân trọng cảm ơn bạn đã phản hồi lại !!!</div>
                        </div>
                        :
                        <div className='confirm-booking-content'>
                            <div className='title'>Bookingcare cam kết đặt sức khỏe người bệnh <br></br>và chất lượng phục vụ lên hàng đầu.</div>
                            <div className='confirm-title'>Có vẻ như bạn đã không đặt thành công lịch khám bệnh hoặc lịch khám đã tồn tại. <br></br>Hệ thống không thể xác nhận lịch hẹn của bạn.</div>
                            <div><b>Một số giải pháp Bookingcare dành cho bạn:</b></div>
                            <div>* Bạn có thể đặt lại lịch khám tại <a href='Bookingcare.vn'>Bookingcare.com</a>.
                            </div>
                            <div>* Gọi trực tiếp đến hotline của Bookingcare <label>(022-6666-9999)</label> để được trợ giúp trực tiếp từ bộ phận CSKH nếu không nhận được phản hồi nào trong 2 giờ kế tiếp.</div>
                            <div className='note-client note'><b>Lưu ý cho khách hàng:</b></div>
                            <div className='number-phone'>* Khách hàng có thể hủy lịch khám đã đặt bằng hotline của Bookingcare <label>(022-6666-9999)</label>.</div>
                            <div>* Khách hàng có thể đặt lại lịch khám với bác sĩ. </div>
                            <div>* Booking care có trách nhiệm tiếp nhận phản hồi, khiếu nại và hỗ trợ khách hàng liên quan đến việc sử dụng dịch vụ tại <a href='Bookingcare.vn'> Bookingcare.com.</a>.</div>
                            <div>* Khách hàng tự ý hủy dịch vụ 2 lần liên tiếp, Bookingcare có thể cân nhắc không tiếp tục hỗ trợ dịch vụ.</div>
                            <div className='thank-for'> Chân trọng và Xin lỗi bạn nếu sự cố đến từ Bookingcare !!!</div>
                        </div>
                    }

                </Modal>




            </>

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

export default connect(mapStateToProps, mapDispatchToProps)(confirmBooking);
