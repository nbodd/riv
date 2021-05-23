import { useLocation } from "react-router-dom";

export const useQueryParams = (...searchParams : string[]) => {
  const query = new URLSearchParams(useLocation().search);
  
  return searchParams.map(p => query.get(p))
}