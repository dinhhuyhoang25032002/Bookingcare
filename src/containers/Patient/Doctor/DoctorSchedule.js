import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import localization from 'moment/locale/vi';
import { getScheduleDoctor } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
import Bookingcare from './Modal/Bookingcare';
import { times } from 'lodash';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allValueTime: [],
            isShowModalSchesule: false,
            dataDoctorSchedule: {},
        }
    }
    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getAllDays(language)
        //   console.log('hoang check allDay: ', allDays)
        this.setState({
            allDays: allDays
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            let language = this.props.language;
            let allDays = this.getAllDays(language)
            this.setState({
                allDays: allDays
            })
        }
        {
            let language = this.props.language;
            let allDays = this.getAllDays(language);
            let idDoctorCurrent = this.props.inforDoctorFromParent
            let response = await getScheduleDoctor(idDoctorCurrent, allDays[0].value);

            this.setState({
                allValueTime: response.data ? response.data : [],
            })

        }
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getAllDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    object.label = this.capitalizeFirstLetter(labelVi)
                }


            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format(' DD/MM')
                    let today = `Today - ${ddMM}`
                    object.label = today
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM')
                }

            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays;
    }

    handleOnchangeSelect = async (event) => {

        if (this.props.inforDoctorFromParent && this.props.inforDoctorFromParent !== -1) {
            let doctorID = this.props.inforDoctorFromParent;
            let date = event.target.value;
            let response = await getScheduleDoctor(doctorID, date)

            if (response && response.errCode === 0) {
                let allTime = response.data
                this.setState({
                    allValueTime: allTime ? allTime : []
                })
            } else {

            }
            console.log('hoang check reponse from server: ', response)
        }


        //console.log('check value select: ', event.target.value)
    }

    handleOnclickBtnSchedule = (time) => {
        this.setState({
            isShowModalSchesule: true,
            dataDoctorSchedule: time
        })
    }
    closeModalDoctorSchedule = () => {
        this.setState({
            isShowModalSchesule: false
        })
    }

    render() {
        let { allDays, allValueTime, isShowModalSchesule, dataDoctorSchedule } = this.state;
        // console.log('check asdaj: ', this.state)
        let { language } = this.props;
        return (
            <>
                <div className='schedule-doctor-container'>
                    <div className='all-schedule'>
                        <select
                            onChange={(event) => { this.handleOnchangeSelect(event) }}
                        >
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </option>
                                    )
                                })
                            }

                        </select>
                    </div>
                    <div className='all-value-schedule'>
                        <div className='text-calendar'>
                            <i className="fas fa-calendar-alt">
                                <span><FormattedMessage id='patient.infor-doctor.schedule' /></span>
                            </i>
                        </div>
                        <div className='time-content'>
                            {allValueTime && allValueTime.length > 0 ?
                                <>
                                    <div className='time-content-btns'>
                                        {allValueTime.map((item, index) => {
                                            let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                            return (
                                                <button
                                                    className={language === LANGUAGES.VI ? 'btn-schedule-doctor-vi' : 'btn-schedule-doctor-en'}
                                                    key={index}
                                                    onClick={() => { this.handleOnclickBtnSchedule(item) }}
                                                >
                                                    {timeDisplay}
                                                </button>
                                            )
                                        })}
                                    </div>

                                    <div className='book-free'><span><FormattedMessage id='patient.infor-doctor.text-select' /> <i className="far fa-hand-point-up"></i> <FormattedMessage id='patient.infor-doctor.text-booking' /></span></div>
                                </>
                                : <div className='text-schedule-doctor'><FormattedMessage id='patient.infor-doctor.text-schedule-doctor' /></div>
                            }
                        </div>
                    </div>
                </div>
                <Bookingcare
                    isshowModal={isShowModalSchesule}
                    dataDoctorSchedule={dataDoctorSchedule}
                    closeModalDoctorSchedule={this.closeModalDoctorSchedule}
                    doctorID={this.props.inforDoctorFromParent}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
