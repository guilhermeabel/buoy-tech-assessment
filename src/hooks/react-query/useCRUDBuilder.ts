import { ElementIdType, PaginatedResult } from "services/base/interface";
import { useBrandIdSubscribedQuery } from "./useBrandIdSubscribedQuery";
import {
  UseMutationResult,
  UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useBrandIdSubscribedMutation } from "./useBrandIdSubscribedMutation";

export interface useCRUDBuilderProps<T> {
  cacheQueryName: string;
  paramlessDetail?: boolean;
  readListPromise?:
    | undefined
    | ((
        brandId: string,
        ...rest: any[]
      ) => Promise<PaginatedResult<T> | undefined>);
  readDetailPromise?:
    | undefined
    | ((
        brandId: string,
        elementId?: ElementIdType,
        ...rest: any[]
      ) => Promise<T | undefined>);
  createPromise?:
    | undefined
    | ((brandId: string, ...rest: any[]) => Promise<T | undefined | void>);
  updatePromise?:
    | undefined
    | ((brandId: string, ...rest: any[]) => Promise<T | undefined | void>);
  deletePromise?:
    | undefined
    | ((brandId: string, ...rest: any[]) => Promise<T | undefined | void>);
}

export interface useCRUDBuilderResponse<T> {
  useGetList: (query?: any[]) => UseQueryResult<PaginatedResult<T> | undefined>;
  useGetDetail: (
    elementId?: ElementIdType,
    query?: any[]
  ) => UseQueryResult<T | undefined>;
  useCreate: () => UseMutationResult<T | undefined | void, unknown, Partial<T>>;
  useUpdate: (
    elementId: ElementIdType
  ) => UseMutationResult<T | undefined | void, unknown, Partial<T>>;
  useDelete: (
    elementId: ElementIdType
  ) => UseMutationResult<T | undefined | void, unknown, void>;
}

export function useCRUDBuilder<T>({
  cacheQueryName,
  paramlessDetail = false,
  readListPromise,
  readDetailPromise,
  createPromise,
  updatePromise,
  deletePromise,
}: useCRUDBuilderProps<T>): useCRUDBuilderResponse<T> {
  const listQueryName = `${cacheQueryName}-list`;
  const detailQueryName = `${cacheQueryName}`;

  const listQueryKey = (brandId: string) => [listQueryName, brandId];
  const detailQueryKey = (brandId: string, elementId: ElementIdType) => [
    detailQueryName,
    brandId,
    paramlessDetail ? "" : elementId || "",
  ];

  return {
    useGetList: (query: any[] = []) => {
      return useBrandIdSubscribedQuery<PaginatedResult<T> | undefined>(
        async (brandId) =>
          readListPromise && readListPromise(brandId, ...query),
        listQueryKey
      );
    },

    useGetDetail: (elementId?: ElementIdType) => {
      return useBrandIdSubscribedQuery<T | undefined>(
        async (brandId) => {
          return readDetailPromise && readDetailPromise(brandId, elementId);
        },
        (brandId) => detailQueryKey(brandId, elementId)
      );
    },

    useCreate: () => {
      const queryClient = useQueryClient();

      return useBrandIdSubscribedMutation<T | undefined, Partial<T>>(
        async (brandId: string, body: Partial<T>) => {
          return createPromise && createPromise(brandId, body);
        },
        (brandId) => {
          queryClient.invalidateQueries({
            queryKey: listQueryKey(brandId),
          });
        }
      );
    },

    useUpdate: (elementId: ElementIdType) => {
      const queryClient = useQueryClient();

      return useBrandIdSubscribedMutation<T, Partial<T>>(
        async (brandId: string, body: Partial<T>) => {
          if (!elementId) return;
          return updatePromise && updatePromise(brandId, elementId, body);
        },
        (brandId) => {
          queryClient.invalidateQueries({
            queryKey: listQueryKey(brandId),
          });
          queryClient.invalidateQueries({
            queryKey: detailQueryKey(brandId, elementId),
          });
          console.log(
            brandId,
            elementId,
            listQueryKey(brandId),
            detailQueryKey(brandId, elementId)
          );
        }
      );
    },

    useDelete: (elementId: ElementIdType) => {
      const queryClient = useQueryClient();

      return useBrandIdSubscribedMutation<T, void>(
        async (brandId: string, body: Partial<T>) => {
          if (!elementId) return;
          return deletePromise && deletePromise(brandId, elementId, body);
        },
        (brandId) => {
          queryClient.invalidateQueries({
            queryKey: listQueryKey(brandId),
          });
          queryClient.invalidateQueries({
            queryKey: detailQueryKey(brandId, elementId),
          });
        }
      );
    },
  };
}
