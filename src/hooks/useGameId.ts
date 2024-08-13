import { useParams } from 'react-router-dom';

export default function useGameId() {
  return useParams<{ id: string }>().id;
}
