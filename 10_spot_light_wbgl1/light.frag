precision mediump float;

uniform vec3 ourColor;
uniform vec3 lightColor;

void main()
{
	gl_FragColor = vec4(lightColor * ourColor, 1.0);
}