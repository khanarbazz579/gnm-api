
const DEFAULT_RESPONSE = {
  message: '',
  data: {}
};
const DEFAULT_ERROR_RESPONSE = {
  message: ''
};


Object.freeze(DEFAULT_RESPONSE);
Object.freeze(DEFAULT_ERROR_RESPONSE);


export {
  DEFAULT_RESPONSE,
  DEFAULT_ERROR_RESPONSE
};

export enum RequestTypes {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export enum ResponseTypes {
  arraybuffer = 'arraybuffer',
  blob = 'blob',
  document = 'document',
  json = 'json',
  text = 'text',
  stream = 'stream'
}

export const LOGGING_TYPES = {
  error: 'error',
  success: 'success'
};