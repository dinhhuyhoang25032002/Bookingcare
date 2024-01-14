import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ClinicInfor.scss'
import HomeHeader from '../../HomePage/HomeHeader'
import DoctorSchedule from '../../../containers/Patient/Doctor/DoctorSchedule'
import ExtraDoctorInfor from '../Doctor/ExtraDoctorInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDoctorWithClinic } from '../../../services/userService'
import HomeAbout from '../../HomePage/Section/HomeAbout';
import _ from 'lodash'
class ClinicInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorSchedule: [],
            inforDoctorWithClinic: [],
            listProvince: [],
            isShow: true,
            btnStatus: true
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let response = await getDoctorWithClinic({
                id: id
            });

            if (response && response.errCode === 0) {
                let data = response.data.clinicData;
                let arrDoctorSchedule = []

                if (data && !_.isEmpty(data)) {
                    data.map(item => {
                        arrDoctorSchedule.push(item.doctorID)
                    })
                }
                this.setState({
                    inforDoctorWithClinic: response.data,
                    arrDoctorSchedule: arrDoctorSchedule,

                })
            }


        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    handleOnchangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let response = await getDoctorWithClinic({
                id: id,
            });

            if (response && response.errCode === 0) {
                let data = response.data.clinicData;
                let arrDoctorSchedule = []

                if (data && !_.isEmpty(data)) {
                    data.map(item => {
                        arrDoctorSchedule.push(item.doctorID)
                    })
                }
                this.setState({
                    inforDoctorWithClinic: response.data,
                    arrDoctorSchedule: arrDoctorSchedule,
                })
            }
        }



    }
    isShowDescription = () => {
        this.setState({
            isShow: !this.state.isShow,
            btnStatus: !this.state.btnStatus
        })
    }
    render() {
        let { arrDoctorSchedule, inforDoctorWithClinic, isShow, btnStatus } = this.state;
        console.log('check data arrDoctorSchedule:', inforDoctorWithClinic.descriptionHTML)
        let { language } = this.props;

        return (
            <div className='infor-clinic-container'>
                <HomeHeader />
                {isShow === true && btnStatus === true ?
                    <div className='description-container'>
                        <div className='description-clinic-hidden'>
                            {inforDoctorWithClinic && !_.isEmpty(inforDoctorWithClinic)
                                &&
                                <>
                                    <div className='name-clinic'>{inforDoctorWithClinic.name}</div>
                                    <div dangerouslySetInnerHTML={{ __html: inforDoctorWithClinic.descriptionHTML }}></div>

                                </>
                            }

                        </div>
                        <button onClick={() => { this.isShowDescription() }}>Xem thêm</button>
                    </div>
                    :
                    <div className='description-container'>
                        <div className='description-clinic-full'>
                            {inforDoctorWithClinic && !_.isEmpty(inforDoctorWithClinic)
                                &&
                                <>
                                    <div className='name-clinic'>{inforDoctorWithClinic.name}</div>
                                    <div dangerouslySetInnerHTML={{ __html: inforDoctorWithClinic.descriptionHTML }}></div>

                                </>
                            }

                        </div>
                        <button onClick={() => { this.isShowDescription() }}>Ẩn bớt</button>
                    </div>

                }

                <div className='infor-clinic-body'>

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

export default connect(mapStateToProps, mapDispatchToProps)(ClinicInfor);
