import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker'
//import moment from 'moment';
//import { range } from 'lodash';
import { toast } from 'react-toastify';
import _ from 'lodash'
import { saveScheduleDoctor } from '../../../services/userService'
class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDoctor: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: [],
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctor: dataSelect,
            })
        }

        if (prevProps.allTimeSchedule !== this.props.allTimeSchedule) {
            let data = this.props.allTimeSchedule;

            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }

            this.setState({
                rangeTime: data
            })
        }

        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
        //     this.setState({
        //         listDoctor: dataSelect,
        //     })
        // }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let language = this.props.language
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.firstName} ${item.lastName}`
                let labelEn = `${item.lastName} ${item.firstName}`

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }

    handleChangeSelect = (selectedDoctor) => {

        this.setState({
            selectedDoctor: selectedDoctor
        })
        // console.log('hoang check selectedDoctor: ', response)
    }

    handleOnchangDatePicker = (date) => {
        console.log('check date: ', date)
        this.setState({
            currentDate: date[0],
        })

    }

    handleOnclickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
      //  console.log('check date: ', currentDate)
        let result = [];
        if (!currentDate) {
            toast.error('Invalid date!');
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Invalid selected doctor!');
            return;
        }

        //let formatDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);

        let formatDate = new Date(currentDate).getTime()
        console.log('check formatDate: ', formatDate);
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(item => {
                    let object = {}
                    object.doctorID = selectedDoctor.value;
                    object.date =  formatDate;
                    object.timeType = item.keyMap;
                    // object.maxNumber = 10

                    result.push(object)
                })
            } else {
                toast.error('Invalid selected time!');
                return;
            }
        }
        let response = await saveScheduleDoctor({
            arrSchedule: result,
            doctorID: selectedDoctor.value,
            formatDate: formatDate

        })
        if( response && response.errCode === 0){
            toast.success('Save Schedule Successed !');
        }else{
            toast.error('Save Schedule Failed !');
            console.log('hoang check response >> errCode: ', response)

        }
    }

    render() {

        let rangeTime = this.state.rangeTime;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));

        //console.log('hoang check state: ', rangeTime)
        return (
            <div className='manage-schedule-container'>
                <div className='manage-schedule-content'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>
                                <FormattedMessage id="manage-schedule.choose-doctor" />
                            </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctor}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>
                                <FormattedMessage id="manage-schedule.choose-date" />
                            </label>
                            <DatePicker
                                className='form-control'
                                onChange={this.handleOnchangDatePicker}
                                minDate={yesterday}
                                value={this.state.currentDate}
                            />
                        </div>
                        <div className='manage-schedule-times'>
                            {rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                                return (

                                    <button
                                        key={index}
                                        className={item.isSelected === true ? 'btn-schedule-doctor active' : 'btn-schedule-doctor'}
                                        onClick={() => { this.handleOnclickBtnTime(item) }}
                                    >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </button>

                                )
                            })}
                        </div>
                    </div>
                    <button className='btn btn-outline-success'
                        onClick={() => { this.handleSaveSchedule() }}
                    >
                        <FormattedMessage id="manage-schedule.save-button" />
                    </button>

                </div>

            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allTimeSchedule: state.admin.allTimeSchedule,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
