import { useAppContext } from '../../context/App.context';
import UploadFile from './UploadFile';

function DocumentReverse() {
  const { state, setState } = useAppContext();
  return (
    <div className='text-lg space-y-2'>
      <h3 className='text-primary'>Parte trasera de tu documento</h3>
      <UploadFile file={state.documentReverse} setFile={(file) => setState({ documentReverse: file })} />
    </div>
  );
}

export default DocumentReverse;
