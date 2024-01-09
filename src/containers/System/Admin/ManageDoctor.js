import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils'
import { getInforDoctorService } from '../../../services/userService'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctor: [],
            statusChangeButton: false,
            action: '',

            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedProvince: '',
            selectedPayment: '',
            selectedClinic: '',
            selectedSpecialty: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
        }
    }


    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllDoctorInforStart()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USER")
            this.setState({
                listDoctor: dataSelect,
            })
        }

        if (prevProps.allDoctorInfor !== this.props.allDoctorInfor) {
            // console.log('hoang check data: ', this.props.allDoctorInfor)
            let { responsePrice, responseProvince, responsePayment, responseSpecialty, responseClinic } = this.props.allDoctorInfor;
            let dataPrice = this.buildDataInputSelect(responsePrice, 'PRICE');
            let dataProvince = this.buildDataInputSelect(responseProvince, 'PROVINCE');
            let dataPayment = this.buildDataInputSelect(responsePayment, 'PAYMENT');
            let dataSpecialty = this.buildDataInputSelect(responseSpecialty, 'SPECIALTY')
            let dataClinic = this.buildDataInputSelect(responseClinic, 'CLINIC')
            //console.log('hoang check data: ', dataPrice, dataProvince, dataPayment)
            this.setState({
                listPrice: dataPrice,
                listPayment: dataPayment,
                listProvince: dataProvince,
                listSpecialty: dataSpecialty,
                listClinic: dataClinic
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USER');
            let { responsePrice, responseProvince, responsePayment, responseSpecialty, responseClinic } = this.props.allDoctorInfor;
            let dataPrice = this.buildDataInputSelect(responsePrice, 'PRICE');
            let dataProvince = this.buildDataInputSelect(responseProvince, 'PROVINCE');
            let dataPayment = this.buildDataInputSelect(responsePayment, 'PAYMENT');
            let dataSpecialty = this.buildDataInputSelect(responseSpecialty, 'SPECIALTY')
            let dataClinic = this.buildDataInputSelect(responseClinic, 'CLINIC')
            this.setState({
                listDoctor: dataSelect,
                listPrice: dataPrice,
                listPayment: dataPayment,
                listProvince: dataProvince,
                listSpecialty: dataSpecialty,
                listClinic: dataClinic
            })
        }

    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let language = this.props.language
        if (inputData && inputData.length > 0) {
            if (type === "USER") {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.firstName} ${item.lastName}`
                    let labelEn = `${item.lastName} ${item.firstName}`

                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object)
                })
            } else if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} VND`
                    let labelEn = `${item.valueEn} USA`

                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            } else if (type === 'PROVINCE' || type === 'PAYMENT') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn}`

                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })

            } if (type === "SPECIALTY") {
                inputData.map((item, index) => {
                    let object = {};

                    object.label = item.name
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === "CLINIC") {
                inputData.map((item, index) => {
                    let object = {};

                    object.label = item.name
                    object.value = item.id;
                    result.push(object)
                })
            }

        } return result;
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id)
    }

    handleEditUser = (user) => {
        this.props.handleEditUser(user);
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        })
    }

    handleSaveContentMarkdown = async () => {
        let statusChangeButton = this.state.statusChangeButton;
        this.props.saveInforDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorID: this.state.selectedDoctor.value,
            action: statusChangeButton === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedProvince: this.state.selectedProvince.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedSpecialty: this.state.selectedSpecialty.value,
            selectedClinic: this.state.selectedClinic.value ? this.state.selectedClinic.value : [],
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,

        })
        this.setState({
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            statusChangeButton: false,
            addressClinic: '',
            nameClinic: '',
            note: '',
            selectedPayment: '',
            selectedPrice: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',
            selectedDoctor: '',

        })
    }

    handleChangeSelect = async (selectedDoctor) => {
        let response = await getInforDoctorService(selectedDoctor.value)
        let markdown = response.data.Markdown
        if (response && response.errCode === 0 && response.data && response.data.Markdown) {
            let addressClinic = '', nameClinic = '', note = '', paymentID = '', priceID = '', provinceID = '', specialtyID = '', clinicID = '',
                selectedPayment = '', selectedPrice = '', selectedProvince = '', selectedSpecialty = '', selectedClinic = '';
            let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state;
            if (response.data.Doctor_infor) {
                addressClinic = response.data.Doctor_infor.addressClinic;
                nameClinic = response.data.Doctor_infor.nameClinic;
                paymentID = response.data.Doctor_infor.paymentID;
                priceID = response.data.Doctor_infor.priceID;
                note = response.data.Doctor_infor.note;
                provinceID = response.data.Doctor_infor.provinceID;
                specialtyID = response.data.Doctor_infor.specialtyID;
                clinicID = response.data.Doctor_infor.clinicID
                // console.log('hoang check avariable: ', provinceID, paymentID, priceID)

                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceID;
                })
                selectedPrice = listPrice.find(item => {

                    return item && item.value === priceID;
                })

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentID;
                })
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyID;
                })
                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicID;
                })
                // console.log('hoang check select: ', selectedProvince, selectedPayment, selectedPrice)

            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                statusChangeButton: true,

                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic


            })

        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                statusChangeButton: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: ''

            })
        }
        this.setState({
            selectedDoctor: selectedDoctor,

        })
        // console.log('hoang check selectedDoctor: ', response)
    }
    handleSelectedInforDoctor = async (selectedOption, name) => {
        //console.log('hoang check dataInput: ', selectedOption, name)
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        //console.log('hoang check stateCopy: ', stateCopy)
        this.setState({
            ...stateCopy,
        })
    }
    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        console.log('hoang check text: ', stateCopy)
        this.setState({
            ...stateCopy
        })
    }
    render() {
        //console.log('check statusChangeButton: ', this.state.statusChangeButton)
        // console.log('hoang check state; ', this.state)
        let { statusChangeButton, listSpecialty } = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <label>
                        <FormattedMessage id="admin.manage-doctor.text-content" />
                    </label>
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label>
                            <FormattedMessage id='admin.manage-doctor.select-doctor' />
                        </label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctor}
                            placeholder={<FormattedMessage id='admin.manage-doctor.select-doctor' />}

                        />
                    </div>
                    <div className='content-right form-group'>
                        <span>
                            <FormattedMessage id='admin.manage-doctor.infor-introduction-doctor' />
                        </span>
                        <textarea className='form-control' rows='4'
                            onChange={(event) => { this.handleOnChangeText(event, 'description') }}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='infor-expand row'>
                    <div className='col-4 form-group'>
                        <label>
                            <FormattedMessage id='admin.manage-doctor.price' />
                        </label>

                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleSelectedInforDoctor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id='admin.manage-doctor.price' />}
                            name={'selectedPrice'}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>
                            <FormattedMessage id='admin.manage-doctor.payment' />
                        </label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleSelectedInforDoctor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id='admin.manage-doctor.payment' />}
                            name={'selectedPayment'}
                        />
                    </div>
                    <div className='col-4 form-group '>
                        <label>
                            <FormattedMessage id='admin.manage-doctor.provice' />
                        </label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleSelectedInforDoctor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id='admin.manage-doctor.provice' />}
                            name={'selectedProvince'}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>
                            <FormattedMessage id='admin.manage-doctor.nameClinic' />
                        </label>



                        <input className='form-control'
                            value={this.state.nameClinic}
                            onChange={(event) => { this.handleOnChangeText(event, 'nameClinic') }}

                        ></input>
                    </div>
                    <div className='col-4 form-group'>
                        <label>
                            <FormattedMessage id='admin.manage-doctor.addressClinic' />
                        </label>
                        <input className='form-control'
                            value={this.state.addressClinic}
                            onChange={(event) => { this.handleOnChangeText(event, 'addressClinic') }}

                        ></input>
                    </div>

                    <div className='col-4 form-grop'>
                        <label>  <FormattedMessage id='admin.manage-doctor.clinic' /></label>

                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleSelectedInforDoctor}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id='admin.manage-doctor.clinic' />}
                            name={'selectedClinic'}
                        />
                    </div>

                    <div className='col-4 form-grop'>
                        <label>  <FormattedMessage id='admin.manage-doctor.specialty' /></label>

                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleSelectedInforDoctor}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id='admin.manage-doctor.specialty' />}
                            name={'selectedSpecialty'}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>
                            <FormattedMessage id='admin.manage-doctor.note' />
                        </label>
                        <input className='form-control'
                            value={this.state.note}
                            onChange={(event) => { this.handleOnChangeText(event, 'note') }}

                        ></input>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '400px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />

                </div>
                <button className={statusChangeButton === true ? 'save-content-doctor' : 'create-content-doctor'}
                    onClick={() => { this.handleSaveContentMarkdown() }}
                >
                    {statusChangeButton === true ?
                        <span>
                            <FormattedMessage id='admin.manage-doctor.save-button' />
                        </span>
                        :
                        <span><FormattedMessage id='admin.manage-doctor.create-button' /></span>}
                </button>
            </div>


        )
    }
}



const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allDoctorInfor: state.admin.allDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllDoctorInforStart: () => dispatch(actions.fetchAllDoctorInforStart()),
        saveInforDoctor: (data) => dispatch(actions.saveInforDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
