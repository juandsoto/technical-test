import { useAppContext } from '../../context/App.context';
import UploadFile from './UploadFile';

function DocumentFront() {
  const { state, setState } = useAppContext();
  return (
    <div className='text-lg space-y-2'>
      <h3 className='text-primary'>Parte frontal de tu documento</h3>
      <UploadFile file={state.documentFront} setFile={(file) => setState({ documentFront: file })} />
    </div>
  );
}

export default DocumentFront;
