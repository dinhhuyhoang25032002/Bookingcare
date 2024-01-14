import React, { Component } from 'react';
import { connect } from 'react-redux';


class AboutVideo extends Component {


    render() {
        return (
            <div className='section-share section-about-video'>
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <div className='title-specialty'><b>Truyền thông nói gì về HomeCare</b></div>
                    </div>
                    <div className='specialty-body section-about-video'>
                        <div className='content-left'>
                            <iframe width="568"
                                height="320"
                                src="https://www.youtube.com/embed/FyDQljKtWnI"
                                title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className='content-right'>
                            <div className='section-customize'>
                                <a target='_blank' rel="noreferrer" href='https://video.vnexpress.net/cuoc-song-4-0/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html'>
                                    <div className='bg-image section-about-video image1'></div>
                                </a>

                            </div>
                            <div className='section-customize'>
                                <a target='_blank' rel="noreferrer" href='https://vtc.vn/dat-kham-chuyen-khoa-va-hanh-trinh-ho-tro-cac-benh-vien-qua-tai-ar434101.html'>
                                    <div className='bg-image section-about-video image2'></div>
                                </a>

                            </div>
                            <div className='section-customize'>
                                <a target='_blank' rel="noreferrer" href='https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-169153232.htm'>
                                    <div className='bg-image section-about-video image3'></div>
                                </a>

                            </div>
                            <div className='section-customize'>
                                <a target='_blank' rel="noreferrer" href='https://vtv.vn/video/ca-phe-khoi-nghiep-21-02-2018-282723.htm'>
                                    <div className='bg-image section-about-video image4'></div>
                                </a>
                            </div >
                        </div>
                    </div >


                </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutVideo);
