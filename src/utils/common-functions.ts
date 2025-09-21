import { DEFAULT_RESPONSE, DEFAULT_ERROR_RESPONSE } from "./constants";

function createResponse(payload, message) {
  const response = { ...DEFAULT_RESPONSE };

  response.data = payload || {};
  response.message = message || "";

  return response;
}

function createErrorResponse(message) {
  const response = {
    ...DEFAULT_ERROR_RESPONSE,
  };
  response.message = message || "";
  return response;
}

const findMissingKeyInSuperArray = (
  subArrayOfObjects: Record<string, any>[],
  superArrayOfObjects: Record<string, any>[],
  subArrayKey: string,
  superArrayKey: string,
) => {
  const keysInSubArray = subArrayOfObjects.map(
    (subArrayObject) => subArrayObject[`${subArrayKey}`],
  );
  const mapOfKeysInSuperArray = new Map(
    superArrayOfObjects.map((superArrayObject, index) => [
      superArrayObject[`${superArrayKey}`],
      index,
    ]),
  );

  return keysInSubArray.filter((key) => !mapOfKeysInSuperArray.has(key));
};

export { createResponse, createErrorResponse, findMissingKeyInSuperArray };
