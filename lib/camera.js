// Path tracer in WebGL2
// Copyright (C) <2016> 
//    - Cristian Rodríguez Bernal (maldicion069)
//    - Juan Guerrero Martín (hire33)
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.
/// <reference path="gl-matrix.d.ts" />
var Camera = (function () {
    function Camera(position, up, yaw, pitch) {
        if (position === void 0) { position = vec3.fromValues(0, 0, 0); }
        if (up === void 0) { up = vec3.fromValues(0, 1, 0); }
        if (yaw === void 0) { yaw = -90.0; }
        if (pitch === void 0) { pitch = 0.0; }
        // Camera options
        this.movSpeed = 0.05;
        this.mouseSensivity = 0.25;
        this.view = mat4.create();
        this.proj = mat4.create();
        this.front = vec3.fromValues(0, 0, -1);
        this.position = position;
        this.worldUp = up;
        this.yaw = yaw;
        this.pitch = pitch;
        this.right = vec3.create();
        this.up = vec3.create();
        this.updateCameraVectors();
    }
    Camera.prototype.GetPos = function () {
        return this.position;
    };
    Camera.prototype.processKeyboard = function (direction, deltaTime) {
        if (this.timeElapsed > 25) {
            return;
        }
        var velocity = this.movSpeed * this.timeElapsed;// * deltaTime;
        //console.log(direction);
        if (direction == 0) {
            this.position = vec3.scaleAndAdd(this.position, this.position, this.front, velocity);
        }
        else if (direction == 1) {
            this.position = vec3.scaleAndAdd(this.position, this.position, this.front, -velocity);
        }
        else if (direction == 2) {
            this.position = vec3.scaleAndAdd(this.position, this.position, this.right, -velocity);
        }
        else if (direction == 3) {
            this.position = vec3.scaleAndAdd(this.position, this.position, this.right, velocity);
        }
        else if (direction == 4) {
            this.position = vec3.scaleAndAdd(this.position, this.position, this.up, velocity);
        }
        else if (direction == 5) {
            this.position = vec3.scaleAndAdd(this.position, this.position, this.up, -velocity);
        }
    };
    Camera.prototype.processMouseMovement = function (xOffset, yOffset) {
        this.yaw += xOffset;
        this.pitch += yOffset;
        if (this.pitch > 89.0) {
            this.pitch = 89.0;
        }
        if (this.pitch < -89.0) {
            this.pitch = -89.0;
        }
        this.updateCameraVectors();
    };
    Camera.prototype.updateCameraVectors = function () {
        var front = vec3.fromValues(Math.cos(glMatrix.toRadian(this.yaw)) * Math.cos(glMatrix.toRadian(this.pitch)), Math.sin(glMatrix.toRadian(this.pitch)), Math.sin(glMatrix.toRadian(this.yaw)) * Math.cos(glMatrix.toRadian(this.pitch)));
        this.front = vec3.normalize(this.front, front);
        // Recalculate right and up vector
        this.right = vec3.cross(this.right, this.front, this.worldUp);
        this.right = vec3.normalize(this.right, this.right);
        this.up = vec3.cross(this.up, this.right, this.front);
        this.up = vec3.normalize(this.up, this.up);
    };
    Camera.prototype.GetViewMatrix = function () {
        var aux = vec3.create();
        this.view = mat4.lookAt(this.view, this.position, vec3.add(aux, this.position, this.front), this.up);
        return this.view;
    };
    Camera.prototype.GetProjectionMatrix = function (w, h) {
        this.proj = mat4.perspective(this.proj, 45.0, (w * 1.0) / (h * 1.0), 0.1, 1000.0);
        return this.proj;
    };
    return Camera;
}());
//# sourceMappingURL=camera.js.map