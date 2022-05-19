
export const resourceSearch = {
    state: () => ({ 
        videoSelected: null
    }),
    mutations: {
        selectVideo(state, payload){
            state.videoSelected = payload.value;
        }
    },
    actions: {
    },
    getters: {
        videoSelected: (state) => {
            return state.videoSelected;
        }
    }
}