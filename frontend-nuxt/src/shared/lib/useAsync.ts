import { FETCH_STATUS } from '~/src/shared/lib/types';
import type { Ref } from 'vue';

export const useAsync = <T, A extends any[] = any[], E = Error>(
	asyncFn: (...args: A) => Promise<T> | T,
	{ synchronizationRef }: { synchronizationRef?: Ref<T | undefined> } = {},
) => {
	const status = ref<FETCH_STATUS>(FETCH_STATUS.none);
	const result = ref<T | undefined>();
	const error = ref<E>();
	const loading = computed(() => status.value === FETCH_STATUS.loading);

	// @TODO добавить логгер когда DEV

	if (synchronizationRef) {
		watch(result, (value) => {
			synchronizationRef.value = value;
		});
	}

	const execute = async (...args: A): Promise<T | undefined> => {
		try {
			status.value = FETCH_STATUS.loading;
			const resultFn = await asyncFn(...args);
			status.value = FETCH_STATUS.loaded;
			result.value = resultFn;

			return resultFn;
		} catch (e) {
			status.value = FETCH_STATUS.error;
		}
	};

	const executeWithThrow = async (...args: A): Promise<T> => {
		try {
			status.value = FETCH_STATUS.loading;
			const resultFn = await asyncFn(...args);
			status.value = FETCH_STATUS.loaded;
			result.value = resultFn;

			return resultFn;
		} catch (e) {
			status.value = FETCH_STATUS.error;
			throw e;
		}
	};

	return {
		loading,
		status,
		result,
		error,
		execute,
		executeWithThrow,
	};
};
