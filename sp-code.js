export function spCode() {
  return `
    let pointerDown = input();
    let s = getSpace();

    let scale = input(1., 2., 10.);
    let scale2 = input(1., 1., 100.);
    let n = noise(s*scale + vec3(0,0,time)) + noise(s*scale2*.4 + vec3(0,0,time));
    color(normal * .3 + vec3(8, 3, 1));
    setStepSize(0.5);
    sphere(0.9+0.1*scale2*n);`
  
}