import {VariantWithAnswer} from "./generateStruct";

export function generateMatrix(struct: VariantWithAnswer | undefined, vertexAmount: number, edgesAmount: number): VariantWithAnswer<"matrix"> | VariantWithAnswer<"n-matrices"> {
    if (struct) {
        switch (struct.task.type) {
            case "matrix": {
                return {
                    answer: struct.answer,
                    task: {
                        type: "n-matrices",
                        value: {
                            count: 2,
                            matrices: [
                                struct.task.value,
                                {
                                    rows: Array.from(Array(vertexAmount).keys()).map(e => `${e}`),
                                    columns: Array.from(Array(edgesAmount).keys()).map(e => `${e}`),
                                    elements: Array.from(Array(vertexAmount))
                                        .map(() => Array.from(Array(edgesAmount).keys())
                                            .map(() => `${Math.round(Math.random())}`))
                                }
                            ]
                        }
                    }
                }

            }
            case "n-matrices": {
                return {
                    answer: struct.answer,
                    task: {
                        type: "n-matrices",
                        value: {
                            count: struct.task.value.count + 1,
                            matrices: struct.task.value.matrices.concat({
                                rows: Array.from(Array(vertexAmount).keys()).map(e => `${e}`),
                                columns: Array.from(Array(edgesAmount).keys()).map(e => `${e}`),
                                elements: Array.from(Array(vertexAmount))
                                    .map(() => Array.from(Array(edgesAmount).keys())
                                        .map(() => `${Math.round(Math.random())}`))
                            })
                        }
                    }
                }
            }
            default: {
                throw Error("К данной структуре нельзя добавить структуру матрицы!");
            }
        }
    } else {
        return {
            answer: "answer",
            task: {
                type: "matrix",
                value: {
                    rows: Array.from(Array(vertexAmount).keys()).map(e => `${e}`),
                    columns: Array.from(Array(edgesAmount).keys()).map(e => `${e}`),
                    elements: Array.from(Array(vertexAmount))
                        .map(() => Array.from(Array(edgesAmount).keys())
                            .map(() => `${Math.round(Math.random())}`))
                }
            }
        }
    }
}