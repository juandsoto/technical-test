import { useRef } from 'react';
import { useAppContext } from '../context/App.context';
import useValidation from '../hooks/useValidation';
import { SelectCountry, SelectDocumentType, DocumentFront, DocumentReverse } from './components';
import LoaderIcon from './components/icons/LoaderIcon';

function App() {
  const { isReadyForValidation } = useAppContext();
  const {
    onSubmit,
    onReset,
    data: { status, message }
  } = useValidation();
  const selectCountryRef = useRef<HTMLSelectElement>(null);
  const selectDocumentRef = useRef<HTMLSelectElement>(null);

  const handleFocusSelectDocumentType = () => selectDocumentRef?.current?.focus();
  const handleFocusSelectCountry = () => selectCountryRef?.current?.focus();

  return (
    <div className='container mx-auto space-y-8 py-4 px-2 md:px-8'>
      <div className='space-y-4'>
        <h1 className='text-3xl text-primary text-center'>Verifica tu identidad</h1>
        <p className='text-sm text-wrap text-center'>
          Para continuar deberás cargar tu documento de identidad. Selecciona el{' '}
          <button onClick={handleFocusSelectCountry} className='underline text-primary'>
            país de expedición
          </button>{' '}
          y{' '}
          <button onClick={handleFocusSelectDocumentType} className='underline text-primary'>
            el tipo de documento
          </button>
          .
        </p>
        <div className='flex flex-wrap justify-center gap-4 md:gap-2'>
          <SelectCountry ref={selectCountryRef} />
          <SelectDocumentType ref={selectDocumentRef} />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-4 text-center'>
        <DocumentFront />
        <DocumentReverse />
        <div className='col-span-full ml-auto flex items-center justify-between'>
          {status === 'waiting_for_result' && <span className='text-lg text-primary'>{message}</span>}
          {(['failure', 'error'] as (typeof status)[]).includes(status) && (
            <span className='text-lg text-error'>{message}</span>
          )}
          {status === 'success' && <span className='text-lg text-success'>{message}</span>}
          {(['idle', 'pending'] as (typeof status)[]).includes(status) && (
            <button
              disabled={!isReadyForValidation || status === 'pending'}
              className='w-24 h-12 bg-primary text-white px-4 py-2 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed'
              type='button'
              onClick={onSubmit}
            >
              {status === 'pending' ? <LoaderIcon /> : 'Validar'}
            </button>
          )}
        </div>
        <div className='col-span-full ml-auto'>
          {(['failure', 'error'] as (typeof status)[]).includes(status) && (
            <button
              className='h-12 border border-neutral-600 text-neutral-600 px-4 py-2 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed'
              type='button'
              onClick={onReset}
            >
              Intentar de nuevo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
