const initialState = {
    test: 'test value',
    messages: ['Demo Message'],
    userid: 'Default',
    
};


const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_MESSAGES':
            return Object.assign({}, state, {
                messages: action.messages,
        })
        case 'IMPORT_MESSAGE':
            const newMessages = state.messages.slice(0);
            newMessages.unshift(action.message);
            return Object.assign({}, state, {
                messages: newMessages,
            })
        case 'LOAD_USERID':
            return Object.assign({}, state, {
                userid: action.userid,
        })
        case 'LOAD_IMAGE':
            return Object.assign({}, state, {
                userid: action.userid,
        })
            
        default:
            return state;
    }
};

export default testReducer;