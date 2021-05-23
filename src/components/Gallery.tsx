import styled from '@emotion/styled'
import React from 'react'
import {Image} from 'semantic-ui-react'

export interface GalleryProps {
    posts : any[]
}

const Gallery : React.FC<GalleryProps> = (props : GalleryProps) => {
    // <ul>
    //         {props.posts.map(post => <li><a href={post.url} target="_blank">{post.url}</a></li>)}
    //     </ul>
    return (
        <Container>
            {props.posts.map(post => <Post url={post.url} />)}
        </Container>
    )
}

const sanitizeForImgur = (url : string) => {
    if (url.includes('imgur') && 
        !(url.includes('jpg') || url.includes('jpeg')))
        return url
    
    if (url.includes("i.imgur.com"))
        return url
    
    if (url.includes("imgur.com"))
        return url.replace("imgur.com", "i.imgur.com")
    
    return url
}

const Post = (props : {url : string}) => {
    const url = sanitizeForImgur(props.url)
    return (
        <PostDiv>
            <Image src={url} href={url} target='_blank' />
        </PostDiv>
    )
}

const PostDiv = styled.div({
    maxWidth : 400,
    padding : 20,
})

const Container = styled.div({
    display : 'flex',
    flexWrap : 'wrap',
    alignItems : 'flex-start',
})

export default Gallery