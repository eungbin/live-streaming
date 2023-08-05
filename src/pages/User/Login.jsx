import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState({ text: '', display: 'none' });

  const doLogin = () => {
    const idElement = document.getElementById('id');
    const passwordElement = document.getElementById('password');

    const id = idElement.value;
    const password = passwordElement.value;

    if(!(!!id)) {
      setErrorText({ text: '아이디를 입력해주세요.', display: 'block' }); idElement.focus(); return;
    } else if(!(!!password)) {
      setErrorText({ text: '비밀번호를 입력해주세요.', display: 'block' }); passwordElement.focus(); return;
    }
    
    axios.post('http://localhost:4000/login', null, { params: { id: id, password: password } })
    .then(res => {
      setErrorText({ text: '', display: 'none' });
      if(res.status === 200) {
        alert('로그인 성공!');
        navigate('/');
      }
    })
    .catch(err => {
      if(err.response.status === 401 && err.response.data === 'NOT_MATCH') {
        setErrorText({ text: '아이디 혹은 비밀번호가 일치하지 않습니다.', display: 'block' });
      } else {
        alert('예기치 못한 서버 오류가 발생하였습니다.')
      }
    })
  }

  return (
    <Wrapper>
      <LoginBox>
        <LoginBoxHeader>C H A T T I N G</LoginBoxHeader>
        <LoginInputContainer>
          <LoginBoxInner>ID</LoginBoxInner>
          <LoginBoxInput type='text' id='id' />
        </LoginInputContainer>
        <LoginInputContainer>
          <LoginBoxInner>PASSWORD</LoginBoxInner>
          <LoginBoxInput type='password' id='password' />
        </LoginInputContainer>
        <ErrorText display={errorText.display}>{errorText.text}</ErrorText>
        <Link to='/register' style={{textDecoration:'none'}}><RegisterBox><RegisterText>Click for Register</RegisterText></RegisterBox></Link>
        <LoginButton onClick={doLogin}>Click for login</LoginButton>
      </LoginBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  min-width: 360px;
  background-color: #191F2B;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  box-shadow: 0px 0px 20px 5px #191F2B;
`;

const LoginBoxHeader = styled.header`
  font-size: 1.5rem;
  color: white;
  text-shadow: 0px 0px 15px white;
  margin-bottom: 36px;
`;

const LoginInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;
const LoginBoxInner = styled.span`
  font-size: 1rem;
  color: white;
  text-shadow: 0px 0px 10px white;
  flex-grow: 1;
  width: 90px;
  text-align: left;
`;
const LoginBoxInput = styled.input`
  min-width: 160px;
  min-height: 20px;
  padding: 4px;
  flex-grow: 2;
  box-shadow: 0px 0px 5px 1px white;
  border: 0px;
`;

const LoginButton = styled.button`
  padding-top: 12px;
  padding-bottom: 12px;
  margin-top: 12px;
  margin-bottom: 4px;
  background-color: #4A5262;
  border: 0px;
  color: white;
  box-shadow: 0px 0px 5px 1px #4A5262;
  border-radius: 10px;
  cursor: pointer;
`;

const RegisterBox = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 4px;
`;
const RegisterText = styled.span`
  color: white;
  font-size: 0.8rem;
  text-shadow: 0px 0px 10px white;
  cursor: pointer;
`;

const ErrorText = styled.span`
  color: #d22e2e;
  font-size: 0.8rem;
  display: ${(props) => props.display};
`;