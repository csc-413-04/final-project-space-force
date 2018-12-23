const initialState = {
    test: 'test value',
    posts: ['Demo Message'],
    userid: 'Default',

};


const testReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_POSTS':
            return Object.assign({}, state, {
                posts: action.posts,
        })
        case 'IMPORT_POST':
            const newposts = state.posts.slice(0);
            newposts.unshift(action.post);
            return Object.assign({}, state, {
                posts: newposts,
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
