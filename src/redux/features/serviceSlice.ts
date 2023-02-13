import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { baseApi } from '../app';

interface ServiceData {
    service_name: string;
    category_id: number;
    years_of_exp: number;
    amount: number;
    location: string;
    phone_number: string;
    other_details: string;
    description: string;
    serviceID: number;
}


export const getMyServices = createAsyncThunk(
    'service/getMyServices',
    async (token: any, thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}flip/merchant/service/my-services`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const createService = createAsyncThunk(
    'service/createService',
    async (data: ServiceData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/service/create-service`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateService = createAsyncThunk(
    'service/updateService',
    async (data: ServiceData, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/service/update-service/${data.serviceID}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const addServiceImages = createAsyncThunk(
    'service/addServiceImages',
    async (data: any, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/service/add-service-images/${data.serviceID}`, data, {
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

export const activateService = createAsyncThunk(
    'service/activateService',
    async (serviceID: number, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseApi}flip/merchant/service/activate-service/${serviceID}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const deactivateService = createAsyncThunk(
    'service/deactivateService',
    async (serviceID: number, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseApi}flip/merchant/service/deactivate-service/${serviceID}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const removeServiceImage = createAsyncThunk(
    'service/removeServiceImage',
    async (id: number, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${baseApi}flip/merchant/service/remove-service-image/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getAllServices = createAsyncThunk(
    'service/getAllServices',
    async (thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}flip/service/all-services`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getSingleService = createAsyncThunk(
    'service/getSingleService',
    async (serviceID: number, thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}flip/service/single-service/${serviceID}`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getServicesByMerchant = createAsyncThunk(
    'service/getServicesByMerchant',
    async (merchantID: number, thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}flip/service/service-by-merchant/${merchantID}`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getServicesCategory = createAsyncThunk(
    'service/getServicesCategory',
    async (thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}flip/service/categories`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getServicesByCategory = createAsyncThunk(
    'service/getServicesByCategory',
    async (categoryID: number, thunkAPI: any) => {
        try {
            const response = await axios.get(`${baseApi}flip/service/service-by-category/${categoryID}`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const requestService = createAsyncThunk(
    'service/requestService',
    async (data: any, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/service/service-request/${data.serviceID}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getServiceRequestByMerchant = createAsyncThunk(
    'service/getServiceRequestByMerchant',
    async (thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseApi}flip/merchant/service/all-service-requests`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const acceptServiceRequest = createAsyncThunk(
    'service/acceptServiceRequest',
    async (data: any, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/service/accept-request/${data.requestID}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const rejectServiceRequest = createAsyncThunk(
    'service/rejectServiceRequest',
    async (data: any, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/merchant/service/reject-request/${data.requestID}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getServiceRequestByConsumer = createAsyncThunk(
    'service/getServiceRequestByConsumer',
    async (thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseApi}flip/service/my-service-requests`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const payForServiceRequest = createAsyncThunk(
    'service/payForServiceRequestWithWallet',
    async (data: any, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/service/pay-for-service/${data.requestID}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const confirmServiceRequest = createAsyncThunk(
    'service/confirmServiceRequest',
    async (data: any, thunkAPI: any) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseApi}flip/service/mark-as-completed/${data.requestID}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

interface ServiceState {
    services: any;
    service: any;
    success: boolean;
    servicesCategories: any;
    loading: boolean;
    error: string;
    message: string;
    errorFetchServices: string;
    successFetchServices: boolean;
    loadingFetchServices: boolean;
    errorActivateServiceDeactivateService: string;
    successActivateServiceDeactivateService: boolean;
    loadingActivateServiceDeactivateService: boolean;

    loadingFetcServiceRequest: boolean;
    successFetcServiceRequest: boolean;
    errorFetcServiceRequest: string;
    serviceRequests: any;
    loadingAcceptRejectServiceRequest: boolean;
    successAcceptRejectServiceRequest: boolean;
    errorAcceptRejectServiceRequest: string;
}

const initialState: ServiceState = {
    services: [],
    service: {},
    success: false,
    servicesCategories: [],
    loading: false,
    error: '',
    message: '',
    errorFetchServices: '',
    successFetchServices: false,
    loadingFetchServices: false,
    errorActivateServiceDeactivateService: '',
    successActivateServiceDeactivateService: false,
    loadingActivateServiceDeactivateService: false,

    loadingFetcServiceRequest: false,
    successFetcServiceRequest: false,
    errorFetcServiceRequest: '',
    serviceRequests: [],
    loadingAcceptRejectServiceRequest: false,
    successAcceptRejectServiceRequest: false,
    errorAcceptRejectServiceRequest: ''
}

const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = '';
            state.success = false;
            state.successFetchServices = false;
            state.successActivateServiceDeactivateService = false;
            state.successAcceptRejectServiceRequest = false;
            state.successFetcServiceRequest = false;
        },
        clearError: (state) => {
            state.error = '';
            state.success = false;
            state.errorFetchServices = '';
            state.successFetchServices = false;
            state.errorActivateServiceDeactivateService = '';
            state.successActivateServiceDeactivateService = false;
            state.errorAcceptRejectServiceRequest = '';
            state.successAcceptRejectServiceRequest = false;
            state.errorFetcServiceRequest = '';
            state.successFetcServiceRequest = false;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getMyServices.pending, (state) => {
            state.loadingFetchServices = true;
        });
        builder.addCase(getMyServices.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetchServices = false;
            state.successFetchServices = true;
            state.services = action.payload.data;
        });
        builder.addCase(getMyServices.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetchServices = false;
            state.errorFetchServices = action.payload?.message;
        });

        builder.addCase(createService.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createService.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
        });
        builder.addCase(createService.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.message;
        });

        builder.addCase(updateService.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateService.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
        });
        builder.addCase(updateService.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.message;
        });

        builder.addCase(addServiceImages.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addServiceImages.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
        });
        builder.addCase(addServiceImages.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.message;
        });

        builder.addCase(activateService.pending, (state) => {
            state.loadingActivateServiceDeactivateService = true;
        });
        builder.addCase(activateService.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingActivateServiceDeactivateService = false;
            state.successActivateServiceDeactivateService = true;
            state.message = action.payload.message;
        });
        builder.addCase(activateService.rejected, (state, action: PayloadAction<any>) => {
            state.loadingActivateServiceDeactivateService = false;
            state.errorActivateServiceDeactivateService = action.payload.message;
        });
        builder.addCase(deactivateService.pending, (state) => {
            state.loadingActivateServiceDeactivateService = true;
        });
        builder.addCase(deactivateService.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingActivateServiceDeactivateService = false;
            state.successActivateServiceDeactivateService = true;
            state.message = action.payload.message;
        });
        builder.addCase(deactivateService.rejected, (state, action: PayloadAction<any>) => {
            state.loadingActivateServiceDeactivateService = false;
            state.errorActivateServiceDeactivateService = action.payload.message;
        });
        builder.addCase(removeServiceImage.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(removeServiceImage.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
        });
        builder.addCase(removeServiceImage.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.message;
        });
        builder.addCase(getAllServices.pending, (state) => {
            state.loadingFetchServices = true;
        });
        builder.addCase(getAllServices.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetchServices = false;
            state.successFetchServices = true;
            state.services = action.payload.data;
        });
        builder.addCase(getAllServices.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetchServices = false;
            state.errorFetchServices = action.payload?.message;
        });
        builder.addCase(getSingleService.pending, (state) => {
            state.loadingFetchServices = true;
        });
        builder.addCase(getSingleService.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetchServices = false;
            state.successFetchServices = true;
            state.service = action.payload.data;
        });
        builder.addCase(getSingleService.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetchServices = false;
            state.errorFetchServices = action.payload?.message;
        });
        builder.addCase(getServicesByMerchant.pending, (state) => {
            state.loadingFetchServices = true;
        });
        builder.addCase(getServicesByMerchant.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetchServices = false;
            state.successFetchServices = true;
            state.services = action.payload.data;
        });
        builder.addCase(getServicesByMerchant.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetchServices = false;
            state.errorFetchServices = action.payload?.message;
        });
        builder.addCase(getServicesCategory.pending, (state) => {
            state.loadingFetchServices = true;
        });
        builder.addCase(getServicesCategory.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetchServices = false;
            state.successFetchServices = true;
            state.servicesCategories = action.payload.data;
        });
        builder.addCase(getServicesCategory.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetchServices = false;
            state.errorFetchServices = action.payload?.message;
        });
        builder.addCase(getServicesByCategory.pending, (state) => {
            state.loadingFetchServices = true;
        });
        builder.addCase(getServicesByCategory.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetchServices = false;
            state.successFetchServices = true;
            state.services = action.payload.data;
        });
        builder.addCase(getServicesByCategory.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetchServices = false;
            state.errorFetchServices = action.payload?.message;
        });
        builder.addCase(requestService.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(requestService.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
        });
        builder.addCase(requestService.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.message;
        });
        builder.addCase(getServiceRequestByMerchant.pending, (state) => {
            state.loadingFetcServiceRequest = true;
        });
        builder.addCase(getServiceRequestByMerchant.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetcServiceRequest = false;
            state.successFetcServiceRequest = true;
            state.serviceRequests = action.payload.data;
        });
        builder.addCase(getServiceRequestByMerchant.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetcServiceRequest = false;
            state.errorFetcServiceRequest = action.payload.message;
        });
        builder.addCase(acceptServiceRequest.pending, (state) => {
            state.loadingAcceptRejectServiceRequest = true;
        });
        builder.addCase(acceptServiceRequest.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingAcceptRejectServiceRequest = false;
            state.successAcceptRejectServiceRequest = true;
            state.message = action.payload.message;
        });
        builder.addCase(acceptServiceRequest.rejected, (state, action: PayloadAction<any>) => {
            state.loadingAcceptRejectServiceRequest = false;
            state.errorAcceptRejectServiceRequest = action.payload.message;
        });
        builder.addCase(rejectServiceRequest.pending, (state) => {
            state.loadingAcceptRejectServiceRequest = true;
        });
        builder.addCase(rejectServiceRequest.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingAcceptRejectServiceRequest = false;
            state.successAcceptRejectServiceRequest = true;
            state.message = action.payload.message;
        });
        builder.addCase(rejectServiceRequest.rejected, (state, action: PayloadAction<any>) => {
            state.loadingAcceptRejectServiceRequest = false;
            state.errorAcceptRejectServiceRequest = action.payload.message;
        });

        builder.addCase(getServiceRequestByConsumer.pending, (state) => {
            state.loadingFetcServiceRequest = true;
        });
        builder.addCase(getServiceRequestByConsumer.fulfilled, (state, action: PayloadAction<any>) => {
            state.loadingFetcServiceRequest = false;
            state.successFetcServiceRequest = true;
            state.serviceRequests = action.payload.data;
        });
        builder.addCase(getServiceRequestByConsumer.rejected, (state, action: PayloadAction<any>) => {
            state.loadingFetcServiceRequest = false;
            state.errorFetcServiceRequest = action.payload.message;
        });
        builder.addCase(payForServiceRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(payForServiceRequest.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
        });
        builder.addCase(payForServiceRequest.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.message;
        });
        builder.addCase(confirmServiceRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(confirmServiceRequest.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
        });
        builder.addCase(confirmServiceRequest.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload.message;
        });
    }
})

export const { clearMessage, clearError } = serviceSlice.actions;

export default serviceSlice.reducer;