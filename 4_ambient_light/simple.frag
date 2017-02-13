#version 300 es
precision mediump float;

out vec4 fragColor;

uniform vec3 ourColor;

uniform vec3 lightColor;

void main() 
{
    float ambientStrength = 0.3;
    vec3 ambient = ambientStrength * lightColor;

    vec3 result = ambient * ourColor;
    fragColor = vec4(result, 1.0);
}