#version 300 es
precision mediump float;

in vec2 Texcoord;
out vec4 fragColor;

uniform vec3 viewPos;

uniform sampler2D texPosFramebuffer;
uniform sampler2D texNormFramebuffer;
uniform sampler2D texDiffFramebuffer;

uniform vec3 lightPosition[10];
uniform vec3 lightColor[10];

const float constant = 1.0; 
const float linear = 0.7;
const float quadratic = 1.8;

void main()
{
	vec3 Pos = texture(texPosFramebuffer, Texcoord).xyz;
	vec3 Normal = texture(texNormFramebuffer, Texcoord).xyz;
	vec3 Diffuse = texture(texDiffFramebuffer, Texcoord).rgb;
    vec3 viewDir = normalize(viewPos - Pos);

    vec3 lighting  = Diffuse * 0.1; // hard-coded ambient component

    for (int i = 0; i < 10; ++i)
    {
	    // Diffuse
        vec3 lightDir = normalize(lightPosition[i] - Pos);
        vec3 diffuse = max(dot(Normal, lightDir), 0.0) * Diffuse * lightColor[i];

        // Specular
        vec3 halfwayDir = normalize(lightDir + viewDir);  
        float spec = pow(max(dot(Normal, halfwayDir), 0.0), 16.0);
        vec3 specular = lightColor[i] * spec * lightColor[i];

        // Attenuation
        float distance = length(lightPosition[i] - Pos);
        float attenuation = 1.0 / (1.0 + linear * distance + quadratic * distance * distance);
        diffuse *= attenuation;
        specular *= attenuation;
        lighting += diffuse + specular;
    }

    fragColor = vec4(lighting, 1.0);
}