
export interface Poll {
    id: number,
    name: string,
    description: string,
    address: string,
    blockNumber: string,
    metadata: {
        endTime: number,
        startTime:  number,
        estimatedTime: number,
        isAb: boolean,
    },
    createdAt: string,
    updatedAt: string,
    questions: Array<Question>
};

export interface Question {
    id: number,
    qname: string,
    qdesc: string,
    pollInfoId: number,
    createdAt: string,
    options: Array<Options>
}

export interface Options {
    id: number,
    oname: string,
    odesc: string,
    oimg: string,
    pollQuestionId: number,
    createdAt: string
}