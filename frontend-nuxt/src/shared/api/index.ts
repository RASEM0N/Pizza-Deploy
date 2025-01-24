export const useApiFetch = <T>(...[url, options]: Parameters<typeof useFetch<T>>) => {
	const config = useRuntimeConfig();

	return useFetch<T>(url, {
		...options,
		baseURL: config.public.baseUrl,
	});
};
