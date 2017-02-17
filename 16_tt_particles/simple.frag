#version 300 es
precision mediump float;

in float Transp;
out vec4 fragColor;

uniform sampler2D ourTexture;

void main() 
{
    fragColor = texture(ourTexture, gl_PointCoord);
    fragColor.a *= Transp;
}