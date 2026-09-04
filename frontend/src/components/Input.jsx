const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,

  // textarea
  textarea = false,
  rows = 4,

  // select
  select = false,
  options = [],
}) => {
  return (
    <div className="w-full">
      {label && (
        <p className="mb-2 block text-sm font-medium text-gray-600">{label}</p>
      )}

      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          className="focus:border-primary w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none"
        />
      ) : select ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="focus:border-primary w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none"
        >
          <option value="">{placeholder || "Select Option"}</option>

          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className="focus:border-primary w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm outline-none"
        />
      )}
    </div>
  );
};

export default Input;
