import React, { useState } from 'react';
// import { logIn } from '../../services/auth-services';
import { useNavigate } from 'react-router-dom';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import sprite from '../../sourse/sprite.svg';
import { login } from 'redux/auth/authOperations';
import { useDispatch } from 'react-redux';
// import { setUser, setToken } from '../../redux/auth/authSlice';
import { PasswordToggle, PasswordInputField, Menu, Inputs, Container, PasswordInput, PasswordIcon, Content, Svg, LoginBtn, StyledRegistrationLink, StyledLink } from "./LoginForm.styled"
import { setToken } from 'redux/auth/authSelectors';

function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword ] = useState(false);
  const dispatch = useDispatch();


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   logIn({
  //     email: event.target.elements.email.value,
  //     password: event.target.elements.password.value,
  //   }).then(() => {console.log('Успішно залогінено')
  //   // Ось тут мені потрібно зберегти дані
  //   navigate('/home')})
  // }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   logIn({
  //     email: event.target.elements.email.value,
  //     password: event.target.elements.password.value,
  //   })
  //     .then((response) => {
  //       console.log('Успішно залогінено');
  //       const { user, token } = response.data;
  //       dispatch(setUser(user));
  //       dispatch(setToken(token));
  //       navigate('/home');
  //     })
  //     .catch((error) => console.log(error));
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentUser = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    }

    if(currentUser) {
      dispatch(login(currentUser, setToken));
      navigate('/home');
    } else {
      console.log("Error");
      navigate('/auth/login');
    }
      // .then((response) => {
      //   console.log('Успішно залогінено');
      //   // const { user, token } = response.data;
      //   // dispatch(setUser(user));
      //   // dispatch(setToken(token));
      //   // localStorage.setItem('token', token); // Зберегти токен у localStorage
      //   navigate('/home');
      // })
      // .catch((error) => console.log(error));
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Content>
          <Menu>
            <StyledRegistrationLink href="register" underline="none">Registration</StyledRegistrationLink>
            <StyledLink href="login" underline="none">Log In</StyledLink>
          </Menu>
          <Inputs>
            <input name='email' type="email" placeholder="Email" />
            <PasswordInput>
            <PasswordInputField name='password' type={showPassword ? 'text' : 'password'} placeholder="Password" />
              <PasswordToggle className={`${PasswordToggle} ${PasswordIcon}`} onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <PasswordIcon icon={faEyeSlash} width='18px' />
                ) : (
                  <Svg><use xlinkHref={`${sprite}#icon-eye`} style={{ color:'#737373' }} /></Svg>
                )}
              </PasswordToggle>
            </PasswordInput>
          </Inputs>
          <LoginBtn>Log In Now</LoginBtn>
        </Content>
      </form>
    </Container>
  );
}

export default LoginPage;
