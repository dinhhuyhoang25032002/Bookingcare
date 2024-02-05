import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant'
import { changeLanguageApp } from '../../store/actions/appActions'
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import MenuApp from './Extention/MenuApp';
class HomeHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
    }
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)

    }

    returnToHome = () => {
        //  let isLoggedIn = this.props
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
        this.setState({
            isShow: false,
        });
    }

    showMenuApp = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    render() {
        let language = this.props.language
        let { isShow } = this.state;
        // console.log('hoang check data: ', isShow)
        return (
            <React.Fragment>

                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div className='left-content-up'>
                                <div className='center-i'
                                    onClick={() => { this.showMenuApp() }} >
                                    <i className="fas fa-bars"></i>
                                </div>


                                <div className='header-logo'
                                    onClick={() => { this.returnToHome() }}
                                >
                                </div>
                            </div>

                        </div>
                        <div className='center-content'>
                            <div to='/' className='child-content'>
                                <span><b><FormattedMessage id="homeheader.speciality" /> </b></span>
                                <span className='subs-title'><FormattedMessage id="homeheader.searchdoctor" /></span>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.select-room" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className='subs-title'> <FormattedMessage id="homeheader.select-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.fee" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.checkhealth" /></div>
                            </div>

                        </div>
                        <div className='right-content'>
                            <div className='outline-support'>
                                <span className='support'>
                                    <i className="fa fa-headphones" aria-hidden="true"></i>
                                    <FormattedMessage id="homeheader.support" />
                                </span>
                                <span className='phone-number'>022-6666-9999</span>
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-VI active' : 'language-VI'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-EN active' : 'language-EN'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>

                        </div>
                        {isShow === true ?
                            <>
                                <div className='top-nav'>
                                    <MenuApp />
                                    <div className='over-dark'
                                        onClick={() => { this.showMenuApp() }}
                                    >
                                    </div>
                                </div>

                            </>
                            :
                            <>
                            </>
                        }
                    </div>

                </div>
                {
                    this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>

                        </div>

                        <div className='content-down'>
                            <div className='menu-options'>

                                <div className='option-child'>
                                    <div className='icon-option' >
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className='text-option'><FormattedMessage id="banner.Specialized-medical-examination" /></div>
                                </div>

                                <div className='option-child'>
                                    <div className='icon-option' >
                                        <i className="fas fa-mobile-alt"></i>
                                    </div>
                                    <div className='text-option'><FormattedMessage id="banner.Telehealth-consultation" /></div>
                                </div>

                                <div className='option-child'>
                                    <div className='icon-option' >
                                        <i className="fas fa-procedures"></i>
                                    </div>
                                    <div className='text-option'><FormattedMessage id="banner.General-health-check-up" /></div>
                                </div>

                                <div className='option-child'>
                                    <div className='icon-option' >
                                        <i className="fas fa-user-md"></i>
                                    </div>

                                    <div className='text-option'><FormattedMessage id="banner.Medical-diagnostics" /></div>
                                </div>

                                <div className='option-child'>
                                    <div className='icon-option' >
                                        <i className="fas fa-stethoscope"></i>
                                    </div>
                                    <div className='text-option'><FormattedMessage id="banner.Mental-health" /></div>
                                </div>

                                <div className='option-child'>
                                    <div className='icon-option' >
                                        <i className="fas fa-ambulance"></i>
                                    </div>
                                    <div className='text-option'><FormattedMessage id="banner.House-call" /></div>
                                </div>

                            </div>
                        </div>
                    </div>
                }
            </React.Fragment >
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
