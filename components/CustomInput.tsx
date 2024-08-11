import Link from "next/link";


const CustomInput = ({
  htmlFor,
  inputType,
  label,
  type,
  autoComplete,
  signInForm = true,
}: {
  htmlFor: string;
  inputType: string;
  label: string;
  signInForm?: boolean; // true | false
  autoComplete?: string; // 'on' | 'off' | 'name' | 'email' | 'username' | 'new-password' | 'current-password' | 'street-address' | 'address-line1' | 'address-line2' | 'address-city' | 'address-state' | 'address-zip' | 'country' | 'tel' | 'tel-country-code' | 'email-address' | 'password
  type?: string; // 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date' | 'datetime-local' | 'month' | 'week' | 'time' | 'color'
}) => {
  return (
    <div>
      <div className={type === "password" ? "flex items-center justify-between" : ""}>
        <label htmlFor={htmlFor} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
        {type === "password" && (
          <div className={signInForm ? "text-sm" : "hidden"}>
            <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </Link>
          </div>
        )}
      </div>
      <div className="mt-2">
        <input
          id={htmlFor}
          name={htmlFor}
          type={inputType}
          required
          autoComplete={autoComplete}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};
export default CustomInput;
