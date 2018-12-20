export const doTest = () => ({
    type: 'SET_TEST',
    test: 'some text',
});

export const loadAllPosts = (posts) => ({
    type: 'LOAD_POSTS',
    posts,
});

export const importPost = (post) => ({
    type: 'IMPORT_POST',
    post,
})

export const loadUserid = (userid) => ({
    type: 'IMPORT_USERID',
    userid,
})
