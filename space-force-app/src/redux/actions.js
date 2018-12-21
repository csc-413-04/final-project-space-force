export const doTest = () => ({
    type: 'POST_BROADCAST',

});

export const loadImage = (image) => ({
    type: 'LOAD_IMAGE',
    image,
});

export const loadAllPosts = (posts) => ({
    type: 'LOAD_POSTS',
    posts,
});

export const importPost = (post) => ({
    type: 'IMPORT_POST',
    post,
});

export const loadUserid = (userid) => ({
    type: 'IMPORT_USERID',
    userid,
});

