const ChargerReducer = (state, action) => {
    switch (action.type) {

        case 'SET_LOADING':
            return {
                ...state,
                isLoading: true
            }

        case "SET_LIVE_ACTIVITY_COUNT_DATA":
            return {
                ...state,
                isLoading:false,
                liveActivityCountData:action.payload,
            }

        case "API_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true,
            };

        default:
            return state;
    }
}

export default ChargerReducer;