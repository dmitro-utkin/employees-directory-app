import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchWorkers } from '../gateway.ts/gateway';
export interface WorkerData {
    id: string;
    avatar: string;
    name: string;
    tag: string;
    position: string;
    birthDate: string;
    phone: string;
    email: string;
}

interface WorkersState {
    workers: WorkerData[];
    loading: boolean;
    error: string | null;
}

const initialState: WorkersState = {
    workers: [],
    loading: false,
    error: null,
};

const workersSlice = createSlice({
    name: 'workers',
    initialState,
    reducers: {
        setWorkers: (state, action: PayloadAction<WorkerData[]>) => {
            state.workers = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWorkers.fulfilled, (state, action: PayloadAction<WorkerData[]>) => {
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
