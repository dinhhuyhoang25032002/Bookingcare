import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './SpecialtyInfor.scss'
import HomeHeader from '../../HomePage/HomeHeader'
import DoctorSchedule from '../../../containers/Patient/Doctor/DoctorSchedule'
import ExtraDoctorInfor from '../Doctor/ExtraDoctorInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDoctorWithSpecialty, getAllCodeService } from '../../../services/userService'
import HomeAbout from '../../HomePage/Section/HomeAbout';
import _ from 'lodash'
class SpecialtyInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorSchedule: [],
            inforDoctorWithSpecialty: [],
            listProvince: [],
            isShow: true,
            btnStatus: true
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let response = await getDoctorWithSpecialty({
                id: id,
                location: "ALL"
            });
            let responseProvince = await getAllCodeService('PROVINCE')
            // console.log('hoang check data: ', response.data)
            if (response && response.errCode === 0 && responseProvince && responseProvince.errCode === 0) {
                let data = response.data
                let dataProvince = responseProvince.data;
                console.log('hoang check data: ', data)
                let arrDoctorSchedule = []
                if (data && !_.isEmpty(data)) {
                    data.map(item => {
                        let arr = item.specialtyData;

                        if (arr && !_.isEmpty(arr)) {
                            arrDoctorSchedule.push(arr.doctorID)

                        }
                    })
                }
                let result = [];
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        id: 100,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: "Nationwide",
                        valueVi: "Toàn Quốc",
                    }
                    )
                }

                this.setState({
                    inforDoctorWithSpecialty: data,
                    listProvince: dataProvince,
                    arrDoctorSchedule: arrDoctorSchedule,

                })
            }
            //  console.log('check response', response)

        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    handleOnchangeSelect = async (event) => {

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value
            let response = await getDoctorWithSpecialty({
                id: id,
                location: location
            });

            //  console.log('hoang check data: ', response.data)
            if (response && response.errCode === 0) {
                let data = response.data

                // console.log('hoang check data: ', dataProvince)
                let arrDoctorSchedule = []
                if (data && !_.isEmpty(data)) {
                    data.map(item => {
                        let arr = item.specialtyData;

                        if (arr && !_.isEmpty(arr)) {
                            arrDoctorSchedule.push(arr.doctorID)

                        }
                    })
                }
                this.setState({
                    inforDoctorWithSpecialty: data,
                    arrDoctorSchedule: arrDoctorSchedule

                })
            }
            //  console.log('check response', response)

        }



    }
    isShowDescription = () => {
        this.setState({
            isShow: !this.state.isShow,
            btnStatus: !this.state.btnStatus
        })
    }
    render() {
        let { arrDoctorSchedule, inforDoctorWithSpecialty, listProvince, isShow, btnStatus } = this.state;
        console.log('check data arrDoctorSchedule:', inforDoctorWithSpecialty)
        let { language } = this.props;

        return (
            <div className='infor-specialty-container'>
                <HomeHeader />
                {isShow === true && btnStatus === true ?
                    <div className='description-container'>
                        <div className='description-specialty-hidden'>
                            {inforDoctorWithSpecialty && !_.isEmpty(inforDoctorWithSpecialty)
                                &&
                                <div dangerouslySetInnerHTML={{ __html: inforDoctorWithSpecialty[0].descriptionHTML }}></div>
                            }
                        </div>
                        <button onClick={() => { this.isShowDescription() }}>Xem thêm</button>
                    </div>
                    :
                    <div className='description-container'>
                        <div className='description-specialty-full'>
                            {inforDoctorWithSpecialty && !_.isEmpty(inforDoctorWithSpecialty)
                                &&
                                <div dangerouslySetInnerHTML={{ __html: inforDoctorWithSpecialty[0].descriptionHTML }}></div>
                            }
                        </div>
                        <button onClick={() => { this.isShowDescription() }}>Ẩn bớt</button>
                    </div>

                }

                <div className='infor-specialty-body'>

                    <div className='search-province'>
                        <select
                            onChange={(event) => { this.handleOnchangeSelect(event) }}
                        >
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option
                                            className='option'
                                            value={item.keyMap}
                                            key={index}
                                        >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {arrDoctorSchedule && arrDoctorSchedule.length &&
                        arrDoctorSchedule.map((item, index) => {
                            return (
                                <>

                                    <div className='all-doctors' key={index}>

                                        <div className='is-content-left'>
                                            < ProfileDoctor
                                                isshowLink={true}
                                                doctorID={item}
                                                isShowDescription={true}
                                            //  dataDoctorSchedule={item}
                                            />
                                        </div>
                                        <div className='is-content-right'>

                                            <div className='content-up'>
                                                <DoctorSchedule
                                                    inforDoctorFromParent={item}
                                                    key={index}
                                                />
                                            </div>
                                            <div className='content-down'>
                                                <ExtraDoctorInfor
                                                    inforDoctorFromParent={item}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>

                            )
                        })
                    }

                </div>
                <HomeAbout />
            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyInfor);
