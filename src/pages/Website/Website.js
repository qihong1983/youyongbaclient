import React, {
    Component
} from 'react';

import 'isomorphic-unfetch';

import {
    connect
} from 'react-redux';

import {
    bindActionCreators
} from 'redux';

import * as actionCreators from '../../actions/userList/list';

import {
    Layout
} from 'antd';

// import axios from 'axios';

class Website extends Component {

    constructor(props) {
        super(props);
        this.state = {
            websiteUrl: '',
            iFrameHeight: '0px',
            clearCache: '',
            data: '',
            aclientId: '',
            dateTime: ""
        }
    }

    componentDidMount() {

        this.cnzzInit()


        this.setState({
            websiteUrl: this.props.location.query.site,
            clearCache: this.props.location.query.timer,
            aclientId: this.props.location.query.aclientId,
            iFrameHeight: window.innerHeight + 'px'
        });
    }


    async cnzzInit() {

        clearInterval(this.timerAleqipeiActive);

        console.log(this.props.location.query.aclientId, this.props.location.query.site, '####ccccc');
        setInterval(() => {


            this.setState({
                dateTime: new Date().getTime()
            }, () => {
                console.log(this.state.dateTime);
            })
        }, 15 * (60 * 1000));

        // }, 15 * (60 * 1000));

        // let json = await res.json();

        // console.log(json, 'json');

    }
    render() {

        return (
            <Layout className="layout" >

                <div>{this.state.data}</div>



                <iframe
                    style={{ width: '100%', overflow: 'visible' }}

                    ref="iframe"
                    src={"http://client.aleqipei.com/aleqipei/"}
                    // height={window.document.body.offsetHeight + 'px'}
                    height={"0px"}
                    scrolling="yes"
                    frameBorder="0"
                />

                <iframe
                    style={{ width: '100%', overflow: 'visible' }}
                    id="iframeId"
                    ref="iframe"
                    key={this.state.dateTime}
                    src={"http://client.aleqipei.com/aleqipei_active/"}
                    // height={window.document.body.offsetHeight + 'px'}
                    height={"0px"}
                    scrolling="yes"
                    frameBorder="0"
                />

                <iframe
                    security="restricted"
                    sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups allow-modals"
                    id="iframeWindow"
                    onLoad={() => {

                        var iframeWindow = this.refs.iframe.contentWindow;


                        if (this.state.websiteUrl) {
                            iframeWindow.postMessage(this.state.aclientId, this.state.websiteUrl);
                        }

                    }}
                    key={this.state.clearCache}
                    style={{ width: '100%', overflow: 'visible' }}
                    ref="iframe"
                    src={`${this.state.websiteUrl}?t=${this.state.clearCache}&aclientUuid=${this.state.aclientId}`}
                    // height={window.document.body.offsetHeight + 'px'}
                    height={this.state.iFrameHeight}
                    scrolling="yes"
                    frameBorder="0"
                />

            </Layout >
        );
    }
}


//将state.counter绑定到props的counter
const mapStateToProps = (state) => {
    console.log(state, 'state');
    return {
        userList: state.userList
    }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {

    //全量
    return bindActionCreators(actionCreators, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(Website);