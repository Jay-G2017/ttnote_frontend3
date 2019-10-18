import React, {useState} from 'react';
import {HomeContainer} from "./common/style";
import HomeHeader from "./HomeHeader";
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import {getCookie} from "./utils/helper";

function Registration() {
    const [registrationParams, setRegistrationParams] = useState({email: '', password: '', passwordConfirm: ''});

    const [passwordNotSame, setPasswordNotSame] = useState(false);
    const [passwordTooShort, setPasswordTooShort] = useState(false);
    const [emailTaken, setEmailTaken] = useState(false);

    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [email, setEmail] = useState(false);

    const [disabled, setDisabled] = useState(false);
    const colStyle = {xs: 12, sm: {span: 8, offset: 2}, md: {span: 6, offset: 3}};

    const handleOnChange = (e) => {
        const type = e.target.name;
        const value = e.target.value;
        const _loginParams = {...registrationParams};
        _loginParams[type] = value;
        setRegistrationParams(_loginParams)
    };

    const handleSubmit = (e) => {
        setPasswordTooShort(false);
        setPasswordNotSame(false);
        setEmailTaken(false);
        e.preventDefault();
        if (registrationParams.password.length < 6)
            return setPasswordTooShort(true);

        if (registrationParams.password !== registrationParams.passwordConfirm)
            return setPasswordNotSame(true);
        setDisabled(true);

        const url = window.ttnote.baseUrl + '/users';
        window.fetch(url, {
            method: 'post',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({user: registrationParams})
        })
            .then(res => {
                if (res.status >= 200 && res.status < 300 ) {
                    res.json().then(res => {
                        console.log(res);
                        setEmail(res.email);
                        setRegistrationSuccess(true);
                    });
                }

                if (res.status === 422) {
                    setEmailTaken(true);
                }
                setDisabled(false);
            })
            .catch(err => {alert(err)})

    };

    if (getCookie('token')) {
        return <h2>你已登录</h2>;
    }

    return (
        <HomeContainer>
            <HomeHeader/>
            <Container>
                    <Row className={'mt-4'}>
                        <Col {...colStyle}>
                            <Alert
                                variant="success"
                                show={registrationSuccess}
                            >
                                <Alert.Heading>感谢你注册蕃茄时光</Alert.Heading>
                                <div>
                                    {`我们发送了一封邮件到你的${email}邮箱。`}
                                </div>
                                <div>
                                    请查收并点击链接来激活该帐户。
                                </div>
                            </Alert>
                        </Col>
                    </Row>
                {!registrationSuccess &&
                    <>
                        <Row className={'mt-2'}>
                            <Col {...colStyle}>
                                <h4>注册蕃茄时光</h4>
                            </Col>
                        </Row>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Form.Group as={Col} {...colStyle}>
                                    <Form.Control
                                        type="email"
                                        name={'email'}
                                        placeholder="输入邮箱"
                                        value={registrationParams.email}
                                        onChange={handleOnChange}
                                        required
                                        isInvalid={emailTaken}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        邮箱已经注册
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className={'mb-3'}>
                                <Col {...colStyle}>
                                    <Form.Control
                                        type="password"
                                        name={'password'}
                                        placeholder="输入密码"
                                        value={registrationParams.password}
                                        onChange={handleOnChange}
                                        isInvalid={passwordTooShort}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        长度不能少于6位
                                    </Form.Control.Feedback>
                                </Col>
                            </Row>
                            <Row className={'mb-3'}>
                                <Form.Group as={Col} {...colStyle}>
                                    <Form.Control
                                        type="password"
                                        name={'passwordConfirm'}
                                        placeholder="密码确认"
                                        value={registrationParams.passwordConfirm}
                                        onChange={handleOnChange}
                                        isInvalid={passwordNotSame}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        密码不相同
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col {...colStyle}>
                                    <Button
                                        variant={'primary'}
                                        type='submit'
                                        block
                                        disabled={disabled}
                                    >
                                        {disabled ? '注册...' : '注册'}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </>
                }
            </Container>
        </HomeContainer>
    )
}

export default Registration;
