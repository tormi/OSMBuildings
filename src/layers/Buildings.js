
var Buildings = {};

(function() {

  var shader;

  // TODO: move this
  function onResize() {
    gl.viewport(0, 0, Map.size.width, Map.size.height);
  }

  Buildings.initShader = function() {
    shader = new Shader('buildings');
    Events.on('resize', onResize);
    onResize();
  };

  Buildings.render = function(mapMatrix) {
    if (Map.zoom < MIN_ZOOM) {
      return;
    }

//  gl.enable(gl.BLEND);
//  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
//  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
//  gl.disable(gl.DEPTH_TEST);

    var program = shader.use();

    // TODO: suncalc
    gl.uniform3fv(program.uniforms.uLightColor, [0.5, 0.5, 0.5]);
    gl.uniform3fv(program.uniforms.uLightDirection, unit(1, 1, 1));

    gl.uniform1f(program.uniforms.uAlpha, adjust(Map.zoom, STYLE.zoomAlpha, 'zoom', 'alpha'));

    var normalMatrix = Matrix.invert3(Matrix.create());
    gl.uniformMatrix3fv(program.uniforms.uNormalTransform, false, new Float32Array(Matrix.transpose(normalMatrix)));

    var
      dataItems = Data.items,
      item,
      matrix;

    for (var i = 0, il = dataItems.length; i < il; i++) {
      item = dataItems[i];

      if (!(matrix = item.getMatrix())) {
        continue;
      }

      matrix = Matrix.multiply(matrix, mapMatrix);

      gl.uniformMatrix4fv(program.uniforms.uMatrix, false, new Float32Array(matrix));

      gl.bindBuffer(gl.ARRAY_BUFFER, item.vertexBuffer);
      gl.vertexAttribPointer(program.attributes.aPosition, item.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, item.normalBuffer);
      gl.vertexAttribPointer(program.attributes.aNormal, item.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, item.colorBuffer);
      gl.vertexAttribPointer(program.attributes.aColor, item.colorBuffer.itemSize, gl.UNSIGNED_BYTE, true, 0, 0);

      gl.drawArrays(gl.TRIANGLES, 0, item.vertexBuffer.numItems);
    }

    program.end();
  };

}());
