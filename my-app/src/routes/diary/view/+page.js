export const load =  async ( loadEvent ) =>{
    const {fetch} = loadEvent;
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();
    console.log(posts)
    const title = 'Fetch Test';
    return {
        posts,
        title
    }
} 
