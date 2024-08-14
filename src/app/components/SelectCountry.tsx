import { forwardRef } from 'react';
import { COUNTRIES } from '../../constants';
import { useAppContext } from '../../context/App.context';
import { Country } from '../../types';

const SelectCountry = forwardRef<HTMLSelectElement>((_, ref) => {
  const { state, setState } = useAppContext();
  return (
    <div className='flex flex-col items-center md:items-start md:text-center'>
      <label htmlFor='country' className='text-sm text-neutral-500'>
        Selecciona el país de expedición del documento
      </label>
      <select
        ref={ref}
        id='country'
        className='text-sm border w-full max-w-fit rounded-md p-2 focus:outline-primary focus:outline-offset-2'
        value={state.country}
        onChange={(e) => setState({ country: e.target.value as Country })}
      >
        {COUNTRIES.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <p className='mt-1 text-xs text-primary font-light'>*Asegurate de seleccionar el país correcto</p>
    </div>
  );
});

export default SelectCountry;
