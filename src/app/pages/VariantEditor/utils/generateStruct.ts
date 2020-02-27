import {generateMatrix} from "./matrixGenerator";
import {generateGraphVE} from "./generateGraphVE";
import {generateGraphV} from "./generateGraphV";

export function getJSON(structToGenerate: string, vertexAmount: number, edgesAmount: number) {
    switch (structToGenerate) {
        case "graphV": {
            return generateGraphV(vertexAmount, edgesAmount);
        }
        case "graphVE": {
            return generateGraphVE(vertexAmount, edgesAmount);
        }
        case "matrix": {
            return generateMatrix(vertexAmount, edgesAmount);
        }
        default: {
            return "Здесь еще ничего нет";
        }
    }
}