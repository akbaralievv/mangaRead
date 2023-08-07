import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './AuthForm.module.css';
import { postSignIn, setRememberMe } from '../../redux/slices/SignInSlice';

function AuthForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { rememberMe } = useSelector((state) => state.SignInSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      const parsedUser = JSON.parse(rememberedUser);
      setFormData(parsedUser);
    }
  }, []);

  const handleRememberMeChange = () => {
    dispatch(setRememberMe(!rememberMe));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    dispatch(postSignIn({ data, rememberMe }));
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        name="username"
        onChange={handleChange}
        minLength={10}
        maxLength={50}
        value={formData.username || ''}
      />
      <input
        type="text"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        minLength={8}
        maxLength={40}
        value={formData.password || ''}
      />
      <label>
        <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />
        <span>Запомнить меня</span>
      </label>
      <button type="submit">Вход</button>
    </form>
  );
}

export default AuthForm;
