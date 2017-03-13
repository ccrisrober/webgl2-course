#version 300 es
precision mediump float;

out vec4 fragColor;

in vec2 tc;
in vec3 outColor;

uniform sampler2D ourTexture1;
uniform sampler2D ourTexture2;

uniform vec3 ourColor;

void main() 
{
    fragColor = mix(texture(ourTexture1, tc), texture(ourTexture2, tc), 0.2);
    fragColor.rgb *= outColor;
}