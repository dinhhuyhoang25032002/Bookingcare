import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../HomeHeader'
import './Introduction.scss'
import HomeAbout from '../Section/HomeAbout';
class Introduction extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }


    render() {

        let { language } = this.props;
        console.log("hoang check state: ", this.state)
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='extra-doctor-infor-container'>
                    Là một trong những nền tảng đặt lịch khám bệnh trực tuyến ra đời đầu tiên tại Việt Nam.
                    <ul>
                        <li>
                            Homecare thấu hiểu những hạn chế trong việc sắp xếp thời gian của phòng khám, bác sĩ và bệnh nhân.
                        </li>
                        <li>
                            Thấu hiểu sự điều phối lịch khám bệnh và đội ngũ y bác sĩ của các phòng khám còn thụ động.
                        </li>
                    </ul>
                    Homecare ra đời với sứ mệnh kết nối bệnh nhân với đội ngũ y bác sĩ có kiến thức, kinh nghiệm, và chuyên môn cao trong nhiều lĩnh vực khám chữa bệnh tại các phòng khám và
                    bệnh viện uy tín trên toàn quốc với
                    <ul>
                        <li>
                            Thao tác đơn giản
                        </li>
                        <li>
                            Giao diện thân thiện.
                        </li>
                        <li>
                            Tiết kiệm thời gian
                        </li>
                    </ul>
                    Homecare luôn đặt sức khỏe người bệnh và chất lượng dịch vụ lên hàng đầu.
                    Với đội ngũ nhân viên tài năng và nhiệt huyết, áp dụng công nghệ tiên tiến, HomeCare cam kết mang lại cho  khách hàng
                    <ul>
                        <li>
                            Sự uy tín
                        </li>
                        <li>
                            Sự an toàn
                        </li>
                        <li>
                            Sự tiện lợi
                        </li>
                        <li>
                            Sự bảo mật
                        </li>
                        <li>
                            Sự thân thiện
                        </li>
                    </ul>

                </div>
                <div className='extra-doctor-infor-container'>Hướng dẫn sử dụng dịch vụ:
                    <ul>
                        <li>
                            Người dùng có thể sử dụng dịch vụ của Homecare trên Website: www.Homecare.com hay app Homecare trên điện thoại
                        </li>
                        <li>
                            Truy cập và Panfage hay website để theo dõi vào được thông báo về những gói khám được ưu đãi từ chúng tôi
                        </li>
                    </ul>


                </div>
                <HomeAbout />

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

export default connect(mapStateToProps, mapDispatchToProps)(Introduction);
