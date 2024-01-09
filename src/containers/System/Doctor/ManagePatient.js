import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date()
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    handleOnchangDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        })
    }

    render() {

        let { language } = this.props;
        // let { currentDate } = this.state
        console.log("hoang check state: ", this.state)
        return (
            <>
                <div className='manage-patient-title text-center'>
                    <FormattedMessage id='menu.doctor.manage-patient' />
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group mb-3'>
                        <label className='mb-2'>Chọn ngày khám bệnh</label>
                        <DatePicker
                            className='form-control curent-date'
                            onChange={this.handleOnchangDatePicker}
                            value={this.state.currentDate}
                          //  placeholder={language === LANGUAGES.VI ? 'Ngày/Tháng/Năm Sinh (Bắt Buộc)' : 'Date Of Birth (Mandatory)'}
                        />
                    </div>
                    <table class="table table-sm table-warning mt-3">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colspan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
