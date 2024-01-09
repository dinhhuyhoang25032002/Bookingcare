import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllSpecialty } from '../../../services/userService'
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataAllSpecialty: []
        }
    }
    async componentDidMount() {
        let res = await getAllSpecialty();
        //  console.log('hoang check data: asdfasd',res.data)
        //console.log('hoang check data: ', res.data.name)
        if (res && res.errCode === 0) {
            this.setState({
                dataAllSpecialty: res.data ? res.data : [],
            })
        }
    }

    handleViewInforSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/infor-specialty/${item.id}`)
        }
    }

    render() {
        let { dataAllSpecialty } = this.state;
        //  console.log('hoang check data: asdasda', dataAllSpecialty)
        return (
            <div className='section-share section-specialty'
            >
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <div className='title-specialty'><b><FormattedMessage id='homepage.Common-Specializations' /></b></div>
                        <button className='btn-specialty'> <FormattedMessage id='homepage.Search-more' /></button>
                    </div>
                    <div className='specialty-body'>
                        <Slider {...this.props.settings}>
                            {dataAllSpecialty && dataAllSpecialty.length > 0 &&
                                dataAllSpecialty.map((item, index) => {
                                    return (
                                        <div className='section-customize' key={index}
                                            onClick={() => { this.handleViewInforSpecialty(item) }}

                                        >
                                            <div className='bg-image section-specialty'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            >

                                            </div>
                                            <div className='text-title text-center'>{item.name}</div>
                                        </div>)

                                })
                            }


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
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
