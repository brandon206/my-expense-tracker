const Input = ({ name = '', type, placeholder = '', inputStyle, required = '', handleChange }) => (
  <input className={inputStyle} name={name} onChange={handleChange} required={required} type={type} placeholder={placeholder}/>
);

export default Input;
