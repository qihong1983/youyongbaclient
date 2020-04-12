import React, {
    Component
} from 'react';

import {
    Link,
    IndexLink
} from 'react-router';


import {
    connect
} from 'react-redux';


import {
    bindActionCreators
} from 'redux';


import * as actionCreators from '../../actions/userList/list';

import {
    Layout,
    Menu,
    Breadcrumb,
    Icon,
    Card,
    Switch,
    List
} from 'antd';

// const WebView = require('react-electron-webview');


const WebView = require('react-electron-web-view');



const {
    Header,
    Content,
    Footer
} = Layout;


// import axios from 'axios';

class Website extends Component {

    constructor(props) {
        super(props);
        this.state = {
            websiteUrl: '',
            iFrameHeight: '0px',
            clearCache: '',
            data: '',
            aclientId: ''
        }
    }

    componentDidMount() {
        const electron = window.electron;

        const ipcRenderer = window.electron.ipcRenderer;



        this.webview = document.querySelector('webview');

        console.log(this.props.location.query, 'this.props.location.query');

        this.setState({
            websiteUrl: this.props.location.query.site,
            clearCache: this.props.location.query.timer,
            aclientId: this.props.location.query.aclientId,
            iFrameHeight: window.innerHeight + 'px'
        });



        // ipcRenderer.on('website', (event, arg, cacheTime) => {


        // console.log(arg);

        // this.setState({
        //     websiteUrl: arg,
        //     clearCache: cacheTime,
        //     iFrameHeight: window.innerHeight + 'px'
        // }, () => {


        // this.webview.addEventListener('dom-ready', (e) => {
        //     var iframeWindow = this.refs.iframe.contentWindow;

        //     if (this.state.websiteUrl) {
        //         iframeWindow.postMessage("发送给iframe的内容", this.state.websiteUrl);
        //     }


        //     // webview.addEventListener('message', function (event) {

        //     //     console.log(event.data, 'event.data');

        //     //     // this.setState({
        //     //     //     data: event.data
        //     //     // });

        //     // }.bind(this), false);
        // });
        // });
        // });


        // console.log(window.addEventListener, 'window.addEventListener');

        // window.addEventListener("message", function (event) {

        //     console.log(event);// {"isTrusted": "true"} || {"isTrusted": "false"} 
        // })


        // const webview = document.querySelector('webview');

        // console.log('okookokokokok');

        // webview.addEventListener('dom-ready', (e) => {
        //     // webview.openDevTools();
        //     console.log(webview.iframe);
        //     console.log('okookokokokok');
        //     // webview.
        //     // debugger;
        //     webview.addEventListener('ipc-message', (event) => {
        //         console.log(event.channel, 'event.channel')
        //         console.log('okookokokokok');
        //         // Prints "pong"
        //     });

        //     var iframeWindow = this.refs.iframe.contentWindow;
        //     console.log(this.state.websiteUrl, 'this.state.websiteUrl');
        //     if (this.state.websiteUrl) {
        //         iframeWindow.postMessage("发送给iframe的内容", this.state.websiteUrl);
        //     }

        //     //     console.log(webview, '######');

        //     //     console.log(webview.send, '######');
        //     webview.send('ping');

        //     // webview.send('webParent', '我是你爸爸');

        //     // webview.executeJavaScript(`navigator.userAgent`, function (str) {
        //     webview.executeJavaScript(`document.documentElement.innerHTML`, function (str) {
        //         console.log(str, 'strstr', new Date().getTime());
        //         // ipcRenderer.send('app-testtest', 'xxxxeeeessssaaa');
        //         //     that.setState({
        //         //         docStr: str
        //         //     })

        //         let doc = document.createDocumentFragment();
        //         console.log(doc, 'docdocdoc');
        //         let el = document.createElement('html')
        //         el.innerHTML = str
        //         doc.appendChild(el)
        //         var text = doc.querySelector('head').innerHTML
        //         //     // console.log('>>>head', $(doc).find('head title').html())
        //         //     // console.log('>>>body', $(doc).find('body').html())

        //         console.log(text, 'texttext');
        // })
        // });



    }





    render() {



        console.log(this.props, 'this.props');

        const data = [
            (<div>设置1 -- <Switch defaultChecked /></div>),
            (<div>设置2 -- <Switch defaultChecked /></div>),
            (<div>设置3 -- <Switch defaultChecked /></div>),
            (<div>设置4 -- <Switch defaultChecked /></div>),
            (<div>设置5 -- <Switch defaultChecked /></div>),
        ];



        return (
            <Layout className="layout" >

                {/* <webview ref="iframe" src={`${this.state.websiteUrl}?t=${this.state.clearCache}`} key={this.state.clearCache} style={{
                    display: "flex", height: window.innerHeight + 'px'
                }} ></webview> */}

                <div>{this.state.data}</div>
                {/* allow-forms allow-scripts allow-same-origin */}

                {/* allow-top-navigation allow-same-origin allow-forms allow-scripts */}
                <iframe
                    security="restricted"
                    sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups allow-modals"
                    id="iframeWindow"
                    onLoad={() => {
                        console.log(document.getElementById('iframeWindow').contentWindow);

                        var iframeWindow = this.refs.iframe.contentWindow;

                        console.log(iframeWindow, 'iframeWindow');

                        console.log(this.state.websiteUrl, "this.state.websiteUrl");

                        console.log(window.location, 'window');

                        console.log(this.props.location.query.site, 'this.props.location');

                        console.log(this.props.location.query.site.split("&"), 'this.props.location.query.site');


                        // var setAclientId = '';
                        // var re = /aclientId=/g;
                        // if (this.props.location.query.site.split("?").length > 1) {

                        //     console.log(this.props.location.query, '###');

                        //     console.log(this.props.location.query.aclientId, '****');

                        //     if (this.props.location.query.aclientId == undefined) {
                        //         var paramsArr = this.props.location.query.site.split("?")[1].split("&");
                        //         //http://asdf.heqi.io/index.php?time=33&name=qihong
                        //         console.log(this.props.location.query.site, '这里显示id');
                        //         console.log('这里走到了1');
                        //         // console.log(paramsArr, 'paramsArr');
                        //         paramsArr.forEach((v, k) => {
                        //             if (re.test(v)) {

                        //                 console.log('这里走到了');
                        //                 setAclientId = v.split("=")[1];
                        //             }
                        //         });
                        //     } else {
                        //         setAclientId = this.props.location.query.aclientId;
                        //     }

                        // }

                        // if (this.props.location.query.site.split("&").length > 1) {
                        //     console.log('asdfasdf');
                        // }



                        if (this.state.websiteUrl) {
                            // iframeWindow.postMessage(setAclientId, this.state.websiteUrl);
                            iframeWindow.postMessage(this.state.aclientId, this.state.websiteUrl);
                        }





                        // }

                        window.addEventListener('message', function (event) {

                            console.log(event.data);

                            // this.setState({
                            //     data: event.data
                            // });

                        }.bind(this))
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