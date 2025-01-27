export interface Common {
	id: number;
	createdAt: number;
	updatedAt: number;
}

export enum FETCH_STATUS {
	none,
	loading,
	loaded,
	error,
}
