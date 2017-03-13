precision mediump float;

varying vec2 tc;

void main() 
{
    gl_FragColor = vec4(tc, 0.0, 1.0);
}