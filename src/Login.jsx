import React, {useEffect, useState} from 'react';
import {HomeContainer} from "./common/style";
import HomeHeader from "./HomeHeader";
import {Container, Row, Col, Form, Button, Alert} from 'react-bootstrap';
import {setCookie, getCookie} from './utils/helper';

function Login() {


  const [loginParams, setLoginParams] = useState({email: '', password: ''});
  const [passwordWrong, setPasswordWrong] = useState(false);
  const [emailNeedConfirm, setEmailNeedConfirm] = useState(false);
  const [needLogin, setNeedLogin] = useState(false);
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const colStyle = {xs: 12, sm: {span: 8, offset: 2}, md: {span: 6, offset: 3}};

    useEffect(() => {
      const _emailConfirmed = window.ttnote.searchObject().hasOwnProperty('emailConfirmed') ;
      if (_emailConfirmed)
        setEmailConfirmed(true);

      const _needLogin = window.ttnote.searchObject().hasOwnProperty('needLogin') ;
      if (_needLogin)
        setNeedLogin(true);
    }, []);

    const handleOnChange = (e) => {
        const type = e.target.name;
        const value = e.target.value;
        const _loginParams = {...loginParams};
        _loginParams[type] = value;
       setLoginParams(_loginParams)
    };

    const handleSubmit = (e) => {
        setPasswordWrong(false);
        setEmailNeedConfirm(false);
        e.preventDefault();
        setDisabled(true);

        const url = window.ttnote.baseUrl + '/users/login';
        window.fetch(url, {
            method: 'post',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({user: loginParams})
        })
            .then(res => {
                if (res.status >= 200 && res.status < 300 ) {
                  const responseToken = res.headers.get('authorization');
                  window.ttnote.token = responseToken;
                  setCookie('token', responseToken, 1);
                    res.json().then(res => {
                      window.ttnote.user = res;
                      localStorage.setItem('ttnote', JSON.stringify(res));
                      window.ttnote.goto('/note');
                  })
                }

              if (res.status === 401) {
                res.json()
                  .then(response => {
                    switch (response.error) {
                      case 'Invalid Email or password.':
                        setPasswordWrong(true);
                        break;
                      case 'You have to confirm your email address before continuing.':
                        setEmailNeedConfirm(true);
                        break;
                      default :
                        break;
                    }
                  });
                setDisabled(false);
              }
            })
            .catch(err => {
                alert(err);
                setDisabled(false);
            })

    };

  if (getCookie('token'))
    return <h2>你已登录</h2>;
  return (
        <HomeContainer>
            <HomeHeader/>
            <Container>
                {emailConfirmed &&
                <Row className={'mt-2'}>
                    <Col {...colStyle}>
                        <Alert
                            variant="success"
                            onClose={() => setEmailConfirmed(false)}
                            dismissible
                        >
                            <Alert.Heading>帐户激活成功</Alert.Heading>
                            <div>
                                请登录后继续
                            </div>
                        </Alert>
                    </Col>
                </Row>
                }
                {needLogin &&
                <Row className={'mt-2'}>
                    <Col {...colStyle}>
                        <Alert
                            variant={'primary'}
                            dismissible={true}
                            onClose={() => setNeedLogin(false)}
                        >
                            需要登录后才能继续！
                        </Alert>
                    </Col>
                </Row>
                }
                {passwordWrong &&
                <Row className={'mt-2'}>
                    <Col {...colStyle}>
                        <Alert
                            variant={'primary'}
                            dismissible={true}
                            onClose={() => setPasswordWrong(false)}
                        >
                            帐户或密码错误！
                        </Alert>
                    </Col>
                </Row>
                }
                {emailNeedConfirm &&
                <Row className={'mt-2'}>
                    <Col {...colStyle}>
                        <Alert
                            variant={'primary'}
                            dismissible={true}
                            onClose={() => setEmailNeedConfirm(false)}
                        >
                            帐号需要激活！
                        </Alert>
                    </Col>
                </Row>
                }
                <Row className={'mt-2'}>
                    <Col {...colStyle}>
                        <h4>登录到蕃茄时光</h4>
                    </Col>
                </Row>
                <Form validated={false} onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col} {...colStyle}>
                            <Form.Control
                                type="email"
                                name={'email'}
                                placeholder="输入邮箱"
                                value={loginParams.email}
                                onChange={handleOnChange}
                                required
                            />
                        </Form.Group>
                    </Row>
                    <Row className={'mb-3'}>
                        <Col {...colStyle}>
                            <Form.Control
                                type="password"
                                name={'password'}
                                placeholder="输入密码"
                                value={loginParams.password}
                                onChange={handleOnChange}
                                required
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col {...colStyle}>
                           <Button
                               variant={'primary'}
                               type='submit'
                               block
                               disabled={disabled}
                           >
                               { disabled? '登录...' : '登录' }
                           </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </HomeContainer>
    )
}

export default Login;