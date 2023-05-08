export function spCode() {
  return `
    let audio = input();
    
    console.log(audio)
    let s = getSpace();

    let scale = input(1., 2., 10.);
    let scale2 = input(1., 1., 100.);
    let n = noise(s*scale + vec3(0,0,time*audio*0.01)) + noise(s*scale2*.4 + vec3(0,0,time*audio*0.01)*sin(audio*0.1));
    color(normal * .3 + vec3(8, 3, 1));
    setStepSize(0.5);
    sphere(0.9+0.1*scale2*n*audio);`
  
}