#version 300 es
precision mediump float;

layout(location = 0) out vec4 posColor;
layout(location = 1) out vec4 normalColor;
layout(location = 2) out vec4 diffuseColor;

in vec3 Pos;
in vec3 Normal;
in vec2 Tc;

uniform sampler2D ourTexture;

uniform vec3 viewPos;
uniform vec3 lightPos;
uniform vec3 lightColor;

void main() 
{
    posColor = vec4(Pos, 1.0);
    normalColor = vec4(normalize(Normal), 1.0);
    diffuseColor = texture(ourTexture, Tc);
}