interface UserState{
    users: IUser[];
    isLoading: boolean;
    error:string;
}

const initializeState ={
    users: [],
    isLoading: false,
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initializeState,
    reducers:
    {

    }
})