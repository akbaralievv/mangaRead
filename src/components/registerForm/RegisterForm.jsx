import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { postSignUp } from '../../redux/slices/SignUpSlice';

import style from './RegisterForm.module.css';

function RegisterForm() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    nickname: '',
    image_file: null,
    password: '',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key]);
    }

    dispatch(postSignUp(data));
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <label>
        <img
          src={formData.image_file && URL.createObjectURL(formData.image_file)}
          alt=""
          className={!formData.image_file ? style.notPhoto : ''}
        />
        <input type="file" onChange={handleChange} name="image_file" style={{ display: 'none' }} />
        Выбрать
      </label>
      <input
        type="text"
        placeholder="Username"
        name="username"
        minLength={10}
        maxLength={50}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Nickname"
        name="nickname"
        minLength={10}
        maxLength={60}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        minLength={8}
        maxLength={40}
        onChange={handleChange}
      />
      <button type="submit">Регистрация</button>
    </form>
  );
}

export default RegisterForm;
