/**
*
* MOD3  2D Point Class
*
*
**/
(function(MOD3, undef){
    
    var Point = MOD3.Point = MOD3.Extends( Object,
    {
        constructor : function(x, y) {
            this.x = (x===undef) ? 0 : x;
            this.y = (y===undef) ? 0 : y;
        },

        x : 0,
        y : 0,

        clone : function() {
            return new Point(this.x, this.y);
        }
    });
    
})(MOD3);