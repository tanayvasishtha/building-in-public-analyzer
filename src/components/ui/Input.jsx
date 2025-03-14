export default function Input({ label, value, onChange, placeholder = "", required = false }) {
    return (
      <div className="mb-4">
        {label && (
          <label className="block text-sm font-medium mb-1">{label}</label>
        )}
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  }
  