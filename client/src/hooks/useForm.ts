import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { IOperationData } from '../interfaces/OperationData';
import { IMarketersData } from "../interfaces";

export const useForm = (initialState: IOperationData) => {
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

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: {
        ...prevFormData[name as keyof IOperationData] as IMarketersData,
        id: value,
      },
    }));
  };

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  const resetState = () => {
    setFormData(initialState);
  };

  return {
    formData,
    handleInputChange,
    handleSelectChange,
    handleSwitchChange,
    handleRadioChange,
    resetState,
    ...formData
  };
}