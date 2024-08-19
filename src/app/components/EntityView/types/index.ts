export type Entity = {
    id: string
    matchedText?: string
    confidenceScore?: number
    relevanceScore?: number
    freebaseTypes?: string[]
}

export type EntityListProps = {
    entities: Entity[]
    isLoading: boolean
}