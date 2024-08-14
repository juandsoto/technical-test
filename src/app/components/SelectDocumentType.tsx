import { forwardRef } from 'react';
import { DOCUMENT_TYPES } from '../../constants';
import { useAppContext } from '../../context/App.context';
import { AllowedDocumentType } from '../../types';

const SelectDocumentType = forwardRef<HTMLSelectElement>((_, ref) => {
  const { state, setState } = useAppContext();
  return (
    <div className='flex flex-col items-center md:items-end text-center'>
      <label htmlFor='document_type' className='text-sm text-neutral-500'>
        Selecciona el tipo de documento
      </label>
      <select
        ref={ref}
        id='document_type'
        className='text-sm border w-full max-w-fit rounded-md p-2 focus:outline-primary focus:outline-offset-2'
        value={state.documentType}
        onChange={(e) => setState({ documentType: e.target.value as AllowedDocumentType })}
      >
        {DOCUMENT_TYPES.map(({ label, value }) => (
          <option disabled={state.country === 'all' && value !== 'passport'} key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <p className='mt-1 text-xs text-primary font-light'>*Asegurate de seleccionar el tipo de documento correcto</p>
    </div>
  );
});

export default SelectDocumentType;
