export type User = {
    id: number,
    firstname: string,
    lastname: string,
}

export type OAuthUser = {
    uid: string,
    displayName: string,
    email: string,
    photoURL: string,
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
    isMemoried: boolean,
    explaination: string
}

export type Topic = {
    id: number,
    name: string
}