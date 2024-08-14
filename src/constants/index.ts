import { AllowedDocumentType, Country } from '../types';

type Option<Value> = { label: string; value: Value };

export const DOCUMENT_TYPES: Option<AllowedDocumentType>[] = [
  { label: 'Documento nacional de identidad', value: 'national-id' },
  { label: 'Pasaporte', value: 'passport' },
  { label: 'Documento de identidad extranjero', value: 'foreign-id' },
  { label: 'Permiso de conducir', value: 'driver-license' },
  { label: 'Factura', value: 'invoice' },
  { label: 'Tarjeta de identidad', value: 'identity-card' },
  { label: 'Permiso especial de permanencia', value: 'pep' }
];

export const COUNTRIES: Option<Country>[] = [
  { label: 'Colombia', value: 'co' },
  { label: 'Chile', value: 'cl' },
  { label: 'México', value: 'mx' },
  { label: 'Peru', value: 'pe' },
  { label: 'Todos (solo aplica para pasaporte)', value: 'all' }
];

export const ALLOWED_IMAGE_FORMATS = ['jpeg', 'jpg', 'png'];
