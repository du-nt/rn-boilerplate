import { AxiosRequestConfig } from 'axios'

import {
  DefaultError,
  MutationFunction,
  QueryClient,
  useMutation as RQUseMutation,
  UseMutationOptions,
  UseMutationResult
} from '@tanstack/react-query'

import axiosInstance from '../configs/axios_instance'

export default function useMutation<
  TVariables = void,
  TData = unknown,
  TError = DefaultError,
  TContext = unknown
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext> & {
    config?: AxiosRequestConfig
    endpoint: string
  },
  queryClient?: QueryClient
): UseMutationResult<TData, TError, TVariables, TContext> {
  const { mutationFn, config, endpoint, ...restOptions } = options

  const defaultMutationFn: MutationFunction<TData, TVariables> = async (
    variables: TVariables
  ): Promise<TData> => {
    const { data } = await axiosInstance<TError, { data: TData }>({
      ...config,
      url: endpoint,
      method: config?.method || 'POST',
      data: variables
    })

    return data
  }

  return RQUseMutation(
    {
      mutationFn: mutationFn || defaultMutationFn,
      ...restOptions
    },
    queryClient
  )
}
