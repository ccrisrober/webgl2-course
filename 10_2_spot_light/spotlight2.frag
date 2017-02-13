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
uniform vec3 lightDirection;

void main() 
{
    vec3 light_ambient = vec3(0.1);
    vec3 light_specular = vec3(0.1);
    float light_constant = 1.0;
    float light_linear = 0.09;
    float light_quadratic = 0.032;
    float material_shininess = 32.0;

    float light_outerCutoff = 0.9767;
    float light_cutoff = 0.99857;

    
    // Ambient
    vec3 ambient = light_ambient * vec3(texture(ourTexture, Tc));
    
    // Diffuse 
    vec3 norm = normalize(Normal);        
    vec3 lightDir = normalize(lightPos - Pos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = lightColor * diff * vec3(texture(ourTexture, Tc));  
    
    // Specular
    vec3 viewDir = normalize(viewPos - Pos);
    vec3 reflectDir = reflect(-lightDir, norm);  
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), material_shininess);
    vec3 specular = light_specular * spec;
    
    // Spotlight (soft edges)
    float theta = dot(lightDir, normalize(-lightDirection)); 
    float epsilon = (light_cutoff - light_outerCutoff);
    float intensity = clamp((theta - light_outerCutoff) / epsilon, 0.0, 1.0);
    diffuse  *= intensity;
    specular *= intensity;
    
    // Attenuation
    float distance    = length(lightPos - Pos);
    float attenuation = 1.0 / (light_constant + light_linear
        * distance + light_quadratic
        * (distance * distance));    
    ambient  *= attenuation; 
    diffuse  *= attenuation;
    specular *= attenuation;   
            
    fragColor = vec4(ambient + diffuse + specular, 1.0);  
}