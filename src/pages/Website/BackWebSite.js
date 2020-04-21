import React, {
    Component
} from 'react';

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

class BackWebSite extends Component {

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

        this.setState({
            websiteUrl: this.props.location.query.site,
            clearCache: this.props.location.query.timer,
            aclientId: this.props.location.query.aclientId,
            iFrameHeight: window.innerHeight + 'px'
        });
    }

    render() {

        return (
            <Layout className="layout" >

                <div>{this.state.data}</div>

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
                    src={`${this.state.websiteUrl}`}
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
    return {
        userList: state.userList
    }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {

    //全量
    return bindActionCreators(actionCreators, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(BackWebSite);