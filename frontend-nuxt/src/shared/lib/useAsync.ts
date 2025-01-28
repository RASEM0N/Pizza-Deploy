import { FETCH_STATUS } from '~/src/shared/lib/types';
import type { Ref } from 'vue';

// @TODO
// - добавить логгер когда DEV
// - добавил сейв промисса, что запрос нельзя несколько раз пока он идет

export const useAsync = <T, A extends any[] = any[], E = Error>(
	asyncFn: (...args: A) => Promise<T> | T,
	{ synchronizationRef }: { synchronizationRef?: Ref<T | undefined> } = {},
) => {
	const status = ref<FETCH_STATUS>(FETCH_STATUS.none);
	const result = ref<T | undefined>();
	const error = ref<E>();
	const loading = computed(() => status.value === FETCH_STATUS.loading);

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
			error.value = e as E;
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
			error.value = e as E;
			throw e;
		}
	};

	const executeIfNone = (...args: A) => {
		if ([FETCH_STATUS.none, FETCH_STATUS.error].includes(status.value)) {
			execute(...args);
		}
	};

	const executeIfNoneWithThrow = (...args: A) => {
		if ([FETCH_STATUS.none, FETCH_STATUS.error].includes(status.value)) {
			executeWithThrow(...args);
		}
	};

	return {
		loading,
		status,
		result,
		error,
		execute,
		executeWithThrow,
		executeIfNoneWithThrow,
		executeIfNone,
	};
};
