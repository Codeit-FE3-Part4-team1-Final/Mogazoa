import { ChangeEvent, useState } from 'react';

const useCreateProduct = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const onCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };
  const onDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  return {
    name,
    category,
    description,
    onNameChange,
    onCategoryChange,
    onDescriptionChange,
  };
};

export default useCreateProduct;
