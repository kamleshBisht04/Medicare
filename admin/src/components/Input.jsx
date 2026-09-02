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
        <p className="mb-1 block text-sm font-normal text-gray-600">{label}</p>
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
          className="mb-2 w-full rounded-md border-2 border-gray-200 bg-white px-2 py-2 text-sm outline-none focus:border-2 focus:border-[#A9A9A9]"
        />
      )}
    </div>
  );
};

export default Input;
