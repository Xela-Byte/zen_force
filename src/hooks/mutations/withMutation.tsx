
import React, { FC, ComponentType } from 'react';
import { useMutation, UseMutationResult, MutationFunction } from '@tanstack/react-query';

interface WithMutationOptions<TData, TVariables> {
  mutation: MutationFunction<TData, TVariables>;
  onSuccess?: (mutationResult: unknown) => void;
  onError?: (error: unknown) => void;
}

function withMutation<TData, TVariables>(
  Component: ComponentType<WithMutationProps<TData, TVariables>>,
  { mutation, onSuccess, onError }: WithMutationOptions<TData, TVariables>
): FC<TVariables> {
  const WrappedComponent: FC<TVariables> = (props) => {
    const mutationResult = useMutation<TData, unknown, TVariables>({
      mutationFn: mutation,
      onSuccess,
      onError,
    });
    return <Component {...props} mutationResult={mutationResult} />;
  };

  return WrappedComponent;
}

export interface WithMutationProps<TData, TVariables> {
  mutationResult: UseMutationResult<TData, unknown, TVariables>;
}

export default withMutation;
