import styled from 'styled-components'

import { RESOURCES } from '../constants/resources'

export const ResourcesWrapper = styled.div`
    margin: 50px 0 30px 0;
`

export const ResourcesTitle = styled.div`
    color: #fff;
    font-size: 24px;
    font-weight: 600;
`

export const ResourcesDescription = styled.div`
    color: #A58AF9;
    padding-top: 6px;
    font-size: 14px;
`

export const ResourcesInnerWrapper = styled.div`
    display: grid;
    margin-top: 40px;
    grid-row-gap: 50px;
    grid-column-gap: 20px;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(3, 1fr);
`

export const Resource = styled.div``

export const ResourceTitle = styled.div`
    color: #D2DAEA;
    font-size: 18px;
    font-weight: 600;
    padding-bottom: 4px;
`

export const ResourceDescription = styled.div`
    color: #858692;
    font-size: 14px;
    font-weight: 400;
    padding-bottom: 8px;
    line-height: 1.5;
`

export const ResourceButton = styled.a`
    display: flex;
    background-color: #20475C;
    color: #A5DEFF;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 12px 10px;
    border-radius: 8px;
    margin-top: 8px;
    cursor: pointer;
    text-decoration: none;
    text-transform: capitalize;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #285a75;
        transition: all 0.2s ease-in-out;
    }
`

export const Resources = () => (
    <ResourcesWrapper>
        <ResourcesTitle>Learning Resources</ResourcesTitle>
        <ResourcesDescription>Further your Lightning Network knowledge by reading the following resources:</ResourcesDescription>
        <ResourcesInnerWrapper>
            {RESOURCES.map((resource) => (
                <Resource key={resource.id}>
                    <ResourceTitle>{resource.title}</ResourceTitle>
                    <ResourceDescription>{resource.description}</ResourceDescription>
                    <ResourceButton href={resource.url} target="_blank">
                        {resource.buttonText}
                    </ResourceButton>
                </Resource>
            ))}
        </ResourcesInnerWrapper>
    </ResourcesWrapper>
)
