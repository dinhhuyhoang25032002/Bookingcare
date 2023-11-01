import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
class MedicalFacility extends Component {

    render() {

        return (
            <div className='section-share section-medical-facility'>
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <div className='title-specialty'><b>Cở sở y tế nổi bật</b></div>
                        <button className='btn-specialty'> TÌM KIẾM</button>
                    </div>
                    <div className='specialty-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <span className='text-title'>Phòng khám Bệnh viện Đại học Y Dược 1</span>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <span className='text-title'>Trung tâm xét nghiệm Diag Laboratories</span>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <span className='text-title'>Hệ thống Y tế Thu Cúc TCI</span>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <span className='text-title'>Bệnh viện Đa khoa An Việt</span>
                            </div >
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <span className='text-title'>Hệ thống Y tế Thu Cúc TCI</span>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'></div>
                                <span className='text-title'>Hệ thống Y tế Thu Cúc TCI</span>
                            </div>
                        </Slider>


                    </div >


                </div >
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
