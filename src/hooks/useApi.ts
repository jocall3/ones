import { useState, useCallback } from 'react';

/**
 * Represents the state of an API call.
 * @template T The type of the data returned by the API.
 */
interface ApiState<T> {
  /** The data returned from the API call. Null if the call has not been made, is in progress, or resulted in an error. */
  data: T | null;
  /** A boolean indicating if the API call is currently in progress. */
  loading: boolean;
  /** An error object if the API call failed, otherwise null. */
  error: Error | null;
}

/**
 * Represents the return value of the useApi hook.
 * @template T The type of the data returned by the API.
 */
interface UseApiReturn<T> extends ApiState<T> {
  /**
   * A function to execute an API call.
   * It takes a promise (the API call itself) and manages the loading, data, and error states.
   * @param promise The promise returned by the API client function.
   * @returns A promise that resolves with the API data on success or rejects with an error on failure.
   */
  request: (promise: Promise<T>) => Promise<T>;
}

/**
 * A generic custom hook for making API calls.
 * It simplifies handling of loading, error, and data states in your components.
 *
 * @template T The expected type of the data to be fetched.
 * @returns An object containing the current state of the API call (`data`, `loading`, `error`)
 * and a `request` function to trigger the API call.
 *
 * @example
 * const { data, loading, error, request } = useApi<User[]>();
 *
 * useEffect(() => {
 *   request(api.fetchUsers())
 *     .catch(err => console.error("Failed to fetch users:", err));
 * }, [request]);
 *
 * if (loading) return <p>Loading...</p>;
 * if (error) return <p>Error: {error.message}</p>;
 * return <ul>{data?.map(user => <li key={user.id}>{user.name}</li>)}</ul>;
 */
const useApi = <T>(): UseApiReturn<T> => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const request = useCallback(async (promise: Promise<T>): Promise<T> => {
    // Reset state and set loading to true when a new request starts
    setState({ data: null, loading: true, error: null });
    try {
      const result = await promise;
      setState({ data: result, loading: false, error: null });
      return result;
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setState({ data: null, loading: false, error });
      // Re-throw the error so the calling component can handle it if needed (e.g., for logging)
      throw error;
    }
  }, []);

  return {
    ...state,
    request,
  };
};

export default useApi;