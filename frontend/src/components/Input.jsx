const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <div className="w-full">
      {label && <p className="mb-[2px]">{label}</p>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-1 w-full rounded border border-zinc-300 p-2"
      />
    </div>
  );
};

export default Input;
