// src/hooks/useAuth.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMe } from "../features/auth/authSlice";

export default function useAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);
}
