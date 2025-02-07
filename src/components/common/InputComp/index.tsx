import { Input } from "antd";

function InputComp({ label }: { label: string }) {
  const handleChangeInput = () => {};
  return (
    <div className="flex items-center justify-between mb-6">
      <label className="w-2/3">
        <span className="text-red-600 me-1">*</span>
        {label}
      </label>
      <Input onChange={handleChangeInput} />
    </div>
  );
}

export default InputComp;
