import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import {  CommonUtils } from '../../../utils'
import './ManageSpecialty.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Lightbox from 'react-image-lightbox';
import { postNewSpecialty } from '../../../services/userService'
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateImage: '',
            avatar: '',
            name: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            isOpen: false
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }
    handleUpdateImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            // console.log('chech data image: ', base64)
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                updateImage: objectUrl,
                avatar: base64
            })
        }
    }
    handlePreviewImage = () => {
        if (!this.state.updateImage) return;
        this.setState({
            isOpen: true
        })
    }
    handleOnchangeInput = (event) => {
        let data = event.target.value;
        this.setState({
            name: data,
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }
    handleBtnSubmit = async () => {
        let res = await postNewSpecialty(this.state)

        if (res && res.errCode === 0) {
            toast.success('Created a new specialty!')
            this.setState({
                avatar: '',
                name: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                isOpen: false,
                updateImage: '',
            })
        } else {
            toast.error('Have Something Error...')
            console.log('hoang check reponse: ', res)
        }
        //console.log('hoang check data: ', this.state)
    }
    render() {

        let { language } = this.props;
        // console.log("hoang check state: ", this.state)
        return (
            <div className='manage-specialty-container mx-3'>
                <div className='mamage-specialty-title'>manage specialty</div>
                <div className='manage-specialty-content row '>
                    <div className='col-6 name-specialty form-group mb-4'>
                        <label className='mb-2'>Specialty's Name</label>
                        <input className='form-control' type='text'
                            value={this.state.name}
                            onChange={(event) => { this.handleOnchangeInput(event) }}
                        >
                        </input>
                    </div>
                    <div className="col-6 specialty-image form-group mb-4">
                        <label className='mb-2'>Specialty's Image</label>
                        <div className='update-avatar'>
                            <input id='update-image' className="form-control" type="file" hidden
                                onChange={(event) => { this.handleUpdateImage(event) }}
                            />
                            <label className='label-update' htmlFor="update-image"> Tải ảnh <i className="fas fa-upload"></i></label>
                            <div className='preview-image'
                                style={{ backgroundImage: `url(${this.state.updateImage})` }}
                                onClick={() => { this.handlePreviewImage() }}
                            >
                            </div>

                        </div>
                    </div>

                    <div className='col-12 description-special form-group'>
                        <MdEditor
                            style={{ height: '400px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>

                    <div>
                        <button className='btn btn-primary'
                            onClick={() => { this.handleBtnSubmit() }}
                        >Lưu</button>
                    </div>
                </div>

                {this.state.isOpen === true && <Lightbox
                    mainSrc={this.state.updateImage}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                />}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
