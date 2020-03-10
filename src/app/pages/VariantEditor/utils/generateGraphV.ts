export function generateGraphV(vertexAmount: number, edgesAmount: number) {
    const vertices = Array.from(Array(vertexAmount).keys())
        .map(e => `"${e}"`)
        .join(",");
    const edges = Array.from(Array(edgesAmount))
        .map(() => `{ "sources": "${Math.floor(Math.random()*vertexAmount)}" , "target": "${Math.floor(Math.random()*vertexAmount)}" }`)
        .join(",\n\t");
    return `{ "type": "graph", "value": {\n` +
        `\t"vertices": [${vertices}], \n` +
        `\t"edges": \n` +
        `\t[${edges}], \n` +
        `\t"answer": "put your answer here"\n` +
        `   } \n` +
        `}`;
}