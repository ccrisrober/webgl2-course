#version 300 es
precision mediump float;

out vec4 fragColor;

in vec3 Pos;
in vec3 Normal;
in vec2 Tc;

uniform sampler2D ourTexture;

uniform vec3 ourColor;

uniform vec3 viewPos;
uniform vec3 lightPos;
uniform vec3 lightColor;

void main() 
{
    vec3 objectColor = texture(ourTexture, Tc).rgb;
    
    // Ambient
    float ambientStrength = 0.6;
    vec3 ambient = ambientStrength * lightColor;

    // Diffuse 
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(lightPos - Pos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;

    vec3 result = (ambient + diffuse) * objectColor;
    fragColor = vec4(objectColor, 1.0);
}