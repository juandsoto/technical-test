export type AllowedDocumentType =
  | 'national-id'
  | 'passport'
  | 'foreign-id'
  | 'pep'
  | 'driver-license'
  | 'invoice'
  | 'identity-card';

export type CreateValidationRequest = {
  type: 'document-validation';
  country: Country;
  document_type: AllowedDocumentType;
  user_authorized: boolean;
  retry_of_id?: string;
  account_id?: string;
};

export type CreateValidationResponse = {
  account_id: string;
  creation_date: Date;
  instructions: Instructions;
  ip_address: string;
  type: 'document-validation';
  validation_id: string;
  validation_status: 'pending' | 'success' | 'failure';
  remaining_retries?: number;
};

export type UploadDocumentResponse = {
  code: number;
  message: string;
  http_code: number;
};

export type GetValidationResponse = {
  account_id: string;
  attachment_status: 'valid' | 'invalid' | 'pending';
  attachment_validations: AttachmentValidation[];
  creation_date: Date;
  declined_reason: string;
  details: Details;
  document_expected_pages: number;
  failure_status: string;
  ip_address: string;
  processing_finish_date: Date;
  processing_start_date: Date;
  type:
    | 'identity-questions'
    | 'face-recognition'
    | 'voice-recognition'
    | 'email-verification'
    | 'phone-verification'
    | 'document-validation';
  user_response: UserResponse;
  validation_id: string;
  validation_inputs: ValidationInputs;
  validation_status: 'pending' | 'success' | 'failure';
  allowed_retries: number;
  remaining_retries: number;
};

type Instructions = {
  front_url: string;
  reverse_url: string;
};

type AttachmentValidation = {
  validation_name: string;
  validation_type: 'ocr-validation' | 'face-detection-validation' | 'face-clarity-validation';
  attachment_type: 'document-front' | 'document-reverse';
  result: string;
  declined_reason?: string;
};

export type Country = 'co' | 'cl' | 'mx' | 'pe' | 'all';

type Details = {
  document_details: DocumentDetails;
};

type DocumentDetails = {
  birth_place: string;
  client_id: string;
  country: string;
  creation_date: Date;
  date_of_birth: Date;
  doc_id: string;
  document_number: string;
  document_type: string;
  expedition_place: string;
  gender: 'male' | 'female';
  height: string;
  issue_date: Date;
  last_name: string;
  mime_type: string;
  name: string;
  national_registrar: string;
  production_data: string;
  rh: string;
  update_date: Date;
};

type UserResponse = {
  input_files: string[];
};

type ValidationInputs = {
  country: string;
  document_type: string;
};
