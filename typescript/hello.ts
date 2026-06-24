interface Shape {
    name: string;
    width: number;
    height: number;
    color?: string;
}

function area(shape: Shape){
    var area = shape.width * shape.height;
    return `I'm a ${shape.name} with an area of ${area} cm squared.`;

}

console.log(area({name: "rectangle", width: 30, height: 15}));
console.log(area({name: "square", width: 20, height: 20, color: "red"}));
console.log( area({width: 30, height: 15}));2024