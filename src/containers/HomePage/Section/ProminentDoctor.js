import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

class ProminentDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: [],
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }

    handleViewInforDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/infor-doctor/${doctor.id}`)
        }
      //  console.log('check pros : ', this.props)
    }

    render() {
        let arrDoctors = this.state.arrDoctors
        let language = this.props.language
        //   console.log('check pros arrDoctors: ', arrDoctors)
        // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)
        return (
            <div className='section-share prominent-doctor section-prominent-doctor'>
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <div className='title-specialty'><b><FormattedMessage id='homepage.Prominent-Doctor-In-Week' /></b></div>
                        <button className='btn-specialty'> <FormattedMessage id='homepage.Search-more' /></button>
                    </div>
                    <div className='specialty-body'>
                        <Slider {...this.props.settings}>

                            {arrDoctors && arrDoctors.length > 0
                                && arrDoctors.map((item, index) => {
                                    let data = item.Doctor_infor.specialtyData;
                                    let imageBase64 = ''
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`

                                    return (

                                        <div className='section-border' key={index}
                                            onClick={() => { this.handleViewInforDoctor(item) }}
                                        >
                                            <div className='section-customize section-customize-outline'>
                                                <div className='outer-bg'>
                                                    <div className='bg-image prominent-doctor'
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    />
                                                </div>
                                                <div className='position text-center'>

                                                    <span className='text-title '>{language === LANGUAGES.VI ? nameVi : nameEn}</span>
                                                    <div className='text-center text-title'>{data.name}</div>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })}


                        </Slider>
                    </div >
                </div >
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProminentDoctor));
