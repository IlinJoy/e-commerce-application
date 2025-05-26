import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import Slider from '@mui/material/Slider';
import { CategoryFilter } from '../category-filter/category-filter';

export type DefaultFilterValues = {
  category: string | null;
  // width: number[];
  // height: number[];
  // depth: number[];
  // color: string;
  // price: number[];
};

const defaultFilterValues = {
  category: null,
  // width: [0, 100],
  // height: [0, 100],
  // depth: [0, 100],
  // color: '',
  // price: [0, 100],
};

export function CatalogFilters() {
  const [filterValues, setFilterValues] = useState<DefaultFilterValues>(defaultFilterValues);
  const navigate = useNavigate();

  // const handleSliderChange = (name: keyof typeof filterValues) => (_: Event, newValue: number[]) =>
  //   setFilterValues((prev) => ({ ...prev, [name]: newValue }));

  const handleCategoryChange = (categoryId: string) => {
    setFilterValues((prev) => ({ ...prev, category: categoryId }));
  };

  const handleReset = () => {
    setFilterValues(defaultFilterValues);
    navigate('');
  };

  // const setSliderMarks = () => {
  //   return [
  //     { value: 0, label: '0' },
  //     { value: 100, label: '100' },
  //   ];
  // };

  return (
    <aside>
      <Typography variant="h4">Filters</Typography>
      <CategoryFilter handleCategoryChange={handleCategoryChange} filterValues={filterValues} />
      {/* <Slider
        value={filterValues.width}
        onChange={handleSliderChange('width')}
        valueLabelDisplay="auto"
        min={0}
        max={100}
        marks={setSliderMarks()}
      />
      <Slider value={filterValues.depth} valueLabelDisplay="auto" min={0} max={100} marks={setSliderMarks()} />
      <Slider
        value={filterValues.price}
        valueLabelDisplay="auto"
        onChange={handleSliderChange('price')}
        min={0}
        max={100}
        marks={setSliderMarks()}
      /> */}
      <Button onClick={handleReset}>Reset</Button>
    </aside>
  );
}
