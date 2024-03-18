export type User = {
    firstName: string,
    lastName: string
}

export type VocabularySet = {
    id: number,
    name: string,
    description: string
}

export type Vocabulary = {
    id: number;
    vocabulary: string,
    pos: string,
    vietnamese: string,
    example: string,
    isMemoried: boolean
}

export type Topic = {
    id: number,
    name: string
}