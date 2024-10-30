import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchWorkers } from '../gateway.ts/gateway';
import { Employee } from '../types';


type EmployeesState = {
    workers: Employee[];
    loading: boolean;
    error: string | null;
}

const initialState: EmployeesState = {
    workers: [],
    loading: false,
    error: null,
};

const workersSlice = createSlice({
    name: 'workers',
    initialState,
    reducers: {
        setWorkers: (state, action: PayloadAction<Employee[]>) => {
            state.workers = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWorkers.fulfilled, (state, action: PayloadAction<Employee[]>) => {
                state.loading = false;
                state.workers = action.payload || state.workers;
            })
            .addCase(fetchWorkers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch workers';
            });
    },
});

export const { setWorkers } = workersSlice.actions;
export default workersSlice.reducer;
