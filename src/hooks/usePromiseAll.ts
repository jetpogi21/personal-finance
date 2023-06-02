import { useState, useEffect } from "react";
import axios from "axios";
import axiosClient from "../utils/api";

function usePromiseAll(
  urls: Record<string, string>,
  params?: Record<string, string>,
  shouldFetch: boolean = true
) {
  const [data, setData] = useState<Record<string, unknown[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const source = axios.CancelToken.source();
      setLoading(true);
      setError(null);

      try {
        const promises = Object.values(urls).map((url) =>
          axiosClient.get(url, {
            cancelToken: source.token,
            params: params
              ? { ...params, simpleOnly: true }
              : { simpleOnly: true },
          })
        );

        const results = await Promise.all(promises);
        /* 
        This urls: 
        const urls = {
          'url1': 'https://api.example.com/data1',
          'url2': 'https://api.example.com/data2',
          'url3': 'https://api.example.com/data3'
        };
        will result to:
        {
          'url1': { name: 'John', age: 32 },
          'url2': { name: 'Jane', age: 28 },
          'url3': { name: 'Bob', age: 45 }
        }
        */
        setData(
          Object.keys(urls).reduce((acc, key, i) => {
            if (results[i].data.status === "success") {
              return {
                ...acc,
                [key]: results[i].data.data,
              };
            } else {
              setError("There was an error fetching data for " + key);
              return {
                ...acc,
                [key]: [],
              };
            }
          }, {} as Record<string, unknown[]>)
        );
        setLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request cancelled:", err.message);
        } else {
          setError((err as Error).message as string);
          setLoading(false);
        }
      }

      return () => {
        source.cancel("Request cancelled");
      };
    };
    if (shouldFetch) {
      fetchData();
    }
  }, [params]);

  return { data, loading, error };
}

export default usePromiseAll;
