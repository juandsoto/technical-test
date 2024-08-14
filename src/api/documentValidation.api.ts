import api from '../config/api';
import ENV from '../config/env';
import {
  CreateValidationRequest,
  CreateValidationResponse,
  GetValidationResponse,
  UploadDocumentResponse
} from '../types';

export async function createValidation(payload: CreateValidationRequest) {
  const req = new URLSearchParams();

  req.append('type', payload.type);
  req.append('country', payload.country);
  req.append('document_type', payload.document_type);
  req.append('user_authorized', `${payload.user_authorized}`);

  const data = await api<CreateValidationResponse>(`${ENV.API_BASE_URL}/validations`, {
    method: 'POST',
    body: req.toString()
  });
  return data;
}

export async function getValidation(validationId: string) {
  const data = await api<GetValidationResponse>(`${ENV.API_BASE_URL}/validations/${validationId}?show_details=true`, {
    method: 'GET'
  });
  return data;
}

export async function uploadDocument(url: string, file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const data = await api<UploadDocumentResponse>(url, {
    method: 'PUT',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return data;
}
