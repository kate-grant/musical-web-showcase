export function spCode() {
  return `
    let isPlaying = input();
    let audio = input();
    
    let s = getSpace();
    let r = getRayDirection();

    let scale = input(1., 2., 10.);
    let scale2 = input(1., 1., 100.);
    let n = noise(s*audio*0.1 + vec3(0,0,time)) + noise(r*.4 + vec3(audio,audio*0.1,time*audio*0.9));
    color(normal * .3 + vec3(8, 3, 1));
    setStepSize(0.3);
    sphere(0.8+0.2*n);`
  
}