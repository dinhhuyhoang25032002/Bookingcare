import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss'
//import { getProfileDoctorById } from '../../../services/userService'
import _ from 'lodash'
import moment from 'moment';
import localization from 'moment/locale/vi';
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
        // if (prevProps.doctorID !== this.props.doctorID) {
        //     this.getFrofileDoctor(this.props.doctorID)
        // }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    renderTimeBooking = (dataDoctorSchedule) => {
        let { language } = this.props;
        if (dataDoctorSchedule && !_.isEmpty(dataDoctorSchedule)) {
            let date = language === LANGUAGES.VI ? moment.unix(+dataDoctorSchedule.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+dataDoctorSchedule.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            let today = this.capitalizeFirstLetter(date)
            // console.log("hoang check time:", dataDoctorSchedule.timeTypeData)
            return (
                <>
                    <div>{dataDoctorSchedule.timeTypeData && dataDoctorSchedule.timeTypeData.valueVi && language === LANGUAGES.VI ? dataDoctorSchedule.timeTypeData.valueVi : dataDoctorSchedule.timeTypeData.valueEn} - {today}</div>
                    <div><FormattedMessage id='patient.modal-booking.booking-free'/></div>
                </>
            )
        } return <></>

    }
    render() {
        let { dataProfile, isShowDescription, dataDoctorSchedule } = this.props;
        // let data =dataProfile.Doctor_infor.addressClinic
       // console.log('hoang check props; ', dataProfile.Doctor_infor.addressClinic)
        let { language } = this.props;
        let nameEn = '', nameVi = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName}`
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.lastName} ${dataProfile.firstName} `
        }
        //   console.log('hoang check data of state: ', dataProfile)
        return (
            <div className='extra-doctor-information-container'>
                <div className='doctor-introduction'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                    >
                    </div>
                    <div className='content-right'>
                        <div className='position'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        {isShowDescription === true ?
                            <>
                                <div className='introduction'>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description
                                        && <span><FormattedMessage id={dataProfile && dataProfile.Doctor_infor && dataProfile.Doctor_infor.doctorID ? dataProfile.Doctor_infor.doctorID : ""} /></span>
                                    }
                                </div>
                            </> : <div className='booking-fee'>{this.renderTimeBooking(dataDoctorSchedule)}</div>
                        }


                        <div className='province'>
                            {dataProfile && dataProfile.Doctor_infor && dataProfile.Doctor_infor.provinceData && dataProfile.Doctor_infor.provinceData.valueVi && language === LANGUAGES.VI && <span> <i className="fas fa-map-marker-alt"></i> {dataProfile.Doctor_infor.addressClinic}</span>}
                            {dataProfile && dataProfile.Doctor_infor && dataProfile.Doctor_infor.provinceData && dataProfile.Doctor_infor.provinceData.valueVi && language === LANGUAGES.EN && <span> <i className="fas fa-map-marker-alt"></i><FormattedMessage id={dataProfile.Doctor_infor.addressClinic} /></span>}

                        </div>
                    </div>
                </div>

            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
