import React, {ComponentType, FC} from 'react';
import {QueryKey, useQuery, UseQueryResult} from '@tanstack/react-query';

/**
 * Type definitions for the `withQuery` HOC.
 */
interface WithQueryOptions<TData, TError, TVariables extends QueryKey> {
  hook: (variables: TVariables) => UseQueryResult<TData, TError>;
  components: {
    Loading: ComponentType;
    ServiceError: ComponentType<{message?: string}>;
  };
}

/**
 * A Higher-Order Component (HOC) that abstracts query handling.
 *
 * @template TData - The data type returned from the query.
 * @template TError - The error type for the query.
 * @template TVariables - The variables required for the query.
 *
 * @param {ComponentType<TData>} Component - The component to wrap.
 * @param {WithQueryOptions<TData, TError, TVariables>} options - Configuration options.
 * @returns {FC<TVariables>} - A wrapped component with query handling.
 */
export default function withQuery<
  TData extends Record<string, any>, // Ensures it's an object
  TError = unknown,
  TVariables extends QueryKey = QueryKey,
>(
  Component: ComponentType<TData>,
  {hook, components}: WithQueryOptions<TData, TError, TVariables>,
): FC<TVariables> {
  const {Loading, ServiceError} = components;

  const WithQueryWrapper: FC<TVariables> = props => {
    const {data, error, isLoading, isError, isSuccess} = hook(props);

    if (isLoading) return <Loading />;
    if (isError)
      return (
        <ServiceError
          message={(error as any)?.message || 'An error occurred'}
        />
      );
    if (isSuccess && data) return <Component {...(data as TData)} />;

    return null;
  };

  return WithQueryWrapper;
}
