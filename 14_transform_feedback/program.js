glx = glx || {};

"use strict";
var mode;
(function (mode) {
	mode[mode["read_file"] = 0] = "read_file";
	mode[mode["read_script"] = 1] = "read_script";
	mode[mode["read_text"] = 2] = "read_text";
})(mode || (mode = {}));
;
glx.program = function()
{
	this.uniformLocations = {};
	this.attribLocations = {};
	this.shaders = [];
};
glx.program.prototype = 
{
	addAttributes: function (attrs)
	{
		for (var attr in attrs) {
			attr = attrs[attr];
			this.attribLocations[attr] = gl.getAttribLocation(this.mCompiledShader, attr);
		}
	},
	addUniforms: function(unifs)
	{
		for (var unif in unifs) {
			unif = unifs[unif];
			this.uniformLocations[unif] = gl.getUniformLocation(this.mCompiledShader, unif);
		}
	},
	program: function()
	{
		return this.mCompiledShader;
	},
	addShader: function(shader_, type, _mode)
	{
		var shader;
		if (_mode == mode.read_file)
		{
			shader = this.loadAndCompileWithFile(shader_, type);
		}
		else if (_mode == mode.read_script)
		{
			shader = this.loadAndCompile(shader_, type);
		}
		else if (_mode == mode.read_text)
		{
			shader = this.loadAndCompileFromText(shader_, type);
		}
		this.shaders.push(shader);
	},
	compile: function() 
	{
		// Creamos y linkamos shaders
		this.mCompiledShader = gl.createProgram();
		for (var i = 0; i < this.shaders.length; i++)
		{
			gl.attachShader(this.mCompiledShader, this.shaders[i]);
		}
	},
	link: function()
	{
		gl.linkProgram(this.mCompiledShader);
		// Consultamos errores
		if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS))
		{
			alert("ERROR");
			console.warn("Error in program linking:" + 
				gl.getProgramInfoLog(this.mCompiledShader));
			console.log(this.fragmentSource);
			throw "SHADER ERROR";
		}
	},
	compile_and_link: function()
	{
		this.compile();
		this.link();
		return true;
	},
	loadAndCompileWithFile: function(filePath, shaderType)
	{
		var request = new XMLHttpRequest();
		request.open("GET", filePath, false);
		try
		{
			request.send();
		}
		catch (err)
		{
			alert("ERROR: " + filePath);
			console.log("ERROR: " + filePath);
			return null;
		}
		var shaderSource = request.responseText;
		if (shaderSource === null)
		{
			alert("WARNING: " + filePath + " failed");
			console.log(this.fragmentSource);
			throw "SHADER ERROR";
		}
		"SHADER ERROR";
		return this.compileShader(shaderSource, shaderType);
	},
	loadAndCompileFromText: function(shaderSource, shaderType)
	{
		if (shaderSource === null)
		{
			alert("WARNING: " + shaderSource + " failed");
			console.log(this.fragmentSource);
			throw "SHADER ERROR";
		}
		return this.compileShader(shaderSource, shaderType);
	},
	loadAndCompile: function(id, shaderType)
	{
		var shaderText, shaderSource;
		// Obtenemos el shader del index.html
		shaderText = document.getElementById(id);
		shaderSource = shaderText.firstChild.textContent;
		if (shaderSource === null)
		{
			alert("WARNING: " + id + " failed");
			console.log(this.fragmentSource);
			throw "SHADER ERROR";
		}
		return this.compileShader(shaderSource, shaderType);
	},
	compileShader: function(shaderSource, shaderType)
	{
		var compiledShader;
		if (shaderType == gl.VERTEX_SHADER)
		{
			this.vertexSource = shaderSource;
		}
		else if (shaderType == gl.FRAGMENT_SHADER)
		{
			this.fragmentSource = shaderSource;
		}
		// Creamos el shader
		compiledShader = gl.createShader(shaderType);
		// Compilamos el shader
		gl.shaderSource(compiledShader, shaderSource);
		gl.compileShader(compiledShader);
		// Consultamos si hay errores
		if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS))
		{
			alert("ERROR: " + gl.getShaderInfoLog(compiledShader));
			console.log("ERROR: " + gl.getShaderInfoLog(compiledShader));
			console.log(this.fragmentSource);
			throw "SHADER ERROR";
		}
		return compiledShader;
	},
	use: function()
	{
		gl.useProgram(this.mCompiledShader);
	},
	dispose: function()
	{
		/*this.shaders.forEach(function(s) {
			gl.detachShader(this.mCompiledShader, s);
		});
		gl.deleteShader(this.mCompiledShader);*/
	}
};