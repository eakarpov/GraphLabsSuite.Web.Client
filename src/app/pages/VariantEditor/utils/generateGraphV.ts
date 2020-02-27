export function generateGraphV(vertexAmount: number, edgesAmount: number) {
    const vertices = Array.from(Array(vertexAmount).keys())
        .map(e => `"${e}"`)
        .join(",");
    const edges = Array.from(Array(edgesAmount))
        .map(() => `{ "sources": "sourceName" , "target": "targetName" }`)
        .join(",\n\t");
    return `{ "type": "graph", "value": {\n` +
        `\t"vertices": [${vertices}], \n` +
        `\t"edges": \n` +
        `\t[${edges}] \n` +
        `   } \n` +
        `}`;
}