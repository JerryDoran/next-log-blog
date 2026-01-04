import PostForm from '@/components/posts/post-form';

export default function PostDetailsPage() {
  return (
    <div className='p-8 flex flex-col w-full'>
      <PostForm
        id=''
        title=''
        content=''
        imageUrl=''
        categoryId=''
        tags={[]}
        status=''
        categories={[]}
        slug=''
      />
    </div>
  );
}
