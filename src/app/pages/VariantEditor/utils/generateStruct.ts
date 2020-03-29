import {generateMatrix} from "./generateMatrix";
import {generateGraphVE} from "./generateGraphVE";
import {generateGraphV} from "./generateGraphV";

export interface VariantWithAnswer<Type extends "graph" | "n-graphs" | "matrix" | "n-matrices" = "graph" | "n-graphs" | "matrix" | "n-matrices"> {
    task: VariantStruct<Type>,
    answer: any
}

export type VariantStruct<T extends "graph" | "n-graphs" | "matrix" | "n-matrices"> =
    T extends "graph" ? {
            type: "graph",
            value: Graph
        } :
        T extends "n-graphs" ? {
                type: "n-graphs",
                value: {
                    count: number,
                    graphs: Graph[]
                }
            } :
            T extends "matrix" ? {
                    type: "matrix",
                    value: Matrix
                } :
                T extends "n-matrices" ? {
                    type: "n-matrices",
                    value: {
                        count: number,
                        matrices: Matrix[]
                    }
                } : {
                    type: T
                }

export interface Graph {
    vertices: string[],
    edges: Array<{
        source: string,
        target: string,
        value?: string
    }>
}

export interface Matrix {
    rows: string[],
    columns: string[],
    elements: string[][]
}

export function getJSON(currentStruct: string, structToGenerate: string, vertexAmount: number, edgesAmount: number) {
    let struct: VariantWithAnswer | undefined;
    try {
        struct = JSON.parse(currentStruct);
    } catch (e) {
        // Do nothing
    }
    switch (structToGenerate) {
        case "graphV": {
            return JSON.stringify(generateGraphV(struct, vertexAmount, edgesAmount), null, 1);
        }
        case "graphVE": {
            return JSON.stringify(generateGraphVE(struct, vertexAmount, edgesAmount), null, 1);
        }
        case "matrix": {
            return JSON.stringify(generateMatrix(struct, vertexAmount, edgesAmount), null, 1);
        }
        default: {
            return "Здесь еще ничего нет";
        }
    }
}