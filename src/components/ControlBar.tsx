import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Dropdown, Input } from 'semantic-ui-react'

export interface ControlBarProps {
    isUser : boolean;
    searchText : string;
    count : number;
}

const ControlBar : React.FC<ControlBarProps> = (props : ControlBarProps) => {
    const [isUser, setUser] = useState(props.isUser)
    const [searchText, setSearchText] = useState(props.searchText)
    const [count, setCount] = useState(props.count)

    const dropDown = <ControlBarDropdown 
                        options={SearchOptions}
                        value={isUser ? '/u' : '/r'}
                        onChange={(e, d) => setUser(d.value === '/u')}
                    />

    const history = useHistory()
    const onSearch = () => {
        history.push(`/search?${isUser? 'u' : 'r'}=${searchText}&n=${count}`)
    }

    return (
        <Container>
            <ControlBarInput
                label={dropDown}
                value={searchText}
                onChange={(e, d) => setSearchText(d.value)}
            />

            <ButtonGroup>
                {[10, 25, 50].map((n, i) => (
                        <Button 
                            key={i}
                            color={n === count ? 'teal' : 'grey'}
                            onClick={() => setCount(n)}
                        >
                            {n}
                        </Button>
                    ))
                }
            </ButtonGroup>

            <ControlBarButton>
                <Button color={'teal'} onClick={onSearch}>Fetch Images</Button>
            </ControlBarButton>
        </Container>
    )
}

const SearchOptions = ['/r', '/u'].map(opt => ({
    key : opt,
    value : opt,
    text : opt,
}));

const Container = styled.div({
    paddingTop : 50,
    paddingBottom : 50,
    display : 'flex',
    flexWrap : 'wrap',
    justifyContent : 'center'
});

const ControlBarDropdown = styled(Dropdown)({
});

const ControlBarInput = styled(Input)({
    width: 400,
    marginRight : 20,
});

const ControlBarButton = styled.span({
    marginLeft : 20,
});

const ButtonGroup = styled(Button.Group)({
});

export default ControlBar;
