import React, {
  Component
} from 'react';
import './App.css';
// import axios from 'axios';
import io from 'socket.io-client';
import moment from 'moment';

import {
  connect
} from 'react-redux';

import {
  bindActionCreators
} from 'redux';

import { SketchPicker } from 'react-color';


import * as actionCreators from './actions/App/App';

import _ from 'lodash';


import {
  Layout,
  Icon,
  Card,
  Avatar,
  Button,
  Divider,
  Modal,
  Form,
  Input,
  List,
  notification,
  Progress,
  Switch
} from 'antd';

const {
  Header,
  Content,
  Footer
} = Layout;


//确认弹出

const confirm = Modal.confirm;

const { Meta } = Card;


const ipcRenderer = window.electron.ipcRenderer;

const app = window.electron.app;
const EMenu = window.electron.remote.Menu;

const EMenuItem = window.electron.remote.MenuItem;

const shell = window.electron.shell;

//uuid
const uuidv1 = require('uuid/v1');


const packageApp = require('../package.json');


if (process.platform === 'darwin') {
  const template = [
    {
      label: "Ale Client",
      submenu: [
        { label: "退出", accelerator: "Command+Q", click: function () { app.quit(); } }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { label: "复制", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "粘贴", accelerator: "CmdOrCtrl+V", selector: "paste:" },
      ]
    }
  ];
  EMenu.setApplicationMenu(EMenu.buildFromTemplate(template))
} else {
  EMenu.setApplicationMenu(null)
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: null,
      uuid: null,
      shuiyinState: false
    }
  }

  componentDidMount() {



    this.getList();
    //检测更新 

    ipcRenderer.send('checkForUpdate');

    //发送数据 
    ipcRenderer.send('app-getData');

    //接收版本和时间
    ipcRenderer.on('app-getVersionTime', (event, arg, arg2) => {

      this.props.App_actions.setVersion(arg);
      this.props.App_actions.sendVersionTime(arg2);

    });


    //获取uuid
    ipcRenderer.send('app-getUuid');

    //设置uuid并显示通知
    ipcRenderer.on('app-setUuid', (event, arg, AppPlatform) => {

      console.log(arg, 'arg');

      this.setState({
        uuid: arg
      })


      // let socket = io('http://localhost:3001');

      console.log(packageApp.platform, 'packageApp.platform');
      console.log(AppPlatform, 'AppPlatform');


      var socket = io('http://youyong.ba:8084');
      // if (AppPlatform == 'test') {
      //   var socket = io('http://node-server.heqi.io');
      // } else if (AppPlatform == 'prod') {
      //   console.log('here here here here prod')
      //   var socket = io('http://node-server.heqiauto.com');
      // } else if (AppPlatform == 'pre') {
      //   var socket = io('http://pre-node-server.heqiauto.com');
      // } else {
      //   var socket = io('http://node-server.heqiauto.com');
      // }


      socket.on(`client/${arg}`, function (obj) {
        console.log(obj, 'obj');

        ipcRenderer.send('app-outputWSData', obj);

      })

    })





    //接收数据
    ipcRenderer.on('app-sendData', (event, arg, arg2) => {

      if (arg2 == 'add') {
        notification["success"]({
          message: '添加成功'
        });
      } else if (arg2 == 'edit') {
        notification["success"]({
          message: '修改成功'
        });
      }

      this.props.App_actions.setItems(arg);
    });


    //发现新版本
    ipcRenderer.on('app-getNewVersion', (event, arg) => {

      this.props.App_actions.setNewVersion(arg);

    });



    //下载进度条
    ipcRenderer.on('app-downloadProgress', (event, arg) => {

      if (arg.percent >= 100) {

        this.props.App_actions.setNewVersion(false);

        this.props.App_actions.setPercent(parseInt(arg.percent, 10));

        this.props.App_actions.setResetUpdate(true);

      } else {

        this.props.App_actions.setPercent(parseInt(arg.percent, 10));

      }

    });

    //下载完成


    ipcRenderer.on('app-updateDownload', (event, arg) => {

      confirm({
        title: '已更新到最新版本，是否重新启动？',
        content: '如果重新启动，您将使用最新版本',
        okText: '是',
        cancelText: '否',
        onOk() {
          ipcRenderer.send('isUpdateNow');
        },
        onCancel() { },
      });

      this.props.App_actions.setNewVersion(false);

      this.props.App_actions.setPercent(100);
      this.props.App_actions.setResetUpdate(true);


    });


    this.initMenu();
  }


  async getList() {
    // console.log(this.props.App_actions.getList(), 'this.props');
    this.props.App_actions.getList()
  }

  clickHandle = (img) => {
    ipcRenderer.send('toggle-image', img);
  }

  initMenu = () => {
    EMenu.setApplicationMenu(null);
    // EMenu.setApplicationMenu(menu);

  }

  closeApp() {
    // alert(33);

    ipcRenderer.send('close-main');

  }

  openWebSite(img) {


    console.log(img, 'imgimgimg');

    console.log(img.split('?'), "img.split('?')");
    console.log(this.state.uuid, 'this.state.uuid');
    var urls = img;
    var urlParams = '';
    if (img.split('?').length > 1) {
      urlParams = `${urls}&aclientId=${this.state.uuid}`;
    } else {
      urlParams = `${urls}?aclientId=${this.state.uuid}`;
    }
    // shell.openExternal(img);
    ipcRenderer.send('webSiteData', urlParams, this.state.uuid);
  }

  addAddress(e) {

    this.props.App_actions.setFormViewInfo({
      title: "添加应用",
      canelAddress: "取消添加",
      okAddress: "确认添加",
      flag: "add"
    });

    this.props.App_actions.addAddressVisible(true);

  }

  addAddressOk(e) {

    this.refs.addAddress.props.onSubmit();

  }

  addAddressCancel(e) {

    this.props.form.resetFields();

    this.props.App_actions.addAddressVisible(false);

  }

  handleChangeComplete = (color) => {

    this.props.App_actions.setBackGround(color.hex);
  };

  changeBC() {

    if (this.props.App_reduces.buttonChangeColorLogo) {

      this.props.App_actions.setButtonChangeColorLogo(false);
    } else {
      this.props.App_actions.setButtonChangeColorLogo(true);

    }
  }


  handleSubmit = e => {
    // e.preventDefault();
    this.props.form.validateFields((err, values) => {

      if (!err) {
        this.props.App_actions.addAddressVisible(false);

        var data = {
          id: uuidv1(),
          title: values.title,
          address: values.address,
          sortTitle: values.title.substr(0, 2),
          color: this.props.App_reduces.background,
          isEdit: true
        }

        if (this.props.App_reduces.formViewInfo.flag === 'add') {

          data.id = uuidv1();
          ipcRenderer.send('app-addAddress', data);

        } else {

          data.id = this.props.App_reduces.editObj.id;
          ipcRenderer.send('app-editAddress', data);

        }


        this.props.form.resetFields();

        this.props.App_actions.setBackGround('#d8d8d8');

      }


    });
  };

  removeAllAddress(e) {

    confirm({
      title: '是否确定清空应用？',
      onOk() {
        ipcRenderer.send('app-removeAddress');
      },
      onCancel() { },
      cancelText: '取消',
      okText: '确定'
    });

  }

  removeCard(e) {

    let id = e.currentTarget.dataset.id;

    confirm({
      title: '是否确定删除此条应用？',
      onOk() {
        // console.log(event);

        ipcRenderer.send('app-removeCard', id);
      },
      onCancel() { },
      cancelText: '取消',
      okText: '确定'
    });

  }

  editAddress(e) {

    var oneData = _.find(this.props.App_reduces.items, (o) => {
      return o.id === e.currentTarget.dataset.id;
    });

    this.props.App_actions.setFormViewInfo({
      title: "修改应用",
      canelAddress: "取消修改",
      okAddress: "确认修改",
      flag: "edit"
    });

    this.props.form.setFieldsValue({
      address: oneData.address,
      title: oneData.title
    });

    this.props.App_actions.addAddressVisible(true);


    this.props.App_actions.setEditObj(oneData);

    this.props.App_actions.setBackGround(oneData.color);

  }


  resetUpdateBtn() {
    ipcRenderer.send('isUpdateNow');
  }


  shuiyin() {
    this.setState({
      shuiyinState: !this.state.shuiyinState
    },() => {
      ipcRenderer.send('shuiyin', this.state.shuiyinState);
    });
    

  }

  /**
   * 手动检测更新
   */
  checkForUpdate() {
    ipcRenderer.send('checkForUpdate');
  }


  reflash() {
    this.getList();
  }
  render() {

    const { getFieldDecorator } = this.props.form;


    console.log(this.props, 'this.props');

    return (
      <Layout className="App" height={window.document.body.offsetHeight + 'px'}>
        {/* <div className="optionWindow"> */}
        {/* <a href="javascript:void(0)">
            最小化
          </a>
          <a href="javascript:void(0)" onClick={() => {
            ipcRenderer.send('max');
          }}>
            最大化
          </a> */}


        {/* <a href="javascript:void(0)" onClick={() => {
            ipcRenderer.send('min');
          }}>
            关闭
          </a> */}
        {/* </div> */}
        <Header className="layout_header">
          <div className="logo">游泳吧</div>

          <div className="closeWindows" title="关闭" onClick={() => {
            ipcRenderer.send('min');
          }}>

            

            <Icon type="close">

            </Icon>
           

          </div>
          {/* <div className="banner" /> */}
          {/* <span className="checkUpdate" onClick={this.checkForUpdate.bind(this)}>检查更新{this.props.App_reduces.newVersion ? (<i className="checkTxing"></i>) : null}</span> */}
        </Header>
        <Content className="layout_content">

          <Card className="region-card" title="活动列表" extra={<div><Button type="primary" className="addressBtn" onClick={this.addAddress.bind(this)} icon="plus" size={'large'} >
            发布活动
          </Button>
            <Divider type="vertical" style={{ height: '39px' }} />
            <Button className="removeAllAddress" onClick={this.removeAllAddress.bind(this)} size={'large'} >
              个人中心
            </Button>

            <Divider type="vertical" style={{ height: '39px' }} />
            <Button className="removeAllAddress" onClick={this.reflash.bind(this)} size={'large'} >
              刷新
            </Button>
            <Divider type="vertical" style={{ height: '39px' }} />
            <Button className="removeAllAddress" onClick={this.removeAllAddress.bind(this)} size={'large'} >
              录屏
            </Button>


            <Divider type="vertical" style={{ height: '39px' }} /> 
            <Button className="removeAllAddress" onClick={this.shuiyin.bind(this)} size={'large'} >
              {this.state.shuiyinState?`关闭水印`:`打开水印`}
            </Button>
          </div>}>
            <List
              grid={{
                gutter: 30,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 6,
                xxl: 3,
              }}
              className="App-list"
              locale={{ "emptyText": "您尚未添加应用，点击【添加应用】去添加吧～" }}
              dataSource={this.props.App_reduces.list}
              renderItem={item => (
                <List.Item >
                  <Card className="itemCard" cover={<Avatar className="ava"  key={new Date().getTime()} style={{ backgroundColor: item.color, marginRight: '16px', verticalAlign: 'middle' }} size={64}>
                    {item.sendUser.substr(0,2)}
                  </Avatar>} extra={
                    item.isEdit ? (<div>
                      <Icon type="edit" style={{ marginRight: '8px' }} className="smallCardEdit" data-id={item.id}  />
                      <Icon type="close" data-id={item.id} className="smallCardClose" onClick={this.removeCard.bind(this)} />
                    </div>) : (<div style={{ visibility: "hidden" }}>占位</div>)
                  }>
                    <Meta title={item.title} description={`报名截止时间：${item.startTime}费用：${item.price}元 `}/>
                  </Card>
                </List.Item>
              )}
            />

          </Card>

          <Modal
            className="App-addressModal"
            title={this.props.App_reduces.formViewInfo ? this.props.App_reduces.formViewInfo.title : ''}
            visible={this.props.App_reduces.addAddressVisible}
            onOk={this.addAddressOk.bind(this)}
            onCancel={this.addAddressCancel.bind(this)}
            okText={this.props.App_reduces.formViewInfo ? this.props.App_reduces.formViewInfo.okAddress : ''}
            cancelText={this.props.App_reduces.formViewInfo ? this.props.App_reduces.formViewInfo.canelAddress : ''}
          >
            <Form onSubmit={this.handleSubmit} ref="addAddress" className="login-form" layout={"horizontal"}>
              <Form.Item label="标题">
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: '标题不能为空' }],
                })(
                  <Input
                    placeholder="这里输入标题"
                  />,
                )}
              </Form.Item>


              <Form.Item label="应用地址">
                {getFieldDecorator('address', {
                  rules: [{
                    required: true,
                    whitespace: true,
                    type: 'string',
                    message: '应用地址不能为空'
                  }, {
                    pattern: new RegExp('^(https?|http|file):\/\/(.+)(aleqipei.io|ale.com|heqi.com|aleqipei.com|heqiauto.com|heqiauto.io|heqi.com|heqi.io).*$', 'g'),
                    message: '请正确输入应用地址(https://|http://)xxx.heqiauto.com'
                  }]
                })(
                  <Input
                    placeholder={packageApp.env == 'aleqipei' ? "http://s.aleqipei.com" : "http://erp.heiqiauto.com"}
                  />,
                )}
              </Form.Item>
              <Form.Item label="颜色">

                <Button className="select-color-button" onClick={this.changeBC.bind(this)} style={{ marginRight: "16px" }}>选择颜色</Button>
                <Avatar style={{ backgroundColor: this.props.App_reduces.background, marginRight: '16px', verticalAlign: 'middle' }} size={39}>
                  例
                </Avatar>
                {
                  this.props.App_reduces.buttonChangeColorLogo ? (<SketchPicker style={{ marginTop: '16px' }}
                    color={this.props.App_reduces.background}
                    onChangeComplete={this.handleChangeComplete}
                  />) : null
                }

              </Form.Item>

            </Form>
          </Modal>
        </Content>
        <Footer className="layout_footer">

          {/* <span className="footerInfo">版本 V{this.props.App_reduces.version} www.aleqipei.com 2016-2019© All Rights Reserved</span> */}
              <span className="footerInfo">[{this.state.uuid}]版本号【{this.props.App_reduces.version}】youyong.ba(demo)</span>
          
          <iframe
            style={{ width: '100%', overflow: 'visible' }}
            ref="iframe"
            src={"http://client.aleqipei.com"}
            // height={window.document.body.offsetHeight + 'px'}
            height={"0px"}
            scrolling="yes"
            frameBorder="0"
          />

        </Footer>
      </Layout>
    );
  }
}


//将state绑定到props
const mapStateToProps = (state) => {
  return {
    App_reduces: state.Reducers.App
  }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {

  //全量
  return {
    App_actions: bindActionCreators(actionCreators, dispatch)
  };

};

App = Form.create({ name: 'normal_login' })(App);

export default connect(mapStateToProps, mapDispatchToProps)(App);
