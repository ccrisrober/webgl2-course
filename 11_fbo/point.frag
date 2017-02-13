#version 300 es
precision mediump float;

out vec4 fragColor;

in vec3 Pos;
in vec3 Normal;
in vec2 Tc;

uniform sampler2D ourTexture;

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

    // Specular
    float specularStrength = 0.5;
    vec3 viewDir = normalize(viewPos - Pos);
    vec3 reflectDir = reflect(-lightDir, norm);

    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    vec3 specular = specularStrength * spec * lightColor;

    float light_constant = 1.0;
    float light_linear = 0.09;
    float light_quadratic = 0.032;

    float distance    = length(lightPos - Pos);
    float attenuation = 1.0 / (light_constant + light_linear * distance + 
                light_quadratic * (distance * distance));    

    vec3 result = (ambient + diffuse + specular) * objectColor * attenuation;
    fragColor = vec4(result, 1.0);
}