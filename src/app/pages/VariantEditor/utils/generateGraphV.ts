import {VariantWithAnswer} from "./generateStruct";

export function generateGraphV(struct: VariantWithAnswer | undefined, vertexAmount: number, edgesAmount: number): VariantWithAnswer<"graph"> | VariantWithAnswer<"n-graphs"> {
    if (struct) {
        switch (struct.task.type) {
            case "graph": {
                return {
                    answer: struct.answer,
                    task: {
                        type: "n-graphs",
                        value: {
                            count: 2,
                            graphs: [
                                struct.task.value,
                                {
                                    vertices: Array.from(Array(vertexAmount).keys()).map(e => `${e}`),
                                    edges: Array.from(Array(edgesAmount))
                                        .map(() => ({
                                            source: `${Math.floor(Math.random() * vertexAmount)}`,
                                            target: `${Math.floor(Math.random() * vertexAmount)}`
                                        }))
                                }
                            ]
                        }
                    }
                }
            }
            case "n-graphs": {
                return {
                    answer: struct.answer,
                    task: {
                        type: "n-graphs",
                        value: {
                            count: struct.task.value.count + 1,
                            graphs: struct.task.value.graphs.concat({
                                vertices: Array.from(Array(vertexAmount).keys()).map(e => `${e}`),
                                edges: Array.from(Array(edgesAmount))
                                    .map(() => ({
                                        source: `${Math.floor(Math.random() * vertexAmount)}`,
                                        target: `${Math.floor(Math.random() * vertexAmount)}`
                                    }))
                            })
                        }
                    }
                }
            }
            default: {
                throw Error("К данной структуре нельзя добавить структуру графа!");
            }
        }
    } else {
        return {
            answer: "answer",
            task: {
                type: "graph",
                value: {
                    vertices: Array.from(Array(vertexAmount).keys()).map(e => `${e}`),
                    edges: Array.from(Array(edgesAmount))
                        .map(() => ({
                            source: `${Math.floor(Math.random() * vertexAmount)}`,
                            target: `${Math.floor(Math.random() * vertexAmount)}`
                        }))
                }
            }
        }
    }
}