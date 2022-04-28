import styled from 'styled-components'

import { RESOURCES } from '../constants/resources'

export const ResourcesWrapper = styled.div`
        margin: 30px 0;
`

export const ResourcesTitle = styled.div`
    color: #fff;
    font-size: 20px;
    font-weight: 600;
`

export const ResourcesDescription = styled.div`
    color: #fff;
    padding-top: 10px;
    font-size: 14px;
`

export const ResourcesInnerWrapper = styled.div`
    display: grid;
    margin-top: 20px;
    grid-row-gap: 20px;
    grid-column-gap: 20px;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(3, 1fr);
`

export const Resource = styled.div``

export const ResourceTitle = styled.div``

export const ResourceDescription = styled.div``

export const ResourceButton = styled.a`
    display: flex;
    background-color: #20475C;
    color: #A5DEFF;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px 12px;
    border-radius: 8px;
    margin-top: 8px;
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
