import { getPosts } from '@/sanity/lib/posts/getPosts';
import { currentUser } from '@clerk/nextjs/server'
import Post from './Post';

const PostsList = async () => {
    const user = await currentUser();
    const posts = await getPosts();
    
  return (
    <div className='space-y-4'>
      {posts.map((post) => (
        <Post key={post._id} post={post} userId={user?.id || null} />
      ))}
    </div>
  )
}

export default PostsList
