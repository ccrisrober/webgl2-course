glx = glx || {};
glx.texture = function() 
{
	this.id = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, this.id);
  	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

	gl.bindTexture(gl.TEXTURE_2D, null);
};
glx.texture.prototype = {
	load: function(url, cb)
	{
		var image = new Image();
		image.crossOrigin = "*";
		image.onload = function() 
		{
			this.set(image);
			if(cb)
			{
				cb(image);
			}
		}.bind(this);
		image.onerror = function()
		{
			if(cb)
			{
				cb();
			}
		}
		image.src = url;
		return this;
	},
	set: function(image)
	{
		if(!this.id)
		{
			return;
		}
		gl.bindTexture(gl.TEXTURE_2D, this.id);
		/*gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP);*/

		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
		gl.generateMipmap(gl.TEXTURE_2D);

		gl.bindTexture(gl.TEXTURE_2D, null);
		return this;
	},
	enable: function(idx)
	{
		if(!this.id)
		{
			return;
		}
		gl.activeTexture(gl.TEXTURE0 + (idx || 0));
		gl.bindTexture(gl.TEXTURE_2D, this.id);
		return this;
	},
	destroy: function()
	{
		gl.bindTexture(gl.TEXTURE_2D, null);
		gl.deleteTexture(this.id);
		this.id = null;
	}
}