import { useQueryClient } from '@tanstack/react-query';

const useInvalidateQuery = () => {
  const queryClient = useQueryClient();

  const invalidateQuery = (queryKey: string | string[]) => {
    queryClient.invalidateQueries({
      queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    });
  };

  return invalidateQuery;
};

export default useInvalidateQuery;

