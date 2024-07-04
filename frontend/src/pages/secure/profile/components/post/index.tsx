import styled from "styled-components";

const PostContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 2px;
    margin-top: 0px;
`

const PostItem = styled.img`
    width: 100%;
`

const PostTabContent = () => {
    const posts = [
        {
            src: 'https://picsum.photos/400'
        },
        {
            src: 'https://picsum.photos/400'
        },
        {
            src: 'https://picsum.photos/400'
        },
        {
            src: 'https://picsum.photos/400'
        },
        {
            src: 'https://picsum.photos/400'
        },
        {
            src: 'https://picsum.photos/400'
        },
    ]
    return <PostContainer>
        {posts.map((post, index) => {
            return <PostItem src={post.src} alt="post" key={index} />
        })}
    </PostContainer>
}

export default PostTabContent;