
const viewport = document.createElement("div");
// viewport.style.width = "90vw";
// viewport.style.height = "90vh";
viewport.style.backgroundColor = "grey";
viewport.id = 'viewport'
document.body.appendChild(viewport);

for (let i = 0; i < 50; i++) {
    const pixel = document.createElement("div");
    pixel.style.width = "5px";
    pixel.style.height = "5px";
    pixel.style.backgroundColor = "blue";
    document.getElementById("viewport").appendChild(pixel);
}
