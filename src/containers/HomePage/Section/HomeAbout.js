import React, { Component } from 'react';
import { connect } from 'react-redux';
//import Slider from 'react-slick';



class HomeAbout extends Component {


    render() {

        return (
            <div className=' section-home-about'>

                <p><b>&copy; 2023</b>     Contact or Review BookingCare's Services.
                    <a target="_blank" rel="noreferrer" href='https://bookingcare.vn/'> __click here__
                    </a>
                </p>
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
