import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { getAllClinic } from '../../../services/userService'
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
class MedicalFacility extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: [],
        }
    }
    async componentDidMount() {
        let response = await getAllClinic();
        if (response && response.errCode === 0) {
            this.setState({
                arrDoctors: response.data ? response.data : []
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleViewInforClinic = (item) => {

        if (this.props.history) {
            this.props.history.push(`/infor-clinic/${item.id}`)
        }
        //  console.log('hoang check state: ', this.props)
    }
    render() {
        let { arrDoctors } = this.state;

        return (
            <div className='section-share section-medical-facility'>
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <div className='title-specialty'><b><FormattedMessage id = 'homepage.Prominent-Healthcare-Facility'/></b></div>
                        <button className='btn-specialty'> <FormattedMessage id ='homepage.Search-more'/></button>
                    </div>
                    <div className='specialty-body'>
                        <Slider {...this.props.settings}>
                            {arrDoctors && arrDoctors.length > 0
                                && arrDoctors.map((item, index) => {
                                    return (
                                        <div className='section-customize' key={index}
                                            onClick={() => { this.handleViewInforClinic(item) }}
                                        >
                                            <div className='bg-image section-medical-facility'
                                                style={{ backgroundImage: `url(${item.image})` }}>

                                            </div>
                                            <div className='text-title text-center'>{item.name}</div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
