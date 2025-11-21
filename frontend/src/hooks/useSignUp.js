import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { signUp } from '../lib/api.js';


const useSignUp = () => {
     const queryClient = useQueryClient();
  const {
    mutate: signupMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      queryClient.setQueryData(["authUser"], data);
    },
  });
    return { isPending, error, signupMutation };
}

export default useSignUp
