import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader'
import './InforDoctor.scss'
import { getInforDoctorService } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from '../../../containers/Patient/Doctor/DoctorSchedule'
import ExtraDoctorInfor from './ExtraDoctorInfor';
import { FormattedMessage } from 'react-intl';
import HomeAbout from '../../HomePage/Section/HomeAbout';
class InforDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inforDoctor: {},
            currentDoctor: -1,
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctor: id,
            })
            let response = await getInforDoctorService(id);
            if (response && response.errCode === 0) {
                this.setState({
                    inforDoctor: response.data
                })
            }
            //   console.log('check response', response)

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {

        let inforDoctor = this.state.inforDoctor;
        // console.log('check: ',inforDoctor)
        let nameEn = '', nameVi = ''
        let { language } = this.props
        if (inforDoctor && inforDoctor.positionData) {
            nameVi = `${inforDoctor.positionData.valueVi}. ${inforDoctor.firstName} ${inforDoctor.lastName}`
            nameEn = `${inforDoctor.positionData.valueEn}. ${inforDoctor.firstName} ${inforDoctor.lastName}`
        }
        return (

            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className='doctor-infor-container'>
                    <div className='doctor-introduction'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${inforDoctor && inforDoctor.image ? inforDoctor.image : ''})` }}
                        >
                        </div>
                        <div className='content-right'>
                            <div className='position'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='introduction'>
                                {inforDoctor && inforDoctor.Markdown && inforDoctor.Markdown.description && language === LANGUAGES.VI &&
                                    <span>{inforDoctor.Markdown.description}</span>
                                }
                                {inforDoctor && inforDoctor.Markdown && inforDoctor.Markdown.description && language === LANGUAGES.EN &&
                                    <span><FormattedMessage id={inforDoctor && inforDoctor.id ? inforDoctor.id : ''} /></span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='medical-examination-schedule'>
                        <div className='content-left'>
                            <DoctorSchedule
                                inforDoctorFromParent={this.state.currentDoctor}
                            />
                        </div>
                        <div className='content-right'>
                            <ExtraDoctorInfor
                                inforDoctorFromParent={this.state.currentDoctor}
                            />
                        </div>
                    </div>
                    <div className='doctor-information'>
                        {inforDoctor && inforDoctor.Markdown && inforDoctor.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: inforDoctor.Markdown.contentHTML }}></div>
                            // <div></div>
                        }
                    </div>
                    <div className='medical-examination-feedback'></div>
                </div>
                <HomeAbout />
            </>


        );
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

export default connect(mapStateToProps, mapDispatchToProps)(InforDoctor);
