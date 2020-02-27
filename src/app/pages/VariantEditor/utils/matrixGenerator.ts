export function generateMatrix(vertexAmount: number, edgesAmount: number) {
    const rows = Array.from(Array(vertexAmount).keys())
        .map(e => `"${e}"`)
        .join(",");
    const cols = Array.from(Array(edgesAmount).keys())
        .map(e => `"${e}"`)
        .join(",");
    const line = Array.from(Array(edgesAmount).keys())
        .map(e => `"${e}"`)
        .join(",");
    const matrix = Array.from(Array(vertexAmount))
        .map(() => `[${line}]`)
        .join(",\n\t");
    return `{ "type": "matrix", "value": {\n` +
        `\t"rows": [${rows}], \n` +
        `\t"columns": [${cols}], \n` +
        `\t"elements":\n\t [${matrix}] \n` +
        `}}`;
}