/**
 * General types for API requests and responses, such as paginated results.
 */

/**
 * Represents the structure of a standardized API error.
 */
export interface ApiError {
  code: string | number;
  message: string;
  details?: Record<string, any>;
}

/**
 * A generic wrapper for a standard, non-paginated API response.
 * @template T The type of the data payload.
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message?: string;
  error?: ApiError | null;
}

/**
 * Represents the metadata associated with a paginated response.
 */
export interface PaginationMeta {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * A generic wrapper for paginated API responses.
 * @template T The type of the items in the data array.
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * A generic wrapper for a successful paginated API response.
 * This can be used with libraries like React Query or SWR.
 * @template T The type of the items in the data array.
 */
export interface PaginatedApiResponse<T> extends ApiResponse<PaginatedResponse<T>> {
  success: true;
  data: PaginatedResponse<T>;
}

/**
 * Represents common query parameters for API requests that support pagination.
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Represents common query parameters for filtering API requests.
 * The keys are the field names and values are the filter values.
 */
export interface FilterParams {
  [key: string]: string | number | boolean | undefined | null;
}

/**
 * Represents common query parameters for searching API requests.
 */
export interface SearchParams {
  query?: string;
}

/**
 * Combines all common request parameters into a single type for convenience.
 */
export type ApiRequestParams = PaginationParams & FilterParams & SearchParams;

/**
 * Represents the status of an asynchronous API call.
 */
export type ApiStatus = 'idle' | 'loading' | 'succeeded' | 'failed';