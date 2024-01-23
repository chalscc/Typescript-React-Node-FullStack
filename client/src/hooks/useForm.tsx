import { ChangeEvent, useState } from "react";

export const useForm = <T extends Object>(initialState: T) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = target;

    const inputValue = (type === 'checkbox') ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue
    });
  };

  const resetState = () => {
    setFormData(initialState);
  };

  return {
    formData,
    handleChange,
    resetState,
    ...formData
  };
}