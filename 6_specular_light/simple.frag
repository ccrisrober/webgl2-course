#version 300 es
precision mediump float;

out vec4 fragColor;

in vec3 Pos;
in vec3 Normal;
in vec2 Tc;

uniform sampler2D ourTexture1;
uniform sampler2D ourTexture2;

uniform vec3 ourColor;

uniform vec3 viewPos;
uniform vec3 lightPos;
uniform vec3 lightColor;

void main() 
{
    vec3 objectColor = texture(ourTexture1, Tc).rgb; //vec3(0.0, 1.0, 0.0);
    
    // Ambient
    float ambientStrength = 0.6;
    vec3 ambient = ambientStrength * lightColor;

    // Diffuse 
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(lightPos - Pos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;

    // Specular
    float specularStrength = 0.5;
    vec3 viewDir = normalize(viewPos - Pos);
    vec3 reflectDir = reflect(-lightDir, norm);

    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    vec3 specular = specularStrength * spec * lightColor;  

    vec3 result = (ambient + diffuse + specular) * objectColor;
    fragColor = vec4(result, 1.0);
}