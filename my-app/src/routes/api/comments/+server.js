import { json } from '@sveltejs/kit';
import { comments } from '$lib/comments.js';

export async function GET() {
    return json(comments);
}

// export function GET(){
//     return new Response(JSON.stringify(comments), {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
// }
export async function POST(requestEvent) {
    const { request } = requestEvent;
    const { comment } = await request.json();
    const newId = comments.length + 1;
    const newComment = { id: newId, comment };
    comments.push(newComment);
    return json(newComment, {status: 201});
}
