import style from './AuthForm.module.css';

function AuthForm() {
  return (
    <form className={style.form}>
      <input type="text" placeholder="Username" />
      <input type="text" placeholder="Password" />
      <label>
        <input type="checkbox" />
        <span>Запомнить меня</span>
      </label>
      <button>Вход</button>
    </form>
  );
}

export default AuthForm;
