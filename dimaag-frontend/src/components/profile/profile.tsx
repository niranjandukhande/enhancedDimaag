import { useAxiosClient } from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

export default function Profile() {
  const api = useAxiosClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await api.get("/user");
      console.log(response.data);
      return response.data;
    },
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!data) return <div>No Data</div>;
  return <div>{JSON.stringify(data)}</div>;
}
