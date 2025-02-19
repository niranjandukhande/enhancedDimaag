import { useAxiosClient } from "@/config/axios";
import { contentType } from "@/types/content";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useContentMutation = () => {
  const api = useAxiosClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (contentDetails: contentType) => {
      const response = await api.post("/content", contentDetails);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("data", data);
      toast.success("Content added successfully");
    },
    onError: (error) => {
      toast.error("Error adding content");
      console.log("error", error);
    },
    onSettled: () => {
      console.log("onSettled");
      queryClient.invalidateQueries({
        queryKey: ["content"],
      });
    },
  });
};
