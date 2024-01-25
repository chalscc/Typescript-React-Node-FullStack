import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { IOperationData } from '../interfaces/OperationData';
import { IMarketersData } from "../interfaces";

// export const useForm = <T extends IOperationData>(initialState: T) => {
export const useForm = <T extends IOperationData>(initialState: IOperationData) => {
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


    console.log({
      name, value
    })

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

    console.log(name, value)

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