/* 
 * Copyright (c) 2018 Bardur Thomsen <https://github.com/bardurt>.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Bardur Thomsen <https://github.com/bardurt> - initial API and implementation and/or initial documentation
 */

function Renderer()
{
    this.context;
    this.width = 0;
    this.height = 0;
}

/**
 * Method to show display a loading screen
 * @returns {undefined}
 */
Renderer.prototype.load = function()
{
    this.context.fillText("Loading...", this.width/2, this.height/2);
};

/**
 * Method to initialize the renderer for drawing the odontograma
 * @param {type} canvas the canvas to draw on
 * @returns {undefined}
 */
Renderer.prototype.init = function(canvas) {
    this.context = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    
    
    this.load();
};


/**
 * Method to render odontograma
 * @param {type} data data frm for odontograma
 * @returns {undefined}
 */
Renderer.prototype.render = function(data)
{
    
    // clear
    this.context.fillStyle ="#ffffff";
    this.context.fillRect(0, 0, this.width, this.height);
    
    this.context.restore();
    
    // draw the teeth
    for (var i = 0; i < data.length; i++) {

        data[i].render( this.context);
    }

};

/**
 * Method to render text on canvas
 * @param {type} text the text to render
 * @param {type} x position on canvas
 * @param {type} y position on canvas
 * @param {type} color the color which the text should be
 * @returns {undefined}
 */
Renderer.prototype.renderText = function(text, x, y, color)
{
    if(color === undefined){
        color = "#000000"; // default color = black
    }
    
    this.context.fillStyle = color;
    this.context.fillText(text, x, y);
    this.context.restore();
};