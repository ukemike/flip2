import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { baseApi } from '../app';

interface ProposalData {
    payment_option: string;
    expected_duration: string;
    cover_letter: string;
    total_price: string;
    description: string;
    due_date: string;
    amount: string;
    milestones: [];
    jobID: string;
    proposalID: string;
}

export const getAllProposals = createAsyncThunk(
    'proposal/getAllProposals',
    async (token: any, thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}flip/merchant/proposal/my-proposals`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const createProposal = createAsyncThunk(
    'proposal/createProposal',
    async (data: ProposalData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/proposal/create-proposal/${data.jobID}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const updateProposal = createAsyncThunk(
    'proposal/updateProposal',
    async (data: ProposalData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/proposal/update-proposal/${data.proposalID}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const withdrawProposal = createAsyncThunk(
    'proposal/withdrawProposal',
    async (id: number, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${baseApi}flip/merchant/proposal/withdraw-proposal/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getProposalByJob = createAsyncThunk(
    'proposal/getProposalByJob',
    async (id: any, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseApi}flip/proposal/proposals-by-job/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const acceptProposal = createAsyncThunk(
    'proposal/acceptProposal',
    async (id: number, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/proposal/accept-proposal/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const rejectProposal = createAsyncThunk(
    'proposal/rejectProposal',
    async (data: ProposalData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/proposal/reject-proposal/${data.proposalID}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const sendReview = createAsyncThunk(
    'proposal/sendReview',
    async (data: ProposalData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/proposal/review-proposal/${data.proposalID}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)


interface ProposalState {
    proposals: any;
    success: boolean;
    error: '';
    message: '';
    loading: boolean;
    loadingFetctProposals: boolean;
    successFetchProposals: boolean;
}

const initialState: ProposalState = {
    proposals: [],
    success: false,
    error: '',
    message: '',
    loading: false,
    loadingFetctProposals: false,
    successFetchProposals: false,
}

const proposalSlice = createSlice({
    name: 'proposal',
    initialState,
    reducers: {
        clearProposalMessage: (state) => {
            state.message = '';
            state.success = false;
            state.successFetchProposals = false;
        },
        clearProposalError: (state) => {
            state.error = '';
            state.success = false;
            state.successFetchProposals = false;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getAllProposals.pending, (state) => {
            state.loadingFetctProposals = true;
        });
        builder.addCase(getAllProposals.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetctProposals = false;
            state.proposals = action.payload.data;
        });
        builder.addCase(getAllProposals.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetctProposals = false;
            state.error = action.payload?.message;
        });
        builder.addCase(createProposal.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createProposal.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload?.message;
        });
        builder.addCase(createProposal.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload?.message;
        });
        builder.addCase(updateProposal.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateProposal.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload?.message;
        });
        builder.addCase(updateProposal.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload?.message;
        });
        builder.addCase(withdrawProposal.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(withdrawProposal.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload?.message;
        });
        builder.addCase(withdrawProposal.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload?.message;
        });
        builder.addCase(getProposalByJob.pending, (state) => {
            state.loadingFetctProposals = true;
        });
        builder.addCase(getProposalByJob.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetctProposals = false;
            state.proposals = action.payload.data;
            state.successFetchProposals = true;
        });
        builder.addCase(getProposalByJob.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetctProposals = false;
            state.error = action.payload?.message;
            state.successFetchProposals = false;
        });
        builder.addCase(acceptProposal.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(acceptProposal.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload?.message;
        });
        builder.addCase(acceptProposal.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload?.message;
        });
        builder.addCase(rejectProposal.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(rejectProposal.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload?.message;
        });
        builder.addCase(rejectProposal.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload?.message;
        });
        builder.addCase(sendReview.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(sendReview.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload?.message;
        });
        builder.addCase(sendReview.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload?.message;
        });

    }
})

export const { clearProposalMessage, clearProposalError } = proposalSlice.actions;

export default proposalSlice.reducer;