import { useEffect } from 'react';

import { useToast } from '@/components/ui/use-toast';

import useStore from '@/stores/useStore';
import { capitalize } from '@/utils';

export default function useHandleError() {
  const errorMessage = useStore((state) => state.errorMessage);
  const clearErrorMessage = useStore((state) => state.clearErrorMessage);
  const { toast } = useToast();

  useEffect(() => {
    if (errorMessage) {
      toast({
        description: capitalize(errorMessage),
        variant: 'destructive',
      });
      clearErrorMessage();
    }
  }, [errorMessage]);
}
