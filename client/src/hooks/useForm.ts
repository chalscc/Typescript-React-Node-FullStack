import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useState } from "react";

export const useForm = <T extends Object>(initialState: T) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;    

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const { name, value } = event.target;
  
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
  
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const resetState = () => {
    setFormData(initialState);
  };

  return {
    formData,
    handleInputChange,
    handleSelectChange,
    handleSwitchChange,
    resetState,
    ...formData
  };
}