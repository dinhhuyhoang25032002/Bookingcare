import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant'
import { changeLanguageApp } from '../../store/actions/appActions'
import { withRouter } from 'react-router';
class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)

    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }
    render() {
        let language = this.props.language
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo'
                                onClick={() => { this.returnToHome() }}
                            >

                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.speciality" /> </b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.searchdoctor" /></div>
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
                                <div className='support'>
                                    <i class="fa fa-headphones" aria-hidden="true"></i>
                                    <FormattedMessage id="homeheader.support" />
                                </div>
                                <span>022-6666-9999</span>
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-VI active' : 'language-VI'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-EN active' : 'language-EN'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>

                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='text-title1'><b><FormattedMessage id="banner.title1" /></b></div>
                            <div className='text-title2'><b><FormattedMessage id="banner.title2" /></b></div>
                            <div className='search-input'>
                                <i className="fas fa-search"></i>
                                <input type='text' placeholder='Tìm kiếm các vấn đề về sức khỏe'></input>
                            </div>
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
            </React.Fragment>
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
