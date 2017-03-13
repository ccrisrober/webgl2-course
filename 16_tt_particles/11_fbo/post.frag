#version 300 es
precision mediump float;

in vec2 Texcoord;
out vec4 fragColor;
uniform sampler2D texFramebuffer;
uniform float globalTime;

/*void main()
{
	fragColor = vec4(Texcoord, 0.0, 1.0);
	fragColor = texture(texFramebuffer, Texcoord);
}*/

const float blurSizeH = 1.0 / 500.0;
const float blurSizeV = 1.0 / 500.0;
void main()
{
	/*vec4 sum = vec4(0.0);
	for (int x = -4; x <= 4; x++)
	{
		for (int y = -4; y <= 4; y++)
		{
			sum += texture(
				texFramebuffer,
				vec2(Texcoord.x + float(x) * blurSizeH, Texcoord.y + float(y) * blurSizeV)
			) / 81.0;
		}
	}
	fragColor = sum;*/

	fragColor = vec4(vec3(1.0 - texture(texFramebuffer, Texcoord)), 1.0);

	vec2 texcoord = Texcoord;
  texcoord.x += sin(texcoord.y * 4.0 * 2.0 * 
  	3.14159 + globalTime) / 100.0;
  fragColor = texture(texFramebuffer, texcoord);
}