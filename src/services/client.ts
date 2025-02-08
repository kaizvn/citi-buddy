'use client'

import { GetUtilityByIDResponse } from '@/app/api/_utils/responseTypes'

import { fetcher } from '@/libs/utils'

import useSWR from 'swr'

export const useGetUtilityByID = (
  id: number | string,
  cityID: number | string
) => {
  const url = `/api/utilities/${id}?city_id=${cityID}`
  const { data, error, isLoading } = useSWR(url, fetcher)

  return {
    utility: data as GetUtilityByIDResponse,
    isLoading,
    isError: error,
  }
}

export const useGetCityByID = (id: number | string) => {
  const url = `/api/cities/${id}`
  const { data, error, isLoading } = useSWR(url, fetcher)

  return {
    city: data,
    isLoading,
    isError: error,
  }
}
