export type User = {
    id: number,
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
    word: string,
    partsOfSpeech: string,
    pronunciation: string,
    vietnamese: string,
    example: string,
    isMemoried: boolean
}

export type Topic = {
    id: number,
    name: string
}