import { useState } from 'react';
import style from './RegisterForm.module.css';

function RegisterForm() {
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className={style.form}>
      <label>
        <img src={value} alt="photo" className={!value ? style.notPhoto : ''} />
        <input
          type="file"
          placeholder="Username"
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        выбрать
      </label>
      <input type="text" placeholder="username" />
      <input type="text" placeholder="nickname" />
      <input type="text" placeholder="password" />
      <button>регистрация</button>
    </form>
  );
}

export default RegisterForm;
