import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeAbout.scss'
//import Slider from 'react-slick';



class HomeAbout extends Component {


    render() {

        return (
            <div className='container-home-about'>
                <div className='content-home-about'>
                    <div className='content-left'>
                        <div className='name-company text'>
                            Công ty Cổ phần Công nghệ HomeCare
                        </div>
                        <div className='collect-item'>
                            <div className='icon'>
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div className='text'>
                                Số 113 Thanh Bình Mộ Lao Hà Đông Hà Nội.
                            </div>
                        </div>
                        <div className='collect-item'>
                            <div className='icon'>
                                <i className="far fa-bookmark"></i>
                            </div>
                            <div className='text'>
                                ĐKKD số. 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
                            </div>
                        </div>
                        <div className='collect-item'>
                            <div className='icon'>
                                <i className="fas fa-phone"></i>
                            </div>
                            <div className='text'>
                                024-7301-2468 (7h30 - 18h)
                            </div>
                        </div>
                        <div className='collect-item'>
                            <div className='icon'>
                                <i className="far fa-envelope"></i>
                            </div>
                            <div className='text'>
                                support@bookingcare.vn (7h30 - 18h)
                            </div>
                        </div>
                        <div className='collect-item'>
                            <div className='icon'>
                                <i className="fab fa-facebook-square"></i>
                            </div>
                            <div className='text'>
                                <a target='_.blank' rel="noreferrer" href='https://www.facebook.com/profile.php?id=61555318416572'>Đặt lịch khám bệnh Homecare</a>
                            </div>
                        </div>
                        <div className='name-company text'>
                            Văn phòng tại TP Hồ Chí Minh
                        </div>
                        <div className='collect-item'>
                            <div className='icon'>
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div className='text'>
                                Số 01, Hồ Bá Kiện, Phường 15, Quận 10
                            </div>
                        </div>
                        <div className='collect-image'>
                            <div className='image'>

                            </div>
                            <div className='image'>

                            </div>
                        </div>

                    </div>

                    <div className='content-center'>
                        <div className='header-logo'>
                        </div>
                        <div className='text text1'>
                            Tuyển dụng
                        </div>
                        <div className='text text1'>
                            Chính sách bảo mật
                        </div>
                        <div className='text text1'>
                            Quy chế hoạt động
                        </div>
                        <div className='text text1'>
                            Liên hệ hợp tác
                        </div>
                        <div className='text text1'>
                            Điều khoản sử dụng
                        </div>
                        <div className='text text1'>
                            Câu hỏi thường gặp
                        </div>
                        <div className='image-download'>

                        </div>
                    </div>
                    <div className='content-right'>
                        <div className='collect-item'>
                            <div className='image-logo-1 image'>

                            </div>
                            <div className='collect-text '>
                                <div className='text-up name-company text'>
                                    Hello Doctor
                                </div>
                                <div className='text'>
                                    Bảo trợ chuyên mục nội dung "sức khỏe tinh thần"
                                </div>
                            </div>
                        </div>
                        <div className='collect-item'>
                            <div className='image-logo-2 image'>

                            </div>
                            <div className='collect-text'>
                                <div className='text-up name-company text'>
                                    Hệ thống y khoa chuyên sâu quốc tế Bernard
                                </div>
                                <div className='text '>
                                    Bảo trợ chuyên mục nội dung "y khoa chuyên sâu"
                                </div>
                            </div>
                        </div>
                        <div className='collect-item'>
                            <div className='image-logo-3 image'>

                            </div>
                            <div className='collect-text'>
                                <div className='text-up name-company text'>
                                    Doctor Check - Tầm Soát Bệnh Để Sống Thọ Hơn
                                </div>
                                <div className='text'>
                                    Bảo trợ chuyên mục nội dung "sức khỏe tổng quát"
                                </div>


                            </div>
                        </div>

                    </div>
                </div>

                <div className='section-cright'>
                    <div className='section-home-about'>
                        <div><b>&copy; 2024</b>     Contact or Review HomeCare's Services.

                        </div>
                    </div>
                    <div className='collect-item'>
                        <div className='facebook-logo'>

                        </div>
                        <div className='tiktok-logo'>

                        </div>
                        <div className='instagram-logo'>

                        </div>
                    </div>
                </div>

            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeAbout);
