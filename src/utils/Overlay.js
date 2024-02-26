/* eslint-disable */

function createOverlay(element) {
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
        var prj = this.getProjection(),
            pos = this.getPosition(),
            pixelPos = prj.fromCoordToOffset(pos);
        this._element.style.cssText = `position: absolute; transform: translate3d(${pixelPos.x}px, ${pixelPos.y}px, 0px)`;
        this._element.innerHTML = element;

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
