import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { baseApi } from '../app';

interface AccontData {
    address: string;
    date_of_birth: string;
    email: string;
    firstname: string;
    gender: string;
    image: string;
    lastname: string;
    phone: string;
    bio: string;
    job_title: string;
    languages: [];
    education: [];
    projects: [];
    skills: [];
    workHistory: [];
    yearsOfExperience: number;
    chargesPerHour: number;
    hours_perWeek: number;
    cac_number: string;
    cac_document: string;
    identity_type: string;
    identity_document: string;
    account_name: string;
    account_number: string;
    bvn_number: string;
    bank_name: string;
    schoolID: number;
    projectID: number;
    skillID: number;
    workID: number;
    languageID: number;
    amount: number;
    payment_reference: string;
}

export const getMyProfile = createAsyncThunk(
    'account/getMyProfile',
    async (token: any, thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}account/my-profile`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateBusinessMerchantProfile = createAsyncThunk(
    'account/updateBusinessMerchantProfile',
    async (data: AccontData, thunkAPI: any) => {
        console.log(data, 'data');
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/update-merchant-business`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const updatePersonalMerchantProfile = createAsyncThunk(
    'account/updatePersonalMerchantProfile',
    async (data: AccontData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/update-merchant-personal`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const updateConsumerProfile = createAsyncThunk(
    'account/updateConsumerProfile',
    async (data: AccontData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/consumer/update-consumer`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const addMerchantEducation = createAsyncThunk(
    'account/addMerchantEducation',
    async (data: AccontData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/add-merchant-education`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const removeMerchantEducation = createAsyncThunk(
    'account/removeMerchantEducation',
    async (id: number, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${baseApi}flip/merchant/remove-merchant-education/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const editMerchantEducation = createAsyncThunk(
    'account/editMerchantEducation',
    async (data: AccontData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/edit-merchant-education/${data.schoolID}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const addMerchantWorkHistory = createAsyncThunk(
    'account/addMerchantWorkHistory',
    async (data: AccontData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/add-merchant-work`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const removeMerchantWorkHistory = createAsyncThunk(
    'account/removeMerchantWorkHistory',
    async (id: number, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${baseApi}flip/merchant/remove-merchant-work/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const editMerchantWorkHistory = createAsyncThunk(
    'account/editMerchantWorkHistory',
    async (data: AccontData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/edit-merchant-work/${data.workID}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const addMerchantProjects = createAsyncThunk(
    'account/addMerchantProjects',
    async (data: AccontData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/add-merchant-project`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const removeMerchantProjects = createAsyncThunk(
    'account/removeMerchantProjects',
    async (id: number, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${baseApi}flip/merchant/remove-merchant-project/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const editMerchantProjects = createAsyncThunk(
    'account/editMerchantProjects',
    async (data: AccontData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/edit-merchant-project/${data.projectID}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const addMerchantSkills = createAsyncThunk(
    'account/addMerchantSkills',
    async (data: AccontData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/add-merchant-skills`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const removeMerchantSkills = createAsyncThunk(
    'account/removeMerchantSkills',
    async (id: number, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${baseApi}flip/merchant/remove-merchant-skill/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const editMerchantSkills = createAsyncThunk(
    'account/editMerchantSkills',
    async (data: AccontData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/edit-merchant-skill/${data.skillID}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const addMerchantLanguages = createAsyncThunk(
    'account/addMerchantLanguages',
    async (data: AccontData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/add-merchant-languages`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const removeMerchantLanguages = createAsyncThunk(
    'account/removeMerchantLanguages',
    async (id: number, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${baseApi}flip/merchant/remove-merchant-skill/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const editMerchantLanguages = createAsyncThunk(
    'account/editMerchantLanguages',
    async (data: AccontData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/edit-merchant-language/${data.languageID}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const updateBankDetails = createAsyncThunk(
    'account/updateBankDetails',
    async (data: AccontData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}account/update-bank-info`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getTransactions = createAsyncThunk(
    'account/getTransactions',
    async (token: any, thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}account/my-transactions`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getWalletBalance = createAsyncThunk(
    'account/getWalletBalance',
    async (token: any, thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}account/get-wallet-balance`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const topUpWallet = createAsyncThunk(
    'account/topUpWallet',
    async (data: AccontData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}account/top-up-wallet`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const requestWithdrawal = createAsyncThunk(
    'account/requestWithdrawal',
    async (data: AccontData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}account/request-withdrawal`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const updateProfilePicture = createAsyncThunk(
    'account/updateProfilePicture',
    async (data: AccontData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}account/update-profile-picture`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getCountries = createAsyncThunk(
    'account/getCountries',
    async ( thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}countries`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getStates = createAsyncThunk(
    'account/getStates',
    async (countryID: number, thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}states/${countryID}`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getLgas = createAsyncThunk(
    'account/getLga',
    async (stateID: number, thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}lgas/${stateID}`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

// slice
interface AccountState {
    profile: any;
    success: boolean;
    loading: boolean;
    error: string;
    message: string;
    loadingFetchProfile: boolean;
    successFetchProfile: boolean;
    transactions: any;
    loadingFetchTransactions: boolean;
    successFetchTransactions: boolean;
    loadingFetchWalletBalance: boolean;
    successFetchWalletBalance: boolean;
    walletBalance: any;
    countries: any;
    states: any;
    lgas: any;
    loadingFetchCountriesStatesLgas: boolean;
    successFetchCountriesStatesLgas: boolean;
    errorFetchCountriesStatesLgas: string;
    loadingUpdateProfilePicture: boolean;
};

const initialState: AccountState = {
    profile: {},
    success: false,
    loading: false,
    error: '',
    message: '',
    loadingFetchProfile: false,
    successFetchProfile: false,
    transactions: [],
    loadingFetchTransactions: false,
    successFetchTransactions: false,
    loadingFetchWalletBalance: false,
    successFetchWalletBalance: false,
    walletBalance: {},
    countries: [],
    states: [],
    lgas: [],
    loadingFetchCountriesStatesLgas: false,
    successFetchCountriesStatesLgas: false,
    errorFetchCountriesStatesLgas: '',
    loadingUpdateProfilePicture: false,
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = '';
            state.success = false;
            state.successFetchProfile = false;
            state.successFetchTransactions = false;
            state.successFetchWalletBalance = false;
        },
        clearError: (state) => {
            state.error = '';
            state.success = false;
            state.successFetchProfile = false;
            state.successFetchTransactions = false;
            state.successFetchWalletBalance = false;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getMyProfile.pending, (state) => {
                state.loadingFetchProfile = true;
            })
            .addCase(getMyProfile.fulfilled, (state, action: PayloadAction<any>) => {
                state.loadingFetchProfile = false;
                state.successFetchProfile = true;
                state.profile = action.payload.data;
            })
            .addCase(getMyProfile.rejected, (state, action: PayloadAction<any>) => {
                state.loadingFetchProfile = false;
                state.successFetchProfile = false;
                state.error = action.payload?.message;
            })
            .addCase(updateBusinessMerchantProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateBusinessMerchantProfile.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(updateBusinessMerchantProfile.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.message;
            })
            .addCase(updatePersonalMerchantProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePersonalMerchantProfile.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(updatePersonalMerchantProfile.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.message;
            })
            .addCase(updateConsumerProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateConsumerProfile.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(updateConsumerProfile.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.message;
            })
            .addCase(addMerchantSkills.pending, (state) => {
                state.loading = true;
            })
            .addCase(addMerchantSkills.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(addMerchantSkills.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.message;
            })
            .addCase(addMerchantLanguages.pending, (state) => {
                state.loading = true;
            })
            .addCase(addMerchantLanguages.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(addMerchantLanguages.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.message;
            })
            .addCase(addMerchantWorkHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(addMerchantWorkHistory.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(addMerchantWorkHistory.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.message;
            })
            .addCase(addMerchantEducation.pending, (state) => {
                state.loading = true;
            })
            .addCase(addMerchantEducation.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(addMerchantEducation.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.message;
            })
            .addCase(addMerchantProjects.pending, (state) => {
                state.loading = true;
            })
            .addCase(addMerchantProjects.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(addMerchantProjects.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.message;
            })
            .addCase(removeMerchantEducation.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeMerchantEducation.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(removeMerchantEducation.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.message;
            })
            .addCase(editMerchantEducation.pending, (state) => {
                state.loading = true;
            })
            .addCase(editMerchantEducation.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(editMerchantEducation.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.message;
            })
            .addCase(removeMerchantWorkHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeMerchantWorkHistory.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(removeMerchantWorkHistory.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.message;
            })
            .addCase(editMerchantWorkHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(editMerchantWorkHistory.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(editMerchantWorkHistory.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.message;
            })
            .addCase(removeMerchantProjects.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeMerchantProjects.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(removeMerchantProjects.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.message;
            })
            .addCase(editMerchantProjects.pending, (state) => {
                state.loading = true;
            })
            .addCase(editMerchantProjects.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(editMerchantProjects.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.message;
            })
            .addCase(removeMerchantSkills.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeMerchantSkills.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(removeMerchantSkills.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.message;
            })
            .addCase(editMerchantSkills.pending, (state) => {
                state.loading = true;
            })
            .addCase(editMerchantSkills.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(editMerchantSkills.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.message;
            })
            .addCase(removeMerchantLanguages.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeMerchantLanguages.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(removeMerchantLanguages.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.message;
            })
            .addCase(editMerchantLanguages.pending, (state) => {
                state.loading = true;
            })
            .addCase(editMerchantLanguages.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(editMerchantLanguages.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.message;
            })
            .addCase(updateBankDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateBankDetails.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(updateBankDetails.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.message;
            })
            .addCase(getTransactions.pending, (state) => {
                state.loadingFetchTransactions = true;
            })
            .addCase(getTransactions.fulfilled, (state, action: PayloadAction<any>) => {
                state.loadingFetchTransactions = false;
                state.successFetchTransactions = true;
                state.transactions = action.payload.data;
            })
            .addCase(getTransactions.rejected, (state, action: PayloadAction<any>) => {
                state.loadingFetchTransactions = false;
                state.successFetchTransactions = false;
                state.error = action.payload?.message;
            })
            .addCase(getWalletBalance.pending, (state) => {
                state.loadingFetchWalletBalance = true;
            })
            .addCase(getWalletBalance.fulfilled, (state, action: PayloadAction<any>) => {
                state.loadingFetchWalletBalance = false;
                state.successFetchWalletBalance = true;
                state.walletBalance = action.payload.data;
            })
            .addCase(getWalletBalance.rejected, (state, action: PayloadAction<any>) => {
                state.loadingFetchWalletBalance = false;
                state.successFetchWalletBalance = false;
                state.error = action.payload?.message;
            })
            .addCase(topUpWallet.pending, (state) => {
                state.loading = true;
            })
            .addCase(topUpWallet.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(topUpWallet.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.message;
            })
            .addCase(requestWithdrawal.pending, (state) => {
                state.loading = true;
            })
            .addCase(requestWithdrawal.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(requestWithdrawal.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload.message;
            })
            .addCase(updateProfilePicture.pending, (state) => {
                state.loadingUpdateProfilePicture = true;
            })
            .addCase(updateProfilePicture.fulfilled, (state, action: PayloadAction<any>) => {
                state.loadingUpdateProfilePicture = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(updateProfilePicture.rejected, (state, action: PayloadAction<any>) => {
                state.loadingUpdateProfilePicture = false;
                state.success = false;
                state.error = action.payload.message;
            })

            .addCase(getCountries.pending, (state) => {
                state.loadingFetchCountriesStatesLgas = true;
            })
            .addCase(getCountries.fulfilled, (state, action: PayloadAction<any>) => {
                state.loadingFetchCountriesStatesLgas = false;
                state.successFetchCountriesStatesLgas = true;
                state.countries = action.payload.data;
            })
            .addCase(getCountries.rejected, (state, action: PayloadAction<any>) => {
                state.loadingFetchCountriesStatesLgas = false;
                state.successFetchCountriesStatesLgas = false;
                state.errorFetchCountriesStatesLgas = action.payload.message;
            })

            .addCase(getStates.pending, (state) => {
                state.loadingFetchCountriesStatesLgas = true;
            })
            .addCase(getStates.fulfilled, (state, action: PayloadAction<any>) => {
                state.loadingFetchCountriesStatesLgas = false;
                state.successFetchCountriesStatesLgas = true;
                state.states = action.payload.data;
            })
            .addCase(getStates.rejected, (state, action: PayloadAction<any>) => {
                state.loadingFetchCountriesStatesLgas = false;
                state.successFetchCountriesStatesLgas = false;
                state.errorFetchCountriesStatesLgas = action.payload.message;
            })

            .addCase(getLgas.pending, (state) => {
                state.loadingFetchCountriesStatesLgas = true;
            })
            .addCase(getLgas.fulfilled, (state, action: PayloadAction<any>) => {
                state.loadingFetchCountriesStatesLgas = false;
                state.successFetchCountriesStatesLgas = true;
                state.lgas = action.payload.data;
            })
            .addCase(getLgas.rejected, (state, action: PayloadAction<any>) => {
                state.loadingFetchCountriesStatesLgas = false;
                state.successFetchCountriesStatesLgas = false;
                state.errorFetchCountriesStatesLgas = action.payload.message;
            })


    }
})

export const { clearMessage, clearError } = accountSlice.actions;

export default accountSlice.reducer