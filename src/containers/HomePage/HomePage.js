import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility'
import './HomePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import ProminentDoctor from './Section/ProminentDoctor'
import HandBook from './Section/HandBook'
import AboutVideo from './Section/AboutVideo'
import HomeAbout from './Section/HomeAbout'


class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
        }
    }


  

    render() {
       
        // console.log('hoang check state home page: ',this.state)
        let settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 3,

        };
        return (
            <div>
                
                <HomeHeader isShowBanner={true}
                   
                />
                <Specialty
                    settings={settings}
                />
                <MedicalFacility
                    settings={settings}
                />
                <ProminentDoctor
                    settings={settings}
                />
                {/* <HandBook
                    settings={settings}
                /> */}
                <AboutVideo
                    settings={settings}
                />
                <HomeAbout
                    settings={settings}
                />
                {/* <div style={{ height: '300px' }}></div> */}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
