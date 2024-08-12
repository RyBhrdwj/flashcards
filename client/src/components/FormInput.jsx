export default function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  disabled,
}) {
  return (
    <div className="relative z-0 w-full">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`rounded-md peer block w-full appearance-none border-0 border-b-[2px] bg-transparent px-1 py-2.5 text-xl text-gray-600 focus:border-[#FF6464] focus:outline-none focus:ring-0 ${
          disabled ? "border-gray-300" : "border-gray-400"
        }`}
        placeholder=" "
        disabled={disabled}
      />
      <label
        htmlFor={name}
        className="absolute top-2 -z-10 origin-[0] -translate-y-8 scale-75 transform text-xl text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-[#FF6464]"
      >
        {label}
      </label>
    </div>
  );
}
