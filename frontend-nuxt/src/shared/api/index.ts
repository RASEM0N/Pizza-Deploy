export const useApiFetch = <T>(...[url, options]: Parameters<typeof useFetch<T>>) => {
	const config = useRuntimeConfig();

	return useFetch<T>(url, {
		...options,
		baseURL: config.public.baseUrl,

		// Для отправки и возможности записи куков
		// на config.public.baseUrl localhost:5000
		credentials: 'include',
	});
};

export const $apiFetch = <T>(...[url, options]: Parameters<typeof $fetch<T>>) => {
	const config = useRuntimeConfig();

	return $fetch<T>(url, {
		...options,
		baseURL: config.public.baseUrl,

		// Для отправки и возможности записи куков
		// на config.public.baseUrl localhost:5000
		credentials: 'include',
	});
};
