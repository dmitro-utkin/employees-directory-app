import { createAsyncThunk } from '@reduxjs/toolkit';

const serverUrl = 'https://66a0f8b17053166bcabd894e.mockapi.io/api/workers';

export const fetchWorkers = createAsyncThunk('workers/fetchWorkers', async (_, thunkAPI) => {
  try {
    const response = await fetch(serverUrl);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch workers: ${errorText}`);
    }
    return await response.json();
  } catch (error: Error | any) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred');
  }
});
