import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface WorkerData {
    id: number;
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

export const fetchWorkers = createAsyncThunk('workers/fetchWorkers', async () => {
    try {
        const response = await fetch('https://66a0f8b17053166bcabd894e.mockapi.io/api/workers');
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch workers: ${errorText}`);
        }
        const data: WorkerData[] = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Network error: ${error.message}`);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
});



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
                state.workers = action.payload;
            })
            .addCase(fetchWorkers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch workers';
            });
    },
});

export const { setWorkers } = workersSlice.actions;

export default workersSlice.reducer;
