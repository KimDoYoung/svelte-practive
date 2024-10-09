import {json} from '@sveltejs/kit';
import {comments} from '$lib/comments.js';

export async function GET(requestEvent){
    const {params} = requestEvent;
    const {commentId} = params;
    const comment = comments.find(comment => comment.id === parseInt(commentId));
    return json(comment);
}

export async function PATCH(requestEvent){
    const {params, request} = requestEvent;
    const {commentId} = params;
    const {comment} = await request.json();
    let exist_comment = comments.find(comment => comment.id === parseInt(commentId));
    if (exist_comment) {
        exist_comment.comment = comment;
        return json(exist_comment);
    } else {
        return json({ error: 'Comment not found' }, { status: 404 });
    }
}