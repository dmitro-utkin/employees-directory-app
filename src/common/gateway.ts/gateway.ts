import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../state/store';

const serverUrl = 'https://66a0f8b17053166bcabd894e.mockapi.io/api/workers';

export const fetchWorkers = createAsyncThunk('workers/fetchWorkers', async (_, { getState }) => {
  const { workers } = getState() as RootState;

  if (workers.workers.length > 0) {
      return;
  }

  const response = await fetch(serverUrl);
  if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch workers: ${errorText}`);
  }
  return await response.json();
});