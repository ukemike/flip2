import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { baseApi } from '../app';


interface JobData {
    headline: string;
    skills_needed: [];
    experience_level: string;
    job_duration: string;
    job_scope: string;
    budget: number;
    is_budget_negotiable: boolean;
    description: string;
    jobID: number;
}

export const getAllJobs = createAsyncThunk(
    'job/getAllJobs',
    async (token: any, thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}flip/job/all-job-posts`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getMyJobs = createAsyncThunk(
    'job/getMyJobs',
    async (token: any, thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}flip/job/job-posts-by-me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const createJob = createAsyncThunk(
    'job/createJob',
    async (data: JobData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/job/create-job`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const updateJob = createAsyncThunk(
    'job/updateJob',
    async (data: JobData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/job/update-job/${data.jobID}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const deactivateJob = createAsyncThunk(
    'job/deactivateJob',
    async (jobID: number, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/job/deactivate-job-post/${jobID}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const activateJob = createAsyncThunk(
    'job/activateJob',
    async (jobID: number, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/job/activate-job-post/${jobID}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)



interface JobState {
    jobs: any;
    success: boolean;
    error: '';
    message: '';
    loading: boolean;
    loadingFetchJobs: boolean;
    successFetchJobs: boolean;
}

const initialState: JobState = {
    jobs: [],
    success: false,
    error: '',
    message: '',
    loading: false,
    loadingFetchJobs: false,
    successFetchJobs: false,
}

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = '';
            state.success = false;
            state.successFetchJobs = false;
        },
        clearError: (state) => {
            state.error = '';
            state.success = false;
            state.successFetchJobs = false;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getAllJobs.pending, (state) => {
            state.loadingFetchJobs = true;
        })
        builder.addCase(getAllJobs.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetchJobs = false;
            state.jobs = action.payload.data;
            state.successFetchJobs = true;
        })
        builder.addCase(getAllJobs.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetchJobs = false;
            state.error = action.payload?.message;
        })
        builder.addCase(getMyJobs.pending, (state) => {
            state.loadingFetchJobs = true;
        })
        builder.addCase(getMyJobs.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetchJobs = false;
            state.jobs = action.payload.data;
            state.successFetchJobs = true;
        })
        builder.addCase(getMyJobs.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetchJobs = false;
            state.error = action.payload?.message;
        })
        builder.addCase(createJob.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createJob.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
        })
        builder.addCase(createJob.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        builder.addCase(updateJob.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateJob.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
        })
        builder.addCase(updateJob.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        builder.addCase(deactivateJob.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deactivateJob.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
        })
        builder.addCase(deactivateJob.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        builder.addCase(activateJob.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(activateJob.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
        })
        builder.addCase(activateJob.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})

export const { clearMessage, clearError } = jobSlice.actions;

export default jobSlice.reducer;