import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from 'react-slick';



class Specialty extends Component {


    render() {

        return (
            <div className='section-share section-specialty'>
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <div className='title-specialty'><b>Chuyên khóa phổ biến</b></div>
                        <button className='btn-specialty'> XEM THÊM</button>
                    </div>
                    <div className='specialty-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'></div>
                                <span className='text-title'>Cơ xương khớp</span>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'></div>
                                <span className='text-title'>Thần kinh</span>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'></div>
                                <span className='text-title'>Tiêu hóa</span>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'></div>
                                <span className='text-title'>Tim mạch</span>
                            </div >
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'></div>
                                <span className='text-title'>Cơ xương khớp</span>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'></div>
                                <span className='text-title'>Cơ xương khớp</span>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
