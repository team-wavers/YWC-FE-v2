/* eslint-disable */
import React from "react";

function createOverlay(element, event) {
    var Overlay = function (options) {
        this._element = document.createElement("div");
        this.setPosition(options.position);
        this.setMap(options.map || null);
    };

    Overlay.prototype = new window.naver.maps.OverlayView();
    Overlay.prototype.constructor = Overlay;
    Overlay.prototype.onAdd = function () {
        var overlayLayer = this.getPanes().overlayLayer;
        overlayLayer.style.zIndex = 210;
        overlayLayer.appendChild(this._element);
    };
    Overlay.prototype.onRemove = function () {
        this._element.remove();
    };
    Overlay.prototype.setPosition = function (position) {
        this._position = position;
        this.draw();
    };
    Overlay.prototype.getPosition = function () {
        return this._position;
    };
    Overlay.prototype.delMap = function () {
        this.setMap(null);
        // this.onRemove();
    };
    Overlay.prototype.draw = function () {
        if (!this.getMap()) return;

        function preventEventBubbling(e) {
            e.stopImmediatePropagation();
        }

        var prj = this.getProjection(),
            pos = this.getPosition(),
            pixelPos = prj.fromCoordToOffset(pos);
        this._element.style.cssText = `position: absolute; width:0; height: 0; transform: translate3d(${Math.ceil(pixelPos.x) - 11}px, ${Math.ceil(pixelPos.y) - 18}px, 0px); filter: drop-shadow(rgba(0,0,0,0.15) 0px 3px 6px);`;
        this._element.innerHTML = element;
        this._element.addEventListener("scroll", preventEventBubbling)
        this._element.addEventListener("mousewheel", preventEventBubbling)

        event();

        document.getElementById("close-btn").addEventListener(
            "click",
            () => {
                this.setMap(null);
                this.onRemove();
            },
            { once: true },
        );
    };

    return Overlay;
}

export { createOverlay };
