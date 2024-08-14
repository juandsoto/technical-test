import { useEffect, useRef, useState } from 'react';
import { createValidation, getValidation, uploadDocument } from '../api/documentValidation.api';
import { useAppContext } from '../context/App.context';

type RequestStatus = 'idle' | 'pending' | 'waiting_for_result' | 'error' | 'failure' | 'success';

type Data = {
  status: RequestStatus;
  message: string;
};

function useValidation() {
  const { state } = useAppContext();
  const validationIdRef = useRef<string | null>(null);
  const accountIdRef = useRef<string | null>(null);
  const [data, setData] = useState<Data>({ status: 'idle', message: '' });

  useEffect(() => {
    if (data.status !== 'waiting_for_result' || validationIdRef.current === null) return;

    const checkResult = async () => {
      try {
        const res = await getValidation(validationIdRef.current!);

        const hasRemainingRetries = res.remaining_retries > 0;

        if (!hasRemainingRetries) {
          validationIdRef.current = null;
          accountIdRef.current = null;
        }

        if (res.validation_status === 'pending') return;
        clearInterval(intervalId);
        if (res.validation_status === 'failure') return setData({ status: 'failure', message: res.declined_reason });
        setData({ status: 'success', message: 'La validación fue exitosa!' });
      } catch (error) {
        if (error instanceof Error) setData({ status: 'error', message: error.message });
      }
    };

    const intervalId = setInterval(checkResult, 5000);

    return () => clearInterval(intervalId);
  }, [data.status]);

  const onSubmit = async () => {
    if (!state.country) return setData({ status: 'error', message: 'El país de expedición no fue proporcionado' });
    if (!state.documentType) return setData({ status: 'error', message: 'El tipo de documento no fue proporcionado' });
    if (!state.documentFront)
      return setData({ status: 'error', message: 'La parte frontal del documento no fue proporcionada' });
    if (!state.documentReverse)
      return setData({ status: 'error', message: 'La parte trasera del documento no fue proporcionada' });

    let frontUrl: string | null = null;
    let reverseUrl: string | null = null;

    setData({ status: 'pending', message: '' });

    try {
      const data = await createValidation({
        type: 'document-validation',
        country: state.country,
        document_type: state.documentType,
        user_authorized: true,
        retry_of_id: validationIdRef.current !== null ? validationIdRef.current : undefined,
        account_id: accountIdRef.current !== null ? accountIdRef.current : undefined
      });
      validationIdRef.current = data.validation_id;
      accountIdRef.current = data.account_id;
      frontUrl = data.instructions.front_url;
      reverseUrl = data.instructions.reverse_url;
    } catch (error) {
      setData({ status: 'error', message: '(500): No se pudo crear la validación' });
      return;
    }

    try {
      await uploadDocument(frontUrl, state.documentFront);
    } catch (error) {
      setData({ status: 'error', message: '(500): No se pudo subir la imagen frontal' });
      return;
    }

    try {
      await uploadDocument(reverseUrl, state.documentReverse);
    } catch (error) {
      setData({ status: 'error', message: '(500): No se pudo subir la imagen trasera' });
      return;
    }

    setData({ status: 'waiting_for_result', message: 'Esperando resultado...' });
  };

  const onReset = () => {
    setData({ status: 'idle', message: '' });
  };

  return { data, onSubmit, onReset };
}

export default useValidation;
