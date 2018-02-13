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

var TYPE_UPPER = 0;
var TYPE_LOWER = 1;

/**
 * Base class for tooth
 * @returns {Tooth}
 */
function Tooth()
{
    this.id = '';
    this.tooth = true;
    this.surfaces = 0;
    this.highlight = false;
    this.highlightColor = "";
    this.damages = Array();
    this.checkBoxes = Array();
    this.rect = new Rect();
    this.textBox = new TextBox();
    this.spacer = 20; // spacer to seperate tooth from surfaces
    this.touching = false;
    this.address = 0;
    this.normalY;
    this.highY;
    this.blocked = false;
    this.constants = null;

}

/**
 * Method to set up position and dimension of the Tooth
 * @param {type} x position
 * @param {type} y position
 * @param {type} width 
 * @param {type} height
 * @returns {undefined}
 */
Tooth.prototype.setDimens = function (x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.rect.x = x;
    this.rect.y = y;
    this.rect.width = width;
    this.rect.height = height;

    this.normalY = y;

    this.textBox.setDimens(x, y, width, 20);

};

/**
 * Method to set the type of the tooth
 * @param {type} type of the tooth, upper or lower
 * @returns {undefined}
 */
Tooth.prototype.setType = function (type)
{
    this.type = type;

    if (type === 0) {
        this.highY = this.y - 10;

        this.textBox.rect.y = this.y - 40;

    } else {
        this.highY = this.y + 10;

        this.textBox.rect.y = this.rect.y + this.rect.height + 20;
    }

};

/**
 * Method to set a reference to constants
 * @param {type} constants
 * @returns {undefined}
 */
Tooth.prototype.setConstants = function (constants)
{
    this.constants = constants;
};

/**
 * Method to check for collision
 * @param {type} eX x coordinates of event
 * @param {type} eY y coordinates of event
 * @returns boolean true if collision, else false
 */
Tooth.prototype.checkCollision = function (eX, eY)
{
    return this.rect.checkCollision(eX, eY);
};

/**
 * Method to set surfaces for the tooth, 4 or 5
 * @param {type} surfaces
 * @returns {undefined}
 */
Tooth.prototype.setSurfaces = function (surfaces)
{
    this.surfaces = surfaces;
};

Tooth.prototype.toggleSelected = function (selected)
{
    this.highlight = selected;
};

/**
 * Method to create 4 surfaces for the tooth, 5 checkboxes
 * @param {type} settings global settings 
 * @returns {undefined}
 */
Tooth.prototype.create4Surfaces = function (settings)
{
    var width = settings.RECT_DIMEN;

    var startX = this.x + 10;

    /*
     * ids are in the following order
     *
     * upper
     *   1
     * 2   4
     *   3
     * lower
     *   3
     * 4   2
     *   1
     */

    if (this.type === 0) {

        var rect1 = new Rect();

        rect1.width = width;
        rect1.height = width;
        rect1.x = startX;
        rect1.y = this.y + this.height + width;
        rect1.id = this.id + "_M";

        this.checkBoxes.push(rect1);

        var rect2 = new Rect();

        rect2.width = width;
        rect2.height = width;
        rect2.x = startX + width;
        rect2.y = this.y + this.height + width;
        rect2.id = this.id + "_D";

        this.checkBoxes.push(rect2);

        var rect3 = new Rect();

        rect3.width = width;
        rect3.height = width;
        rect3.x = startX + 5;
        rect3.y = this.y + this.height;
        rect3.id = this.id + "_V";

        this.checkBoxes.push(rect3);

        var rect4 = new Rect();

        rect4.width = width;
        rect4.height = width;
        rect4.x = startX + 5;
        rect4.y = this.y + this.height + width * 2;
        rect4.id = this.id + "_L";

        this.checkBoxes.push(rect4);

    } else
    {
        var rect1 = new Rect();

        rect1.width = width;
        rect1.height = width;
        rect1.x = startX;
        rect1.y = this.y - width * 2;
        rect1.id = this.id + "_M";

        this.checkBoxes.push(rect1);

        var rect2 = new Rect();

        rect2.width = width;
        rect2.height = width;
        rect2.x = startX + width;
        rect2.y = this.y - width * 2;
        rect2.id = this.id + "_D";

        this.checkBoxes.push(rect2);

        var rect3 = new Rect();

        rect3.width = width;
        rect3.height = width;
        rect3.x = startX + 5;
        rect3.y = this.y - width;
        rect3.id = this.id + "_L";

        this.checkBoxes.push(rect3);

        var rect4 = new Rect();

        rect4.width = width;
        rect4.height = width;
        rect4.x = startX + 5;
        rect4.y = this.y - width * 3;
        rect4.id = this.id + "_V";

        this.checkBoxes.push(rect4);

    }

};

/**
 * Method to create 4 surfaces for the tooth, 5 checkboxes
 * @param {type} settings global settings 
 * @returns {undefined}
 */
Tooth.prototype.create5Surfaces = function (settings)
{
    var width = settings.RECT_DIMEN;

    var startX = this.x + 5;

    console.log("Start X " + startX);

    /*
     * ids are in the following order
     * 
     * upper
     *   1
     * 2 5 4
     *   3
     *   
     * lower
     *   3
     * 4 5 2
     *   1  
     */

    if (this.type === 0) {

        var rect1 = new Rect();

        rect1.width = width;
        rect1.height = width;
        rect1.x = startX;
        rect1.y = this.y + this.height + width;
        rect1.id = this.id + "_M";

        this.checkBoxes.push(rect1);

        var rect2 = new Rect();

        rect2.width = width;
        rect2.height = width;
        rect2.x = startX + width;
        rect2.y = this.y + this.height + width;
        rect2.id = this.id + "_0";

        this.checkBoxes.push(rect2);

        var rect3 = new Rect();

        rect3.width = width;
        rect3.height = width;
        rect3.x = startX + width * 2;
        rect3.y = this.y + this.height + width;
        rect3.id = this.id + "_D";

        this.checkBoxes.push(rect3);

        var rect4 = new Rect();

        rect4.width = width;
        rect4.height = width;
        rect4.x = startX + width;
        rect4.y = this.y + this.height;
        rect4.id = this.id + "_V";

        this.checkBoxes.push(rect4);

        var rect5 = new Rect();

        rect5.width = width;
        rect5.height = width;
        rect5.x = startX + width;
        rect5.y = this.y + this.height + width * 2;
        rect5.id = this.id + "_L";

        this.checkBoxes.push(rect5);
    } else
    {
        var rect1 = new Rect();

        rect1.width = width;
        rect1.height = width;
        rect1.x = startX;
        rect1.y = this.y - width * 2;
        rect1.id = this.id + "_M";

        this.checkBoxes.push(rect1);

        var rect2 = new Rect();

        rect2.width = width;
        rect2.height = width;
        rect2.x = startX + width;
        rect2.y = this.y - width * 2;
        rect2.id = this.id + "_0";

        this.checkBoxes.push(rect2);

        var rect3 = new Rect();

        rect3.width = width;
        rect3.height = width;
        rect3.x = startX + width * 2;
        rect3.y = this.y - width * 2;
        rect3.id = this.id + "_D";

        this.checkBoxes.push(rect3);

        var rect4 = new Rect();

        rect4.width = width;
        rect4.height = width;
        rect4.x = startX + width;
        rect4.y = this.y - width;
        rect4.id = this.id + "_L";

        this.checkBoxes.push(rect4);

        var rect5 = new Rect();

        rect5.width = width;
        rect5.height = width;
        rect5.x = startX + width;
        rect5.y = this.y - width * 3;
        rect5.id = this.id + "_V";

        this.checkBoxes.push(rect5);

    }

};

/**
 * Base method for setting the surfaces for a tooth
 * @param {type} settings global settings 
 * @returns {undefined}
 */
Tooth.prototype.createSurfaces = function (settings)
{
    if (this.surfaces === 4)
    {
        this.create4Surfaces(settings);
    } else
    {
        this.create5Surfaces(settings);
    }
};

/**
 * Method to draw the id for the tooth
 * @param {type} context the canvas to draw on
 * @returns {undefined}
 */
Tooth.prototype.drawId = function (context)
{
    context.beginPath();
    context.textAlign = 'center';
    context.fillStyle = "#000000";
    context.font = "15px Arial Bold";

    var space = 40;

    if (this.type === 0)
    {
        // draw id
        context.fillText("" + this.id, this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height + space + 10);

        // draw id border
        context.moveTo(this.rect.x, this.rect.y + this.rect.height + space + 20);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y + this.rect.height + space + 20);

        context.moveTo(this.rect.x + this.rect.width, this.rect.y + this.rect.height + space + 20);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y + this.rect.height + space);
    } else
    {
        // draw id
        context.fillText("" + this.id, this.rect.x + this.rect.width / 2, this.rect.y - space - 5);

        // draw id border
        context.moveTo(this.rect.x, this.rect.y - space - 20);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y - space - 20);

        context.moveTo(this.rect.x + this.rect.width, this.rect.y - space - 20);
        context.lineTo(this.rect.x + this.rect.width, this.rect.y - space);
    }

    context.lineWidth = 1;
    // set line color
    context.strokeStyle = '#000000';
    context.stroke();
    context.restore();


};

/**
 * Method to draw the checkboxes for the tooth
 * @param {type} context the canvas to draw on
 * @param {type} settings global settings
 * @returns {undefined}
 */
Tooth.prototype.drawCheckBoxes = function (context, settings)
{
    for (var i = 0; i < this.checkBoxes.length; i++)
    {
        
        if (this.checkBoxes[i].state === 1) {
            
            this.checkBoxes[i].fillColor(context, settings.COLOR_RED);
            this.checkBoxes[i].outline(context, "#000000");
            

        } else if (this.checkBoxes[i].state === 2) {
            
            this.checkBoxes[i].fillColor(context, settings.COLOR_BLUE);
            this.checkBoxes[i].outline(context, "#000000");

        } else {
            
            this.checkBoxes[i].outline(context, "#000000");
            
        }

    }
};

/**
 * Method to draw a text box for the tooth
 * @param {type} context the canvas to draw on
 * @param {type} settings global settings
 * @returns {undefined} void
 */
Tooth.prototype.drawTextBox = function (context, settings)
{
    if (this.textBox.touching) {
        this.textBox.rect.highlightWithColor(context, "#36BE1B", 0.6);
    }

    this.textBox.render(context, settings.COLOR_BLUE);

};

/**
 * Method to toggle Touchin on / off
 * @param {type} touch boolean value 
 * @returns {undefined}
 */
Tooth.prototype.onTouch = function (touch)
{
    if (touch)
    {
        this.y = this.highY;

    } else {
        this.y = this.normalY;
    }

    this.rect.touching = touch;
};

/**
 * Method to generate a damage for the tooth.
 * @param {type} damageId the id of the damage to create
 * @returns {Damage} damage which can be drawn
 */
Tooth.prototype.createDamage = function (damageId)
{
    // empty damage
    var damage;
    
    // attach damage in the proper position
    // first check if the damage should be positioned on the checkboxes area
    if (damageId === this.constants.DIENTE_EN_CLAVIJA || damageId === this.constants.FUSION
            || damageId === this.constants.CORONA_DEFINITIVA || damageId === this.constants.CORONA_TEMPORAL) {

        
        // set the damage to proper position
        if (this.type === 0) {
            damage = new Damage(damageId,
                    this.rect.x,
                    this.rect.y + this.rect.height,
                    this.width,
                    60,
                    this.type);
        } else {
            damage = new Damage(damageId,
                    this.rect.x,
                    this.rect.y - 60,
                    this.width,
                    60,
                    this.type);
        }

    } else if (this.constants.isWritable(damageId)) {
        // damage should be attached to the textBox area
        damage = new Damage(damageId,
                this.textBox.rect.x,
                this.textBox.rect.y,
                this.textBox.rect.width,
                this.textBox.rect.height,
                this.type);

    } else {
            
        // damage should be attached on the tooth
        damage = new Damage(damageId,
                this.rect.x,
                this.rect.y,
                this.rect.width,
                this.rect.height,
                this.type);
    }

    return damage;
};

/**
 * Method to toggle damage on a tooth on off
 * @param {type} damageId to add or remove
 * @returns {undefined}
 */
Tooth.prototype.toggleDamage = function (damageId) {

    console.log("Toggle damage for " + this.id + ", damage " + damageId);

    // if there are no damages, then add.
    if (this.damages.length < 1) {

        var d = this.createDamage(damageId);

        if (d !== undefined) {
            this.damages.push(d);
        }

    } else {
        // if this tooth has damages, check for duplicates
        var exists = false;
        var splicer = -1;

        // check to see if this damage exists
        for (var i = 0; i < this.damages.length; i++) {

            // found this damage
            if (this.damages[i].id === damageId)
            {
                console.log("Splicing array for tooth " + this.id);

                splicer = i;
                exists = true;
                break;
            }
        }

        // check if damage exists
        if (!exists) {

            // damge is new, so add it
            var d = this.createDamage(damageId);

            if (d !== undefined) {
                this.damages.push(d);
            }

        } else {
            // if damage already exists, then we remove it
            this.damages.splice(splicer, 1);
        }
    }
};


/**
 * Method to render a Tooth on the screen with all its states
 * @param {type} context the canvas to draw on
 * @param {type} settings app settings
 * @param {type} constants application constants
 * @returns {undefined}
 */
Tooth.prototype.render = function (context, settings, constants)
{

    // check if this is a tooth or a space
    if (this.tooth) {

        // draw the image of the tooth
        if (this.image !== undefined) {

            // center of tooth
            var cx = (this.x + this.width / 2);

            // centerinng of the tooth in x axis
            var dx = cx - this.image.naturalWidth / 2;

            // draw tooth
            context.drawImage(this.image, dx, this.y);
        }

        // id
        this.drawId(context);

        // checkboxes
        this.drawCheckBoxes(context, settings);

    } else {

        // highlight the spaces between the teeths
        if (settings.HIHGLIGHT_SPACES) {

            if (this.rect.touching) {
                this.rect.highlightEllipse(context, "#00AEFF", 0.5, -10);
            } else {
                this.rect.highlightEllipse(context, "#19B900", 0.2, 10);
            }
        }
    }

    // draw all damages
    for (var i = 0; i < this.damages.length; i++) {
        this.damages[i].render(context, settings, constants);
    }


    // highlight textboxes
    for (var i = 0; i < this.checkBoxes.length; i++)
    {
        if (this.checkBoxes[i].touching)
        {
            this.checkBoxes[i].highlightWithColor(context, "#36BE1B", 0.6);
        }

    }

    // Draw textboxes
    if (this.tooth) {
        this.drawTextBox(context, settings);
        
    }
    
     // show area of tooth or space, only in DEBUG MODE
    if (settings.DEBUG) {

        if (this.tooth) {
            this.rect.outline(context, "#000000");
        } else {
            this.rect.highlightEllipse(context, "#FFD100", 0.4, 2);
        }
    }

};

/**
 * Method to get a surface (checkbox) by id
 * @param {type} id the id of the textbox to find
 * @returns returns a rect if found, else undefined
 */
Tooth.prototype.getSurfaceById = function (id)
{
    var surface;

    for (var i = 0; i < this.checkBoxes.length; i++) {

        if (this.checkBoxes[i].id === id) {

            surface = this.checkBoxes[i];
            break;
        }
    }

    return surface;
};