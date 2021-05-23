import React, {useState, useEffect} from 'react'
import { useQueryParams } from "../hooks/useQueryParams"
import ControlBar from "./ControlBar"
import styled from '@emotion/styled';
import axios from "axios";
import Gallery from './Gallery'

export const ReactApp = () => {
    const [reddit, user, count] = useQueryParams('r', 'u', 'n')
    const [appData, setAppData] = useState({
        posts : [] as any,
        page : 1
    })

    let postCount : number = 10;
    if (count) postCount = parseInt(count)

    console.log(reddit, user, postCount)

    const isRedditSearch = (reddit !== null)

    useEffect(() => {
        if (isRedditSearch && reddit) {
            axios.get(`https://www.reddit.com/r/${reddit}.json?limit=${postCount}`)
                .then(response => response.data.data.children.map((child : any) => child.data))
                .then(posts => {
                    console.log("$$$$", posts)
                    return posts
                })
                .then(posts => posts.filter((post : any) => post.post_hint==="image" || post.post_hint==="link"))
                .then(posts => setAppData({
                    posts,
                    page : 1,
                }))
                .catch(err => console.log(err))
            
        }

    }, [reddit, user])

    return (
        <Container>
            <ControlBar 
                isUser={!isRedditSearch}
                searchText={reddit || ""}
                count={postCount}
            />
            <Gallery posts={appData.posts} />
        </Container>
        
    )
}

const Container = styled.div({})