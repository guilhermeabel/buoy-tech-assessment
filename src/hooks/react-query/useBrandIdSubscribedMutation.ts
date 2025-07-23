import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { useGetBrandId } from "hooks";

export function useBrandIdSubscribedMutation<T, K>(
  mutationFn: (...params: any[]) => Promise<T | undefined | void>,
  onSuccess: (...params: any[]) => void
): UseMutationResult<T | undefined | void, unknown, K> {
  const brandId = useGetBrandId();

  const mutation = useMutation({
    mutationFn: (...params: any[]) => mutationFn(brandId, ...params),
    onSuccess: (...params: any[]) => onSuccess(brandId, ...params),
  });

  return mutation;
}
