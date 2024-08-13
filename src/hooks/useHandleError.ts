import { useEffect } from 'react';

import { useToast } from '@/components/ui/use-toast';

import useStore from '@/stores/useStore';

export default function useHandleError() {
  const errorMessage = useStore((state) => state.errorMessage);
  const clearErrorMessage = useStore((state) => state.clearErrorMessage);
  const { toast } = useToast();

  useEffect(() => {
    if (errorMessage) {
      toast({
        description: errorMessage,
      });
      clearErrorMessage();
    }
  }, [errorMessage]);
}
