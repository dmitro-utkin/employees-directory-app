import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
}

const initialState: WorkersState = {
    workers: [],
    
};

const workersSlice = createSlice({
    name: 'workers',
    initialState,
    reducers: {
        setWorkers: (state, action: PayloadAction<WorkerData[]>) => {
            state.workers = action.payload;
        },
    },
});

export const { setWorkers } = workersSlice.actions;

export default workersSlice.reducer;
